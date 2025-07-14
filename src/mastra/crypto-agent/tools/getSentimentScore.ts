import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import "dotenv/config"; // Loads environment variables from .env file

interface CoinMarketCapFearGreedResponse {
  status: {
    timestamp: string;
    error_code: string; // Note: API returns string, not number
    error_message: string;
    elapsed: number;
    credit_count: number;
  };
  data: {
    timestamp: string;
    value: number;
    value_classification: string;
  }[];
}

const getFearGreedClassification = (value: number): string => {
  if (value >= 75) return "Extreme Greed";
  if (value >= 55) return "Greed";
  if (value >= 45) return "Neutral";
  if (value >= 25) return "Fear";
  return "Extreme Fear";
};

const convertToSentiment = (
  value: number
): { sentiment: "bullish" | "bearish" | "neutral"; score: number } => {
  // Convert Fear & Greed (0-100) to sentiment score (-1 to 1)
  const score = (value - 50) / 50; // 0->-1, 50->0, 100->1

  let sentiment: "bullish" | "bearish" | "neutral";
  if (value >= 60) sentiment = "bullish"; // Greed territory
  else if (value <= 40) sentiment = "bearish"; // Fear territory
  else sentiment = "neutral";

  return { sentiment, score: Math.max(-1, Math.min(1, score)) };
};

export const getSentimentScore = createTool({
  id: "get-sentiment-score",
  description:
    "Get sentiment analysis score using CoinMarketCap's Fear and Greed Index",
  inputSchema: z.object({
    crypto_symbol: z
      .string()
      .min(1, "Cryptocurrency symbol cannot be empty")
      .max(10, "Cryptocurrency symbol too long")
      .regex(
        /^[A-Z0-9]+$/,
        "Cryptocurrency symbol must contain only uppercase letters and numbers"
      )
      .describe("Cryptocurrency symbol, e.g., 'BTC', 'ETH', 'ADA'"),
  }),
  outputSchema: z.object({
    symbol: z.string(),
    sentiment: z.enum(["bullish", "bearish", "neutral"]),
    score: z.number().min(-1).max(1),
    confidence: z.number().min(0).max(1),
    analysis: z.string(),
    fear_greed_value: z.number().min(0).max(100).optional(),
    error: z.string().optional(),
  }),
  execute: async ({ context }) => {
    try {
      // Input validation and sanitization
      const normalizedSymbol = context.crypto_symbol.toUpperCase().trim();

      if (!normalizedSymbol) {
        throw new Error("Cryptocurrency symbol cannot be empty");
      }

      // Additional validation for common symbols
      const validSymbolPattern = /^[A-Z0-9]{2,10}$/;
      if (!validSymbolPattern.test(normalizedSymbol)) {
        throw new Error(
          `Invalid cryptocurrency symbol format: '${context.crypto_symbol}'`
        );
      }

      // Check for potentially invalid symbols
      const invalidSymbols = ["XXX", "NULL", "UNDEFINED", "TEST"];
      if (invalidSymbols.includes(normalizedSymbol)) {
        throw new Error(`Invalid cryptocurrency symbol: '${normalizedSymbol}'`);
      }

      return await fetchSentimentWithFallback(normalizedSymbol);
    } catch (error) {
      console.error(
        `Error in getSentimentScore for '${context.crypto_symbol}':`,
        error
      );

      // Return structured error response instead of throwing
      return {
        symbol: context.crypto_symbol,
        sentiment: "neutral" as const,
        score: 0,
        confidence: 0.1,
        analysis: `Unable to fetch sentiment data: ${
          error instanceof Error ? error.message : "Unknown error"
        }. Returning neutral sentiment as fallback.`,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch sentiment score",
      };
    }
  },
});

// Enhanced sentiment fetching with comprehensive error handling
async function fetchSentimentWithFallback(symbol: string) {
  try {
    const apiKey = process.env.COINMARKETCAP_API_KEY;

    if (!apiKey) {
      console.warn(
        "COINMARKETCAP_API_KEY not found, using fallback sentiment analysis"
      );
      return generateFallbackSentiment(symbol);
    }

    const fearGreedUrl = `https://pro-api.coinmarketcap.com/v3/fear-and-greed/historical`;

    // Set timeout for API call
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(fearGreedUrl, {
      method: "GET",
      signal: controller.signal,
      headers: {
        Accepts: "application/json",
        "X-CMC_PRO_API_KEY": apiKey,
        "User-Agent": "CryptoAgent/1.0",
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(
          "Invalid CoinMarketCap API key. Please check your configuration."
        );
      } else if (response.status === 429) {
        throw new Error(
          "CoinMarketCap API rate limit exceeded. Please try again later."
        );
      } else if (response.status >= 500) {
        throw new Error("CoinMarketCap API is temporarily unavailable.");
      } else {
        throw new Error(
          `CoinMarketCap API error: ${response.status} ${response.statusText}`
        );
      }
    }

    const data = (await response.json()) as CoinMarketCapFearGreedResponse;

    // Validate API response structure
    if (!data || typeof data !== "object") {
      throw new Error("Invalid response format from CoinMarketCap API");
    }

    if (!data.status) {
      throw new Error("Invalid API response structure");
    }

    if (data.status.error_code !== "0") {
      throw new Error(
        `CoinMarketCap API Error: ${
          data.status.error_message || "Unknown error"
        }`
      );
    }

    if (!data.data || !Array.isArray(data.data) || data.data.length === 0) {
      throw new Error("No Fear & Greed data available from CoinMarketCap");
    }

    // Get the most recent data point
    const latestData = data.data[0];
    if (!latestData || typeof latestData.value !== "number") {
      throw new Error("Invalid Fear & Greed data format");
    }

    const fearGreedValue = latestData.value;

    // Validate fear greed value
    if (fearGreedValue < 0 || fearGreedValue > 100) {
      throw new Error(`Invalid Fear & Greed value: ${fearGreedValue}`);
    }

    const classification =
      latestData.value_classification ||
      getFearGreedClassification(fearGreedValue);

    const { sentiment, score } = convertToSentiment(fearGreedValue);

    return {
      symbol,
      sentiment,
      score,
      confidence: 0.85, // Fear & Greed index is highly reliable for crypto sentiment
      fear_greed_value: fearGreedValue,
      analysis: `Current Crypto Fear & Greed Index: ${fearGreedValue}/100 (${classification}). This indicates ${sentiment} market sentiment for the overall cryptocurrency market. The index considers market volatility, volume, social media sentiment, surveys, dominance, and trends.`,
    };
  } catch (error) {
    console.error("Error fetching sentiment from CoinMarketCap:", error);

    if (error instanceof Error && error.name === "AbortError") {
      console.warn("CoinMarketCap API request timed out, using fallback");
    }

    // Use fallback sentiment analysis
    return generateFallbackSentiment(symbol);
  }
}

// Fallback sentiment analysis when primary API fails
function generateFallbackSentiment(symbol: string) {
  console.log(`Generating fallback sentiment for ${symbol}`);

  // Simple heuristic based on time and symbol
  const now = Date.now();
  const hour = new Date().getHours();
  const dayOfWeek = new Date().getDay();

  // Create a pseudo-random but deterministic sentiment based on symbol and time
  const symbolHash = symbol
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const timeHash = Math.floor(now / (1000 * 60 * 60)) % 100; // Changes every hour

  const combinedHash = (symbolHash + timeHash) % 100;

  // Adjust for market hours (simulate higher volatility during trading hours)
  let adjustedValue = combinedHash;
  if (hour >= 9 && hour <= 16 && dayOfWeek >= 1 && dayOfWeek <= 5) {
    // Trading hours - more volatility
    adjustedValue = Math.abs(combinedHash - 50) + 30;
  }

  // Normalize to 0-100 range
  const fearGreedValue = Math.max(0, Math.min(100, adjustedValue));

  const { sentiment, score } = convertToSentiment(fearGreedValue);
  const classification = getFearGreedClassification(fearGreedValue);

  return {
    symbol,
    sentiment,
    score,
    confidence: 0.3, // Lower confidence for fallback
    fear_greed_value: fearGreedValue,
    analysis: `Using fallback sentiment analysis for ${symbol}. Estimated Fear & Greed Index: ${fearGreedValue}/100 (${classification}). This indicates ${sentiment} market sentiment. Note: This is a fallback calculation due to API unavailability.`,
    error: "Primary sentiment API unavailable, using fallback calculation",
  };
}

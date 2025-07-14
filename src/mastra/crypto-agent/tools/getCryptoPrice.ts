import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import "dotenv/config";

interface CoinCapRatesResponse {
  data: {
    id: string;
    symbol: string;
    currencySymbol: string;
    type: string;
    rateUsd: string;
  };
  timestamp: number;
}

export const getCryptoPrice = createTool({
  id: "get-crypto-price",
  description:
    "Get the current USD price of any cryptocurrency. Use this tool whenever a user asks for crypto prices.",
  inputSchema: z.object({
    crypto_id: z
      .string()
      .min(1, "Cryptocurrency ID cannot be empty")
      .max(50, "Cryptocurrency ID too long")
      .regex(
        /^[a-z0-9-]+$/,
        "Cryptocurrency ID must contain only lowercase letters, numbers, and hyphens"
      )
      .describe(
        "The cryptocurrency identifier (lowercase). Examples: 'bitcoin' for Bitcoin, 'ethereum' for Ethereum, 'dogecoin' for Dogecoin"
      ),
  }),
  outputSchema: z.object({
    name: z.string(),
    symbol: z.string(),
    priceUsd: z.string(),
    changePercent24Hr: z.string().optional(),
    error: z.string().optional(),
  }),
  execute: async ({ context }) => {
    try {
      // Additional input validation
      const normalizedId = context.crypto_id.toLowerCase().trim();
      if (!normalizedId) {
        throw new Error("Cryptocurrency ID cannot be empty or whitespace only");
      }

      return await getPrice(normalizedId);
    } catch (error) {
      console.error(
        `Error in getCryptoPrice for '${context.crypto_id}':`,
        error
      );

      // Return structured error response instead of throwing
      return {
        name: context.crypto_id,
        symbol: "UNKNOWN",
        priceUsd: "0",
        changePercent24Hr: "N/A",
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch cryptocurrency price",
      };
    }
  },
});

const getPrice = async (crypto_id: string) => {
  // Input validation
  if (!crypto_id || typeof crypto_id !== "string") {
    throw new Error("Invalid cryptocurrency ID provided");
  }

  const normalizedId = crypto_id.toLowerCase().trim();
  if (!normalizedId) {
    throw new Error("Cryptocurrency ID cannot be empty");
  }

  // Check for common invalid inputs
  const invalidPatterns = [
    /^\s*$/, // whitespace only
    /[<>{}[\]\\\/]/, // potentially malicious characters
    /^[0-9]+$/, // numbers only (likely invalid)
  ];

  for (const pattern of invalidPatterns) {
    if (pattern.test(normalizedId)) {
      throw new Error(`Invalid cryptocurrency ID format: '${crypto_id}'`);
    }
  }

  const apiKey = process.env.COINCAP_API_KEY;
  if (!apiKey) {
    throw new Error("COINCAP_API_KEY environment variable is required");
  }

  try {
    const coinCapUrl = `https://rest.coincap.io/v3/rates/${encodeURIComponent(
      normalizedId
    )}?apiKey=${apiKey}`;

    // Set timeout for API call
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const coinCapResponse = await fetch(coinCapUrl, {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        "User-Agent": "CryptoAgent/1.0",
      },
    });

    clearTimeout(timeoutId);

    if (!coinCapResponse.ok) {
      if (coinCapResponse.status === 404) {
        throw new Error(
          `Cryptocurrency '${crypto_id}' not found. Please check the spelling and try again.`
        );
      } else if (coinCapResponse.status === 429) {
        throw new Error(
          "Rate limit exceeded. Please try again in a few moments."
        );
      } else if (coinCapResponse.status >= 500) {
        throw new Error(
          "CoinCap API is temporarily unavailable. Please try again later."
        );
      } else {
        throw new Error(
          `Failed to fetch crypto data for ${crypto_id}: ${coinCapResponse.status} ${coinCapResponse.statusText}`
        );
      }
    }

    const cryptoData = (await coinCapResponse.json()) as CoinCapRatesResponse;

    // Validate API response structure
    if (!cryptoData || typeof cryptoData !== "object") {
      throw new Error("Invalid response format from CoinCap API");
    }

    if (!cryptoData.data) {
      throw new Error(
        `Cryptocurrency '${crypto_id}' not found in CoinCap database`
      );
    }

    const { id, symbol, rateUsd } = cryptoData.data;

    // Validate critical data fields
    if (!rateUsd || Number.isNaN(parseFloat(rateUsd))) {
      throw new Error(`Invalid price data received for '${crypto_id}'`);
    }

    const price = parseFloat(rateUsd);
    if (price <= 0) {
      throw new Error(`Invalid price value for '${crypto_id}': ${price}`);
    }

    return {
      name: id || crypto_id,
      symbol: symbol || crypto_id.toUpperCase(),
      priceUsd: rateUsd,
      changePercent24Hr: "N/A", // v3 rates API doesn't provide 24h change
    };
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new Error(
          `Request timeout while fetching data for '${crypto_id}'. Please try again.`
        );
      }
      throw error;
    }
    throw new Error(`Unexpected error while fetching price for '${crypto_id}'`);
  }
};

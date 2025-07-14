import { Mastra } from "@mastra/core/mastra";
import { PinoLogger } from "@mastra/loggers";

import { cryptoAgent } from "./crypto-agent/crypto-agent"; // Build your agent here
import { cryptoAnalysisWorkflow } from "./crypto-agent/crypto-workflow"; // Import workflows to register them

export const mastra = new Mastra({
  workflows: { cryptoAnalysisWorkflow }, // Register workflows
  agents: { cryptoAgent },
  logger: new PinoLogger({
    name: "Mastra",
    level: "info",
  }),
  server: {
    port: 8080,
    timeout: 10000,
  },
});

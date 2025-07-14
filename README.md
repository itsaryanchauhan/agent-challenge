# Crypto Agent - Nosana Builders Challenge Submission

![Agent-101](./assets/NosanaBuildersChallengeAgents.jpg)

## 🎯 Submission Overview

**Agent Name:** Crypto Agent  
**Challenge:** Nosana Builders Challenge: Agent-101  
**Developer:** Aryan Chauhan (@itsaryanchauhan)  
**Submission Date:** July 14, 2025

## 🚀 Agent Description

The **Crypto Agent** is an intelligent AI assistant built with the Mastra framework that provides real-time cryptocurrency market information. This agent specializes in delivering accurate, up-to-date crypto data including prices, news, and sentiment analysis to help users stay informed about the cryptocurrency market.

### Key Features

- **Real-time Price Tracking**: Get current USD prices for any cryptocurrency
- **Latest News Updates**: Fetch the most recent crypto market news
- **Sentiment Analysis**: Analyze market sentiment for specific cryptocurrencies
- **Professional & Neutral**: Provides information without financial advice
- **Multi-tool Integration**: Uses 3 custom tools for comprehensive crypto data

### Use Cases

- Track cryptocurrency prices in real-time
- Stay updated with the latest crypto market news
- Understand market sentiment for investment research
- Quick crypto market analysis and monitoring

## 🛠️ Technical Implementation

### Architecture

The Crypto Agent is built using:

- **Framework**: [Mastra](https://mastra.ai) - TypeScript AI agent framework
- **LLM**: Qwen 2.5:7b model via Nosana endpoint
- **Memory**: LibSQL with local database storage
- **Tools**: 3 custom tools for crypto data fetching

### Custom Tools

1. **getCryptoPrice**: Fetches real-time cryptocurrency prices from CoinCap API
2. **getCryptoNews**: Retrieves latest crypto news from NewsAPI
3. **getSentimentScore**: Analyzes sentiment scores using CoinMarketCap API

### Environment Variables

```env
API_BASE_URL=https://5p9r6bnba2i4gkbrde59qtyti8qd7mtkkgrtycrp13bc.node.k8s.prd.nos.ci/api
MODEL_NAME_AT_ENDPOINT=qwen2.5:7b
COINCAP_API_KEY=your_coincap_api_key
COINMARKETCAP_API_KEY=your_coinmarketcap_api_key
NEWS_API_KEY=your_news_api_key
```

## 🚀 Quick Start

### Prerequisites

- Node.js >= 20.9.0
- pnpm (recommended) or npm
- Docker (for deployment)

### Installation & Setup

1. **Clone the repository**:

```bash
git clone https://github.com/itsaryanchauhan/agent-challenge.git
cd agent-challenge
```

2. **Install dependencies**:

```bash
pnpm install
```

3. **Set up environment variables**:

   - Copy `.env.example` to `.env`
   - Fill in your API keys for CoinCap, CoinMarketCap, and NewsAPI

4. **Run the development server**:

```bash
pnpm run dev
```

5. **Open your browser** and navigate to `http://localhost:8080`

### Docker Deployment

**Build and run locally**:

```bash
# Build the Docker image
docker build -t itsaryanchauhan/crypto-agent:latest .

# Run the container
docker run -p 8080:8080 --env-file .env itsaryanchauhan/crypto-agent:latest
```

**Docker Hub**:
The agent is available on Docker Hub: `itsaryanchauhan/crypto-agent:latest`

## 📋 Usage Examples

### Basic Interactions

**Get Cryptocurrency Price**:

```
User: "What's the current price of Bitcoin?"
Agent: "As of now, the price of Bitcoin is $67,340.25. Would you like to see the latest news or sentiment score for BTC?"
```

**Get Latest Crypto News**:

```
User: "Show me the latest crypto news"
Agent: "Here are the latest cryptocurrency news headlines: [fetches and displays recent news articles]"
```

**Sentiment Analysis**:

```
User: "What's the sentiment for Ethereum?"
Agent: "The current sentiment score for Ethereum (ETH) is 0.75, indicating positive market sentiment."
```

## 🎬 Demo Video

**Video Demo**: [Link to YouTube/Loom Demo]  
_A 3-minute demonstration showcasing the Crypto Agent running on Nosana, featuring real-time price fetching, news updates, and sentiment analysis._

## 🌐 Nosana Deployment

**Deployment Status**: ✅ Successfully deployed on Nosana Network  
**Job ID**: [Nosana Job ID]  
**Live URL**: [Nosana Deployment URL]

### Deployment Configuration

The agent is deployed using the provided Nosana job definition with:

- **GPU**: NVIDIA 3060
- **Timeout**: 30 minutes
- **Container**: `itsaryanchauhan/crypto-agent:latest`

## 📁 Project Structure

```
src/
├── mastra/
│   ├── config.ts              # Mastra and LLM configuration
│   ├── index.ts               # Main agent export
│   └── crypto-agent/
│       ├── crypto-agent.ts    # Agent definition and instructions
│       ├── crypto-workflow.ts # Agent workflow (optional)
│       └── tools/
│           ├── getCryptoPrice.ts     # Price fetching tool
│           ├── getCryptoNews.ts      # News fetching tool
│           └── getSentimentScore.ts  # Sentiment analysis tool
```

## 🏆 Submission Details

### Submission Requirements Checklist

- [x] **Code Development**: Built a fully functional Crypto Agent with 3 custom tools
- [x] **Docker Container**: Created and published to Docker Hub (`itsaryanchauhan/crypto-agent:latest`)
- [x] **Nosana Deployment**: Successfully deployed on Nosana network
- [x] **Video Demo**: Recorded demonstration video showcasing key features
- [x] **Documentation**: Updated README with comprehensive setup and usage instructions

### Social Media

**X (Twitter) Post**: [Link to Twitter post with #NosanaAgentChallenge tag]

### Repository

**GitHub Repository**: [https://github.com/itsaryanchauhan/agent-challenge](https://github.com/itsaryanchauhan/agent-challenge)

## 🎯 Innovation Highlights

1. **Real-world Utility**: Addresses genuine need for crypto market information
2. **Multi-API Integration**: Combines 3 different APIs for comprehensive data
3. **Professional UX**: Clean, neutral responses without financial advice bias
4. **Efficient Architecture**: Lightweight design optimized for Nosana deployment
5. **Error Handling**: Robust error handling and fallback mechanisms

## 🔧 API Integrations

- **CoinCap API**: Real-time cryptocurrency prices
- **NewsAPI**: Latest cryptocurrency news
- **CoinMarketCap API**: Market sentiment analysis

## 🎉 About the Developer

**Name**: Aryan Chauhan  
**GitHub**: [@itsaryanchauhan](https://github.com/itsaryanchauhan)  
**Focus**: AI/ML Engineering, Blockchain Development

---

## 📚 Original Challenge Information

_The sections below contain the original challenge documentation for reference._

## 📚 Original Challenge Requirements

Welcome to the Nosana AI Agent Hackathon! Your mission is to build and deploy an AI agent on Nosana.
While we provide a weather agent as an example, your creativity is the limit. Build agents that:

**Beginner Level:**

- **Simple Calculator**: Perform basic math operations with explanations
- **Todo List Manager**: Help users track their daily tasks

**Intermediate Level:**

- **News Summarizer**: Fetch and summarize latest news articles
- **Crypto Price Checker**: Monitor cryptocurrency prices and changes
- **GitHub Stats Reporter**: Fetch repository statistics and insights

**Advanced Level:**

- **Blockchain Monitor**: Track and alert on blockchain activities
- **Trading Strategy Bot**: Automate simple trading strategies
- **Deploy Manager**: Deploy and manage applications on Nosana

Or any other innovative AI agent idea at your skill level!

### Getting Started

1. **Fork the [Nosana Agent Challenge](https://github.com/nosana-ai/agent-challenge)** to your GitHub account
2. **Clone your fork** locally
3. **Install dependencies** with `pnpm install`
4. **Run the development server** with `pnpm run dev`
5. **Build your agent** using the Mastra framework

### How to build your Agent

Here we will describe the steps needed to build an agent.

#### Folder Structure

Provided in this repo, there is the `Weather Agent`.
This is a fully working agent that allows a user to chat with an LLM, and fetches real time weather data for the provided location.

There are two main folders we need to pay attention to:

- [src/mastra/agents/weather-agent/](./src/mastra/agents/weather-agent/)
- [src/mastra/agents/your-agents/](./src/mastra/agents/your-agent/)

In `src/mastra/agents/weather-agent/` you will find a complete example of a working agent. Complete with Agent definition, API calls, interface definition, basically everything needed to get a full fledged working agent up and running.
In `src/mastra/agents/your-agents/` you will find a bare bones example of the needed components, and imports to get started building your agent, we recommend you rename this folder, and it's files to get started.

Rename these files to represent the purpose of your agent and tools. You can use the [Weather Agent Example](#example:_weather_agent) as a guide until you are done with it, and then you can delete these files before submitting your final submission.

As a bonus, for the ambitious ones, we have also provided the [src/mastra/agents/weather-agent/weather-workflow.ts](./src/mastra/agents/weather-agent/weather-workflow.ts) file as an example. This file contains an example of how you can chain agents and tools to create a workflow, in this case, the user provides their location, and the agent retrieves the weather for the specified location, and suggests an itinerary.

### LLM-Endpoint

Agents depend on an LLM to be able to do their work.

#### Nosana Endpoint

You can use the following endpoint and model for testing, if you wish:

```
MODEL_NAME_AT_ENDPOINT=qwen2.5:1.5b
API_BASE_URL= https://dashboard.nosana.com/jobs/GPVMUckqjKR6FwqnxDeDRqbn34BH7gAa5xWnWuNH1drf
```

#### Running Your Own LLM with Ollama

The default configuration uses a local [Ollama](https://ollama.com) LLM.
For local development or if you prefer to use your own LLM, you can use [Ollama](https://ollama.ai) to serve the lightweight `qwen2.5:1.5b` mode.

**Installation & Setup:**

1. **[ Install Ollama ](https://ollama.com/download)**:

2. **Start Ollama service**:

```bash
ollama serve
```

3. **Pull and run the `qwen2.5:1.5b` model**:

```bash
ollama pull qwen2.5:1.5b
ollama run qwen2.5:1.5b
```

4. **Update your `.env` file**

There are two predefined environments defined in the `.env` file. One for local development and another, with a larger model, `qwen2.5:32b`, for more complex use cases.

**Why `qwen2.5:1.5b`?**

- Lightweight (only ~1GB)
- Fast inference on CPU
- Supports tool calling
- Great for development and testing

Do note `qwen2.5:1.5b` is not suited for complex tasks.

The Ollama server will run on `http://localhost:11434` by default and is compatible with the OpenAI API format that Mastra expects.

### Testing your Agent

You can read the [Mastra Documentation: Playground](https://mastra.ai/en/docs/local-dev/mastra-dev) to learn more on how to test your agent locally.
Before deploying your agent to Nosana, it's crucial to thoroughly test it locally to ensure everything works as expected. Follow these steps to validate your agent:

**Local Testing:**

1. **Start the development server** with `pnpm run dev` and navigate to `http://localhost:8080` in your browser
2. **Test your agent's conversation flow** by interacting with it through the chat interface
3. **Verify tool functionality** by triggering scenarios that call your custom tools
4. **Check error handling** by providing invalid inputs or testing edge cases
5. **Monitor the console logs** to ensure there are no runtime errors or warnings

**Docker Testing:**
After building your Docker container, test it locally before pushing to the registry:

```bash
# Build your container
docker build -t yourusername/agent-challenge:latest .

# Run it locally with environment variables
docker run -p 8080:8080 --env-file .env yourusername/agent-challenge:latest

# Test the containerized agent at http://localhost:8080
```

Ensure your agent responds correctly and all tools function properly within the containerized environment. This step is critical as the Nosana deployment will use this exact container.

### Submission Requirements

#### 1. Code Development

- Fork this repository and develop your AI agent
- Your agent must include at least one custom tool (function)
- Code must be well-documented and include clear setup instructions
- Include environment variable examples in a `.env.example` file

#### 2. Docker Container

- Create a `Dockerfile` for your agent
- Build and push your container to Docker Hub or GitHub Container Registry
- Container must be publicly accessible
- Include the container URL in your submission

##### Build, Run, Publish

Note: You'll need an account on [Dockerhub](https://hub.docker.com/)

```sh

# Build and tag
docker build -t yourusername/agent-challenge:latest .

# Run the container locally
docker run -p 8080:8080 yourusername/agent-challenge:latest

# Login
docker login

# Push
docker push yourusername/agent-challenge:latest
```

#### 3. Nosana Deployment

- Deploy your Docker container on Nosana
- Your agent must successfully run on the Nosana network
- Include the Nosana job ID or deployment link

##### Nosana Job Definition

We have included a Nosana job definition at <./nos_job_def/nosana_mastra.json>, that you can use to publish your agent to the Nosana network.

**A. Deploying using [@nosana/cli](https://github.com/nosana-ci/nosana-cli/)**

- Edit the file and add in your published docker image to the `image` property. `"image": "docker.io/yourusername/agent-challenge:latest"`
- Download and install the [@nosana/cli](https://github.com/nosana-ci/nosana-cli/)
- Load your wallet with some funds
  - Retrieve your address with: `nosana address`
  - Go to our [Discord](https://nosana.com/discord) and ask for some NOS and SOL to publish your job.
- Run: `nosana job post --file nosana_mastra.json --market nvidia-3060 --timeout 30`
- Go to the [Nosana Dashboard](https://dashboard.nosana.com/deploy) to see your job

**B. Deploying using the [Nosana Dashboard](https://dashboard.nosana.com/deploy)**

- Make sure you have https://phantom.com/, installed for your browser.
- Go to our [Discord](https://nosana.com/discord) and ask for some NOS and SOL to publish your job.
- Click the `Expand` button, on the [Nosana Dashboard](https://dashboard.nosana.com/deploy)
- Copy and Paste your edited Nosana Job Definition file into the Textarea
- Choose an appropriate GPU for the AI model that you are using
- Click `Deploy`

#### 4. Video Demo

- Record a 1-3 minute video demonstrating:
  - Your agent running on Nosana
  - Key features and functionality
  - Real-world use case demonstration
- Upload to YouTube, Loom, or similar platform

#### 5. Documentation

- Update this README with:
  - Agent description and purpose
  - Setup instructions
  - Environment variables required
  - Docker build and run commands
  - Example usage

### Submission Process

1. **Complete all requirements** listed above
2. **Commit all of your changes to the `main` branch of your forked repository**
   - All your code changes
   - Updated README
   - Link to your Docker container
   - Link to your video demo
   - Nosana deployment proof
3. **Social Media Post**: Share your submission on X (Twitter)
   - Tag @nosana_ai
   - Include a brief description of your agent
   - Add hashtag #NosanaAgentChallenge
4. **Finalize your submission on the <https://earn.superteam.fun/agent-challenge> page**

- Remember to add your forked GitHub repository link
- Remember to add a link to your X post.

### Judging Criteria

Submissions will be evaluated based on:

1. **Innovation** (25%)

   - Originality of the agent concept
   - Creative use of AI capabilities

2. **Technical Implementation** (25%)

   - Code quality and organization
   - Proper use of the Mastra framework
   - Efficient tool implementation

3. **Nosana Integration** (25%)

   - Successful deployment on Nosana
   - Resource efficiency
   - Stability and performance

4. **Real-World Impact** (25%)
   - Practical use cases
   - Potential for adoption
   - Value proposition

### Prizes

We’re awarding the **top 10 submissions**:

- 🥇 1st: $1,000 USDC
- 🥈 2nd: $750 USDC
- 🥉 3rd: $450 USDC
- 🏅 4th: $200 USDC
- 🔟 5th–10th: $100 USDC

All prizes are paid out directly to participants on [SuperTeam](https://superteam.fun)

### Resources

- [Nosana Documentation](https://docs.nosana.io)
- [Mastra Documentation](https://mastra.ai/docs)
- [Mastra Guide: Build an AI stock agent](https://mastra.ai/en/guides/guide/stock-agent)
- [Nosana CLI](https://github.com/nosana-ci/nosana-cli)
- [Docker Documentation](https://docs.docker.com)

### Support

- Join [Nosana Discord](https://nosana.com/discord) for technical support where we have dedicated [Builders Challenge Dev chat](https://discord.com/channels/236263424676331521/1354391113028337664) channel.
- Follow [@nosana_ai](https://x.com/nosana_ai) for updates.

### Important Notes

- Ensure your agent doesn't expose sensitive data
- Test thoroughly before submission
- Keep your Docker images lightweight
- Document all dependencies clearly
- Make your code reproducible
- You can vibe code it if you want 😉
- **Only one submission per participant**
- **Submissions that do not compile, and do not meet the specified requirements, will not be considered**
- **Deadline is: 9 July 2025, 12.01 PM**
- **Announcement will be announced about one week later, stay tuned for our socials for exact date**
- **Finalize your submission at [SuperTeam](https://earn.superteam.fun/agent-challenge)**

### Don’t Miss Nosana Builder Challenge Updates

Good luck, builders! We can't wait to see the innovative AI agents you create for the Nosana ecosystem.
**Happy Building!**

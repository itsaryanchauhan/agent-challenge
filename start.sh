#!/bin/bash
set -e

echo "🔍 Environment check..."
echo "API_BASE_URL: $API_BASE_URL"
echo "MODEL_NAME_AT_ENDPOINT: $MODEL_NAME_AT_ENDPOINT"

# Check if API_BASE_URL contains localhost or 127.0.0.1 (local Ollama)
if echo "$API_BASE_URL" | grep -q "localhost\|127.0.0.1"; then
  echo "🔧 Local Ollama detected - Starting Ollama service and downloading model..."
  
  # Start Ollama in background
  ollama serve &
  OLLAMA_PID=$!
  
  # Wait for Ollama to be ready
  echo "⏳ Waiting for Ollama to start..."
  sleep 10
  
  # Download the model
  echo "📥 Pulling model: $MODEL_NAME_AT_ENDPOINT"
  ollama pull "$MODEL_NAME_AT_ENDPOINT"
  
  echo "✅ Model ready: $MODEL_NAME_AT_ENDPOINT"
else
  echo "🌐 External API detected - Skipping local Ollama setup"
  echo "📡 Using: $API_BASE_URL"
fi

echo "🚀 Starting crypto agent..."
exec pnpm start

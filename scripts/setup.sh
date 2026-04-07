#!/usr/bin/env bash
set -euo pipefail

echo "==> Setting up GenAI project"

# Copy env template
if [ ! -f .env ]; then
  cp .env.example .env
  echo "==> Created .env from template — add your API keys"
fi

# TypeScript / Node deps
if command -v npm &>/dev/null; then
  echo "==> Installing Node dependencies"
  npm install
else
  echo "WARNING: npm not found, skipping Node dependencies"
fi

# Python deps
if command -v pip &>/dev/null; then
  echo "==> Installing Python dependencies"
  pip install -r requirements.txt
else
  echo "WARNING: pip not found, skipping Python dependencies"
fi

echo "==> Setup complete. Run 'jupyter notebook notebooks/' to start."

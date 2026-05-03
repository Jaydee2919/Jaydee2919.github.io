#!/bin/zsh
cd "$(dirname "$0")"

if command -v node >/dev/null 2>&1; then
  node editor-server.js
else
  echo "Node.js was not found. Install Node.js or ask Codex to start the editor server."
  read -k 1 "?Press any key to close."
fi

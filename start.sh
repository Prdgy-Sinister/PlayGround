#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
STATIC_DIR="$PROJECT_DIR/dist"
PORT="${PORT:-3000}"
OPENCODE_WEB_DIR="${OPENCODE_WEB_DIR:?OPENCODE_WEB_DIR must be set by the runtime}"
export PORT

cd "$PROJECT_DIR"
/usr/bin/time -p npm ci --ignore-scripts --no-audit --no-fund
/usr/bin/time -p rm -rf "$STATIC_DIR"
/usr/bin/time -p mkdir -p "$STATIC_DIR"
/usr/bin/time -p cp -R index.html src assets vendor "$STATIC_DIR/"
/usr/bin/time -p mkdir -p "$OPENCODE_WEB_DIR"
PROJECT_DIR="$PROJECT_DIR" STATIC_DIR="$STATIC_DIR" /usr/bin/time -p node -e 'const fs = require("node:fs"); const path = require("node:path"); fs.writeFileSync(path.join(process.env.OPENCODE_WEB_DIR, "deployment-output.json"), JSON.stringify({ project: process.env.PROJECT_DIR, directory: process.env.STATIC_DIR }));'
cd "$STATIC_DIR"
echo "Serving static output from $STATIC_DIR on port $PORT"
exec /usr/bin/time -p node "$PROJECT_DIR/server.mjs"

#!/usr/bin/env bash
# Build the static site and serve it in the foreground.
# Worker metadata lives in OPENCODE_WEB_DIR; the built site stays inside PROJECT_DIR.
set -euo pipefail

cd "$(dirname "$0")"
PROJECT_DIR="$(pwd -P)"
PORT="${PORT:-3000}"
WEB_DIR="${OPENCODE_WEB_DIR:-${RUNNER_TEMP:-/tmp}/omgithub-web}"
DIST_DIR="$PROJECT_DIR/dist"

mkdir -p "$WEB_DIR"

now_ms() { date +%s%3N; }

# Run one external command and report how long it took.
timed() {
  local label="$1"
  shift
  local began ended status
  began="$(now_ms)"
  set +e
  "$@"
  status=$?
  set -e
  ended="$(now_ms)"
  printf '[start] [timing] %s: %d ms\n' "$label" "$((ended - began))"
  return "$status"
}

write_deployment_output() {
  printf '{"project":"%s","directory":"%s"}\n' "$PROJECT_DIR" "$DIST_DIR" > "$WEB_DIR/deployment-output.json"
  cat "$WEB_DIR/deployment-output.json"
}

printf '[start] project=%s port=%s\n' "$PROJECT_DIR" "$PORT"

# ————— dependencies —————
package_hash="$(node -e '
const fs = require("fs");
const crypto = require("crypto");
const hash = crypto.createHash("sha256");
for (const file of ["package.json", "package-lock.json"]) {
  try { hash.update(fs.readFileSync(file)); } catch {}
}
process.stdout.write(hash.digest("hex"));
')"
installed_hash=""
[ -f "$WEB_DIR/default-dependencies" ] && installed_hash="$(cat "$WEB_DIR/default-dependencies")"

needs_install=0
[ -x node_modules/.bin/vite ] || needs_install=1
[ -d node_modules/three ] || needs_install=1
[ "$installed_hash" = "$package_hash" ] || needs_install=1

if [ "$needs_install" = 1 ]; then
  if [ -f package-lock.json ]; then
    timed "npm ci" npm ci --no-audit --no-fund
  else
    timed "npm install" npm install --no-audit --no-fund
  fi
  printf '%s' "$package_hash" > "$WEB_DIR/default-dependencies"
else
  printf '[start] dependencies unchanged\n'
fi

# ————— build when needed —————
needs_build=0
if [ "${FORCE_BUILD:-0}" = 1 ] || [ ! -f "$DIST_DIR/index.html" ]; then
  needs_build=1
elif [ "$needs_install" = 1 ]; then
  needs_build=1
elif find src index.html package.json package-lock.json vite.config.js -newer "$DIST_DIR/index.html" -print -quit 2>/dev/null | grep -q .; then
  needs_build=1
fi

if [ "$needs_build" = 1 ]; then
  timed "vite build" ./node_modules/.bin/vite build --base ./
else
  printf '[start] build is up to date\n'
fi
[ -f "$DIST_DIR/index.html" ] || { echo '[start] build did not produce dist/index.html' >&2; exit 1; }

# ————— deployment metadata —————
timed "deployment metadata" write_deployment_output

# ————— serve in the foreground —————
printf '[start] serving %s on http://0.0.0.0:%s\n' "$DIST_DIR" "$PORT"
serve_began="$(now_ms)"
./node_modules/.bin/vite preview --host 0.0.0.0 --port "$PORT" --strictPort &
server_pid=$!

cleanup() {
  kill "$server_pid" 2>/dev/null || true
  wait "$server_pid" 2>/dev/null || true
}
trap cleanup TERM INT HUP

ready=0
for _ in $(seq 1 120); do
  if curl --fail --silent --max-time 1 "http://127.0.0.1:$PORT/" >/dev/null 2>&1; then
    ready=1
    break
  fi
  kill -0 "$server_pid" 2>/dev/null || break
  sleep 0.5
done
if [ "$ready" = 1 ]; then
  printf '[start] [timing] serve ready: %d ms\n' "$(( $(now_ms) - serve_began ))"
else
  printf '[start] server did not become ready on port %s\n' "$PORT" >&2
  exit 1
fi

# Keep the server in the foreground until the controller stops this session.
wait "$server_pid"

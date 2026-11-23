#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PORT="${PORT:-3000}"
OPENCODE_WEB_DIR="${OPENCODE_WEB_DIR:-${RUNNER_TEMP:-/tmp}/omgithub-web}"
export PORT OPENCODE_WEB_DIR
cd "$PROJECT_DIR"

run_timed() {
  local label="$1"
  shift
  printf '[timing] %s\n' "$label" >&2
  /usr/bin/time -p "$@"
}

run_timed 'create worker metadata directory' mkdir -p "$OPENCODE_WEB_DIR"
run_timed 'install dependencies' npm ci --no-audit --no-fund
run_timed 'build static site' npm run build

run_timed 'write deployment metadata' node --input-type=module -e '
  import { writeFileSync, realpathSync } from "node:fs";
  import { resolve } from "node:path";
  const project = realpathSync(process.cwd());
  const directory = resolve(project, "dist");
  if (!directory.startsWith(project + "/")) throw new Error("Build output must stay inside the project");
  writeFileSync(resolve(process.env.OPENCODE_WEB_DIR, "deployment-output.json"), JSON.stringify({ project, directory }));
'

# Keep the preview server in the foreground so the controller-owned tmux session
# tracks its lifetime and can reuse a healthy server.
run_timed 'serve built site' npm run preview -- --port "$PORT" --strictPort

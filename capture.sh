#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
RUNTIME_DIR="${RUNTIME_DIR:?RUNTIME_DIR must point to the worker runtime}"
: "${CAPTURE_URL:?Set CAPTURE_URL to the exact preview URL}"
: "${CAPTURE_DIR:?Set CAPTURE_DIR to an evidence directory outside the project}"

run_timed() {
  local label="$1"
  shift
  printf '[timing] %s\n' "$label" >&2
  /usr/bin/time -p "$@"
}

run_timed 'validate URL and prepare capture directory' node --input-type=module -e '
  import { mkdirSync, realpathSync } from "node:fs";
  import { resolve } from "node:path";
  const url = new URL(process.env.CAPTURE_URL);
  if (url.protocol !== "http:" && url.protocol !== "https:") throw new Error("CAPTURE_URL must use HTTP or HTTPS");
  const project = realpathSync(process.cwd());
  const output = resolve(process.env.CAPTURE_DIR);
  if (output === project || output.startsWith(project + "/")) throw new Error("CAPTURE_DIR must be outside the project");
  mkdirSync(output, { recursive: true });
'

# The worker capture runner owns and closes its Chromium instance, waits for the
# page and fonts to render, and distinguishes transient browser/navigation errors
# (75) from rendering or script defects (1).
run_timed 'capture desktop and mobile views' node "$RUNTIME_DIR/scripts/default-capture.mjs"

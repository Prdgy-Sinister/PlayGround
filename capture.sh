#!/usr/bin/env bash
# Capture desktop and mobile screenshots of the deployed URL.
# Output is written to CAPTURE_DIR (outside the project source tree).
set -euo pipefail

cd "$(dirname "$0")"
PROJECT_DIR="$(pwd -P)"
: "${CAPTURE_URL:?Set CAPTURE_URL to the page to capture.}"
: "${CAPTURE_DIR:?Set CAPTURE_DIR to the output directory.}"

if [[ "$(realpath -m "$CAPTURE_DIR")/" == "$PROJECT_DIR/"* ]]; then
  echo '[capture] CAPTURE_DIR must be outside the project source tree.' >&2
  exit 1
fi

mkdir -p "$CAPTURE_DIR"

now_ms() { date +%s%3N; }
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
  printf '[capture] [timing] %s: %d ms\n' "$label" "$((ended - began))"
  return "$status"
}

printf '[capture] url=%s output=%s\n' "$CAPTURE_URL" "$CAPTURE_DIR"

# capture.mjs prints its own per-action timings and exits 75 for temporary
# browser/navigation failures or 1 for script/rendering defects.
timed "browser run" node "$PROJECT_DIR/scripts/capture.mjs"

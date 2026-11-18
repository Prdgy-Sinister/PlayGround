#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
: "${CAPTURE_URL:?Set CAPTURE_URL to the exact preview URL}"
: "${CAPTURE_DIR:?Set CAPTURE_DIR to an evidence directory outside the project}"

case "$CAPTURE_URL" in
  http://*|https://*) ;;
  *) echo 'CAPTURE_URL must be an absolute HTTP(S) URL.' >&2; exit 1 ;;
esac

CAPTURE_PATH="$(/usr/bin/time -p realpath -m "$CAPTURE_DIR")"
case "$CAPTURE_PATH/" in
  "$PROJECT_DIR/"*) echo 'CAPTURE_DIR must be outside the project directory.' >&2; exit 1 ;;
esac

/usr/bin/time -p mkdir -p "$CAPTURE_PATH"
export CAPTURE_DIR="$CAPTURE_PATH"
export CAPTURE_READY_SELECTOR="${CAPTURE_READY_SELECTOR:-#screen:not(:empty)}"
export CAPTURE_STRICT=1

RUNTIME_DIR="${RUNTIME_DIR:-/home/runner/work/_temp/omgithub-runtime}"
CAPTURE_SCRIPT="$RUNTIME_DIR/scripts/default-capture.mjs"
/usr/bin/time -p test -f "$CAPTURE_SCRIPT"
/usr/bin/time -p node "$CAPTURE_SCRIPT"

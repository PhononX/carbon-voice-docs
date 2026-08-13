#!/bin/bash
# Installs npm dependencies at the start of a cloud session, so that
# `npm run typecheck` and `npm run build` are ready to run immediately.
#
# Local sessions are skipped: developers manage their own node_modules, and
# a clean install on every session start would be slow and destructive.

if [ "$CLAUDE_CODE_REMOTE" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR" || exit 0

npm ci || exit 0
exit 0

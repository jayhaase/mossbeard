#!/usr/bin/env bash
# Run the same checks as .github/workflows/lint.yml (yamllint + Jekyll build + html-proofer).
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$root"

if ! command -v yamllint >/dev/null 2>&1; then
  echo "yamllint is required. Install with: brew install yamllint  (or: pip install yamllint)" >&2
  exit 1
fi

echo "==> yamllint"
yamllint _data _config.yml

if ! bundle check >/dev/null 2>&1; then
  echo "==> bundle install (missing gems)"
  bundle install
fi

echo "==> jekyll build"
bundle exec jekyll build

echo "==> html-proofer"
bundle exec htmlproofer ./_site --disable-external

echo "All checks passed."

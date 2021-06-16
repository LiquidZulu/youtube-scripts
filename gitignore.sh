#!/usr/bin/env bash
set -euo pipefail

find . -size +1G | sed 's|^\./||g' | cat >> .gitignore; awk '!NF || !seen[$0]++' .gitignore

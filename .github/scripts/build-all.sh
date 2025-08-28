#!/usr/bin/env bash
set -euo pipefail

ROOT="$(pwd)"
STAGE="$ROOT/public"
rm -rf "$STAGE"
mkdir -p "$STAGE"

shopt -s nullglob


detect_pm() {
  # Args: project_dir
  local d="$1"

  # 1) lockfile wins
  if [ -f "pnpm-lock.yaml" ]; then echo pnpm; return; fi
  if [ -f "yarn.lock" ]; then echo yarn; return; fi
  if [ -f "package-lock.json" ]; then echo npm; return; fi
  if [ -f "bun.lockb" ]; then echo bun; return; fi

  # 2) package.json "packageManager" field if present
  # Use node to read it (jq not guaranteed on runner)
  if [ -f "package.json" ]; then
    local pm
    pm=$(node -e "try{const x=require('package.json').packageManager||'';console.log(x)}catch(e){process.exit(0)}")
    # pm looks like "pnpm@8.15.4" etc.
    case "$pm" in
      pnpm@*) echo pnpm; return ;;
      yarn@*) echo yarn; return ;;
      npm@*)  echo npm;  return ;;
      bun@*)  echo bun;  return ;;
    esac
  fi

  # 3) default
  echo npm
}

pm_install() {
  # Args: pm, dir
  local pm="$1" d="$2"
  case "$pm" in
    pnpm)
      ( pnpm install --frozen-lockfile || pnpm install)
      ;;
    yarn)
      ( yarn install --frozen-lockfile || yarn install)
      ;;
    bun)
      ( bun install)
      ;;
    npm|*)
      if [ -f "package-lock.json" ]; then
        ( npm ci)
      else
        ( npm install)
      fi
      ;;
  esac
}

pm_run() {
  # Args: pm, dir, script, extra_args...
  local pm="$1" d="$2" script="$3"; shift 3
  case "$pm" in
    pnpm) ( pnpm run "$script" -- "$@") ;;
    yarn) ( yarn "$script" "$@") ;;
    bun)  ( bun run "$script" "$@") ;;
    npm|*) ( npm run "$script" -- "$@") ;;
  esac
}

# Util: inject or wrap Next config to ensure static export + basePath
ensure_next_config() {
  # Only care about next.config.ts
  local cfg_ts="next.config.ts"

  if [  -f "$cfg_ts" ]; then
    mv "$cfg_ts" "$cfg_ts.bak"
  fi

    # Create a minimal TypeScript config
  cat > "$cfg_ts" <<EOF
// Auto-generated in CI for GitHub Pages
import type { NextConfig } from "next";

const basePath = process.env.BASE_PATH || '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  images: { unoptimized: true },
  trailingSlash: true,
  assetPrefix: basePath || undefined,
  eslint: { ignoreDuringBuilds: true },     // 👈 ignore ESLint errors
  typescript: { ignoreBuildErrors: true },  // 👈 ignore TS errors in CI
};

export default nextConfig;
EOF
}

restore_next_config() {
  local cfg_ts="next.config.ts"
  
  if [ -f "$cfg_ts" ] && [ -f "$cfg_ts.bak" ]; then
    mv "$cfg_ts.bak" "$cfg_ts"
  fi
}

for proj in */my-app; do
  app_dir="$(dirname "$proj")"       # e.g. app1
  app_name="$(basename "$app_dir")"  # "app1"
  echo "=== Building $app_name ==="
  pushd "$proj" > /dev/null

  pm=$(detect_pm "$proj")
  echo "-> Package manager: $pm"

  pm_install "$pm" "$proj"

  # Detect frameworks
  is_vite=0; is_next=0
  ls vite.config.* >/dev/null 2>&1 && is_vite=1
  [ -f next.config.js ] || [ -f next.config.mjs ] && is_next=1
  [ -d pages ] || [ -d app ] && grep -q '"next"' package.json && is_next=1

  export BASE_PATH="/frontend-tests/$app_name"
  export NEXT_PUBLIC_BASE_PATH="$BASE_PATH"
  out_dir=""

  if [ "$is_vite" -eq 1 ] && [ "$is_next" -eq 1 ]; then
    echo "Both Vite and Next detected; defaulting to Next."
    is_vite=0
  fi

  if [ "$is_next" -eq 1 ]; then
    echo "-> Next.js"
    ensure_next_config "$proj" "$BASE_PATH"
    pm_run "$pm" "$proj" build

    restore_next_config

    # export output
    if [ -d out ]; then
      out_dir="out"
    else
      pm_run "$pm" "$proj" export || true
      out_dir="out"
    fi
  elif [ "$is_vite" -eq 1 ]; then
    echo "-> Vite"
    # Pass base via CLI; most setups respect it, else fallback to default `vite.config`
    # pm_run "$pm" "$proj" build -- --base="$BASE_PATH" || pm_run "$pm" "$proj" build
    case "$pm" in
        pnpm) pnpm exec vite build --base="$BASE_PATH" ;;
        yarn) yarn vite build --base "$BASE_PATH" ;;
        npm|*) npx vite build --base="$BASE_PATH" ;;
    esac
    out_dir="dist"
    # SPA fallback for GH Pages
    if [ -f "$out_dir/index.html" ]; then
      cp "$out_dir/index.html" "$out_dir/404.html" || true
    fi
  else
    echo "Could not detect Vite or Next in $proj"
    exit 1
  fi

  popd > /dev/null

  mkdir -p "$STAGE/$app_name"
  cp -r "$proj/$out_dir/"* "$STAGE/$app_name/"
done

# Required by GitHub Pages
touch "$STAGE/.nojekyll"
echo "✅ Staged to $STAGE"

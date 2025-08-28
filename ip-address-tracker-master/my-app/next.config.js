// AUTO_INJECT_GHPAGES START
const __AUTO_BASE = process.env.BASE_PATH || '';
const __autoGhPages = {
  output: 'export',
  basePath: __AUTO_BASE,
  images: { unoptimized: true },
  trailingSlash: true,
  assetPrefix: __AUTO_BASE || undefined,
  eslint: { ignoreDuringBuilds: true },     // 👈 ignore ESLint errors
  typescript: { ignoreBuildErrors: true },  // 👈 ignore TS errors in CI
};
// AUTO_INJECT_GHPAGES END

const __orig = module.exports || {};
module.exports = { ...__orig, ...__autoGhPages };


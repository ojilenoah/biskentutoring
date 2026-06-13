/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { dev }) => {
    // Disable webpack persistent file-system cache in dev mode.
    // On Windows, the cache writes hit a rename race (`*.pack.gz_` -> `*.pack.gz`)
    // that's triggered by Defender / OneDrive holding the file open. The cache is
    // an optimization, not required for the build, so we turn it off in dev.
    if (dev) {
      config.cache = false
    }
    return config
  },
}

export default nextConfig

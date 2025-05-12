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
  experimental: {
    webpackBuildWorker: true,
  },
  output: 'standalone',
  // Configure SWC for WebContainer environment
  swcMinify: true,
  webpack: (config, { isServer }) => {
    // Force SWC to use the WASM target
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@next/swc-wasm-nodejs': '@next/swc-wasm-web',
      }
    }
    return config
  }
}

export default nextConfig
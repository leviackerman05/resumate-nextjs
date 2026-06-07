/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@react-pdf/renderer'],
  experimental: {
    serverComponentsExternalPackages: ['pdf-parse', '@napi-rs/canvas', 'pdfjs-dist'],
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false
    return config
  },
}

export default nextConfig

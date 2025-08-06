/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    unoptimized: false,
    formats: ['image/webp', 'image/avif'],
  },
}

module.exports = nextConfig 
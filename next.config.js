/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Turbopack compatible (Next.js 16+)
  turbopack: {},
};

module.exports = nextConfig;

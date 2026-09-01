/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // three.js ships untranspiled ESM in places; keep it in the compile graph.
  transpilePackages: ['three'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;

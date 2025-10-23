// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // Required for static export
  trailingSlash: true, // Optional: adds trailing slashes to URLs
  images: {
    unoptimized: true, // Required for static exports (disables Image Optimization)
  },
};

export default nextConfig;
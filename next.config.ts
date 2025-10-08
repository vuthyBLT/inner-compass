import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  // This is the correct way to enable static export
  output: 'export',

  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // This setting is also required for static export
    unoptimized: true,
  },
};

export default nextConfig;

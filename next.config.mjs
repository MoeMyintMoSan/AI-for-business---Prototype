/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Add any experimental features here if needed
  },
  // Configure path mapping
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': './src',
    }
    return config
  }
};

export default nextConfig;

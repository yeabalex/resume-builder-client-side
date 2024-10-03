/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['firebasestorage.googleapis.com'],
    },
  };
  
  module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://kraft-server.onrender.com/:path*',
        },
      ];
    },
  };
  export default nextConfig;
  
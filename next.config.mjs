/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['firebasestorage.googleapis.com'],
    },
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


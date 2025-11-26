/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Permite TODOS os domínios HTTPS
      },
      {
        protocol: 'http',
        hostname: '**', // Permite TODOS os domínios HTTP (para desenvolvimento local)
      }
    ],
  },
};

export default nextConfig;
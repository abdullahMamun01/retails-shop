/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'm.media-amazon.com',
       
          },
          {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
       
          },
        ],
      },
};

export default nextConfig;

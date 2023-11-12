/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["res.cloudinary.com", "localhost", "brightfutureapi.vercel.app"],
  },
};

// config.resolve.alias['graphql-upload'] = ''

module.exports = nextConfig;

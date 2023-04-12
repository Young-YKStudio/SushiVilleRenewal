/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    APP_URL: process.env.APP_URL,
    UPLOADCARE_PUB: process.env.UPLOADCARE_PUB,
    UPLOADCARE_SEC: process.env.UPLOADCARE_SEC,
  }
}

module.exports = nextConfig

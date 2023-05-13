/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    APP_URL: process.env.APP_URL,
    UPLOADCARE_PUB: process.env.UPLOADCARE_PUB,
    UPLOADCARE_SEC: process.env.UPLOADCARE_SEC,
    APP_GOOGLE_APPKEY: process.env.APP_GOOGLE_APPKEY,
    APP_STRIPE_PUB_KEY: process.env.APP_STRIPE_PUB_KEY,
  }
}

module.exports = nextConfig

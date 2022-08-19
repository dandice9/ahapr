/** @type {import('next').NextConfig} */
const googleDomains = [1,2,3,4,5,6].map(v => `lh${v}.googleusercontent.com`)
const fbDomains = ['platform-lookaside.fbsbx.com']
const gravatarDomains = ['s.gravatar.com']
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: googleDomains.concat(fbDomains).concat(gravatarDomains)
  }
}

module.exports = nextConfig

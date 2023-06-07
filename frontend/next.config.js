/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:slug*',
        // destination: 'http://ec2-3-80-132-185.compute-1.amazonaws.com/:slug*'
        destination: 'http://localhost:8080/:slug*'
      },
    ]
  }
}

//comment for package.json since json doesnt like comments
//"proxy": "http://localhost:8080",

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:slug*',
        destination: 'http://pf-be-env.eba-cfmh5rch.us-east-1.elasticbeanstalk.com/:slug*'
        // destination: 'http://localhost:8080/:slug*'
      },
    ]
  }
}

//comment for package.json since json doesnt like comments
//"proxy": "http://localhost:8080",

module.exports = nextConfig

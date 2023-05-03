/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:slug*',
        destination: 'http://localhost:8080/:slug*'
      },
    ]
  }
}

// export async function rewrites() {
//   return [
//     {
//       source: '/api/:slug*',
//       destination: 'http://localhost:8080/:slug*'
//     },
//   ]
// }

module.exports = nextConfig

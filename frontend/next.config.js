/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:slug*',
        destination: 'ec2-3-80-132-185.compute-1.amazonaws.com/:slug*'
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

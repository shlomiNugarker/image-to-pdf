/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://png-to-pdf-production.up.railway.app', // Replace with your API server URL
      },
    ]
  },
}

export default nextConfig

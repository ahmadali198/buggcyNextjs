/** @type {import('next').NextConfig} */
const nextConfig = {
  // This function sets up a redirect from the root path to the login page.
  // This ensures that all unauthenticated users land on the login page first.
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

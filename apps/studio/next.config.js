/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@uios/compiler',
    '@uios/knowledge',
    '@uios/critics',
    '@uios/adapters',
    '@uios/engine',
    '@uios/skills',
  ],
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei', '@react-three/postprocessing'],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'three': path.resolve('./node_modules/three')
    };
    return config;
  }
};

module.exports = nextConfig;

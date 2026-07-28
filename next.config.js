/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true, // ✅ FIX
  },
};

module.exports = nextConfig;
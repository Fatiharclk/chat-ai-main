/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Tüm deneysel özellikleri kaldırıyoruz
  // Sadece temel yapılandırmayı tutuyoruz
};

module.exports = nextConfig;

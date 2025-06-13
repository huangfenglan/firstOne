/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {},
  sassOptions: {
    implementation: 'sass-embedded',
  },
  output: 'standalone', // 关键配置：禁用 HTML 导出
  reactStrictMode: true,
};

export default nextConfig;

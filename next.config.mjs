// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',           // این خط مهمه!
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
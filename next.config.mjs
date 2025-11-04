// next.config.mjs
// این فایل تنظیمات اصلی Next.js هست
// فقط Next.js این فایل رو می‌خونه (نه .ts و نه .js معمولی)

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',           // خروجی استاتیک (برای Firebase Hosting)
  images: {
    unoptimized: true,        // غیرفعال کردن بهینه‌سازی تصویر (برای static export)
  },
  trailingSlash: true,        // اضافه کردن / به آخر URLها
};

export default nextConfig;
// postcss.config.mjs
// این فایل تنظیمات PostCSS هست
// Tailwind از PostCSS استفاده می‌کنه
// باید با ES Module باشه

export default {
  plugins: {
    tailwindcss: {},     // فعال‌سازی Tailwind
    autoprefixer: {},    // اضافه کردن پیشوندهای مرورگر
  },
};
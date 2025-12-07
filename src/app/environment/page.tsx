// src/app/environment/page.tsx
// هدف: صفحه محیط زیست — کیفیت هوا، آلودگی، سنسورها
// وضعیت: بدون نیاز به MapPlaceholder — مستقیم placeholder داخل صفحه

export default function EnvironmentPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-white">Environment Monitoring</h1>
      <p className="text-gray-400 text-lg">Air quality, noise levels, and environmental sensors across the city</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-teal-600 to-green-600 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold">Air Quality Index</h3>
          <p className="text-7xl font-bold mt-4">42</p>
          <p className="text-white/90">Good</p>
        </div>
        <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold">PM2.5</h3>
          <p className="text-6xl font-bold mt-4">18 µg/m³</p>
        </div>
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold">Noise Level</h3>
          <p className="text-6xl font-bold mt-4">58 dB</p>
          <p className="text-white/80 mt-2">Moderate</p>
        </div>
      </div>

      <div className="bg-gray-800 border-2 border-dashed border-white/20 rounded-xl h-96 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-gray-400">Environmental Sensors Map</p>
          <p className="text-sm text-gray-500 mt-2">Coming Soon</p>
        </div>
      </div>
    </div>
  );
}
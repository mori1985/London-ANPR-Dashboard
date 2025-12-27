// scripts/add-sensors.js
// هدف: اضافه کردن خودکار سنسورهای محیطی به Firestore با Admin SDK
// کارکرد: مستقیم از VS Code داده push می‌کنه — بدون خطای permission
// اجرا: node scripts/add-sensors.js

const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json"); // مسیر فایل JSON

// اگر قبلاً اپلیکیشن ادمین ساخته نشده باشه
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://traffic-control-dashboard.firebaseio.com" // URL پروژه‌ات رو عوض کن اگر متفاوت بود
  });
}

const db = admin.firestore();

const sensors = [
  {
    name: "Trafalgar Square Sensor",
    location: { lat: 51.5081, lng: -0.1281 },
    temperature: 18.5,
    humidity: 68,
    aqi: 42,
    aqi_level: "Good"
  },
  {
    name: "Piccadilly Circus Sensor",
    location: { lat: 51.5100, lng: -0.1348 },
    temperature: 19.2,
    humidity: 72,
    aqi: 58,
    aqi_level: "Moderate"
  },
  {
    name: "Westminster Bridge Sensor",
    location: { lat: 51.5010, lng: -0.1218 },
    temperature: 17.8,
    humidity: 75,
    aqi: 35,
    aqi_level: "Good"
  },
  {
    name: "Oxford Street Sensor",
    location: { lat: 51.5155, lng: -0.1410 },
    temperature: 20.1,
    humidity: 65,
    aqi: 48,
    aqi_level: "Good"
  }
];

async function addSensors() {
  try {
    for (const sensor of sensors) {
      await db.collection("environmental_sensors").add(sensor);
      console.log(`سنسور اضافه شد: ${sensor.name}`);
    }
    console.log("🎉 همه سنسورها با موفقیت اضافه شدن!");
  } catch (error) {
    console.error("خطا در اضافه کردن سنسورها:", error.message);
  }
}

addSensors();
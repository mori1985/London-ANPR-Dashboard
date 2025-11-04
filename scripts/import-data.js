// scripts/import-data.js
const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const trafficData = [
  {
    name: "Oxford Street",
    location: { lat: 51.5155, lng: -0.1410 },
    speed_avg: 28,
    vehicles_count: 110,
    congestion: "medium"
  },
  {
    name: "Westminster Bridge",
    location: { lat: 51.5009, lng: -0.1218 },
    speed_avg: 35,
    vehicles_count: 95,
    congestion: "low"
  },
  {
    name: "Piccadilly Circus",
    location: { lat: 51.5101, lng: -0.1354 },
    speed_avg: 15,
    vehicles_count: 140,
    congestion: "high"
  }
];

async function importData() {
  try {
    // پاک کردن داده‌های قبلی
    const snapshot = await db.collection('traffic_data').get();
    const batch = db.batch();
    snapshot.docs.forEach(doc => batch.delete(doc.ref));
    await batch.commit();

    // اضافه کردن داده‌های جدید
    const batch2 = db.batch();
    const collectionRef = db.collection('traffic_data');

    trafficData.forEach((item, index) => {
      const docRef = collectionRef.doc(`london_${index + 1}`);
      batch2.set(docRef, item);
    });

    await batch2.commit();
    console.log('داده‌های لندن با موفقیت وارد شد!');
  } catch (err) {
    console.error('خطا:', err);
  }
}

importData();
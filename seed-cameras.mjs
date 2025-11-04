// seed-cameras.mjs
// این اسکریپت دیتابیس قبلی (traffic_data) رو پاک می‌کنه
// و collection جدید (traffic_cameras) با ۳ دوربین اضافه می‌کنه
// با ES Module (import) کار می‌کنه

import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, deleteDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBHq-5Xwret8F14j__M6nRt59MQ0VRR77M",
  authDomain: "traffic-control-dashboard.firebaseapp.com",
  projectId: "traffic-control-dashboard",
  storageBucket: "traffic-control-dashboard.firebasestorage.app",
  messagingSenderId: "508685039163",
  appId: "1:508685039163:web:8a1633cfc6ee1211fa0e1e"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const cameras = [
  {
    id: "cam_001",
    name: "Piccadilly Circus Cam",
    location: { lat: 51.5101, lng: -0.1354 },
    status: "online",
    last_plate: "AB12 CDE",
    plates_count: 142,
    alert: true,
    image_url: "https://picsum.photos/seed/piccadilly/600/400"
  },
  {
    id: "cam_002",
    name: "Westminster Bridge Cam",
    location: { lat: 51.5007, lng: -0.1246 },
    status: "online",
    last_plate: "XY99 ZZZ",
    plates_count: 89,
    alert: false,
    image_url: "https://picsum.photos/seed/westminster/600/400"
  },
  {
    id: "cam_003",
    name: "Oxford Street Cam",
    location: { lat: 51.5155, lng: -0.1410 },
    status: "offline",
    last_plate: "N/A",
    plates_count: 0,
    alert: false,
    image_url: "https://picsum.photos/seed/oxford/600/400"
  }
];

async function seedDatabase() {
  try {
    console.log("Deleting old collection: traffic_data...");
    const oldSnapshot = await getDocs(collection(db, "traffic_data"));
    const deletePromises = oldSnapshot.docs.map(d => deleteDoc(d.ref));
    await Promise.all(deletePromises);
    console.log("Deleted traffic_data");

    console.log("Creating new collection: traffic_cameras...");
    const createPromises = cameras.map(camera =>
      setDoc(doc(db, "traffic_cameras", camera.id), camera)
    );
    await Promise.all(createPromises);
    console.log("Successfully added 3 cameras to traffic_cameras!");

    console.log("\nData is ready! Run: npm run dev");
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

seedDatabase();
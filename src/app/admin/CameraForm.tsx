// src/components/admin/CameraForm.tsx
'use client';

import { useState } from "react";
import { db } from "@/lib/firebase";
import { addDoc, updateDoc, deleteDoc, doc, collection } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function CameraForm({ camera, onSave }: any) {
  const [form, setForm] = useState(camera || {
    name: "", lat: 51.5074, lng: -0.1278, status: "online", image_url: ""
  });

  const handleSave = async () => {
    if (camera?.id) {
      await updateDoc(doc(db, "cameras", camera.id), form);
    } else {
      await addDoc(collection(db, "cameras"), { ...form, alert: false, plates_count: 0 });
    }
    onSave();
  };

  return (
    <Card className="p-6">
      <Input placeholder="Camera Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <Input placeholder="Lat" type="number" step="0.0001" value={form.lat} onChange={(e) => setForm({ ...form, lat: parseFloat(e.target.value) })} />
      <Input placeholder="Lng" type="number" step="0.0001" value={form.lng} onChange={(e) => setForm({ ...form, lng: parseFloat(e.target.value) })} />
      <Input placeholder="Image URL" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
      <Button onClick={handleSave} className="mt-4">Save Camera</Button>
    </Card>
  );
}
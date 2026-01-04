// src/components/admin/CameraForm.tsx
'use client';

import { useState } from "react";
import { db } from "@/lib/firebase";
import { addDoc, updateDoc, doc, collection } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CameraForm({ camera, onSave }: { camera?: any; onSave: () => void }) {
  const [form, setForm] = useState({
    name: camera?.name || "",
    lat: camera?.location?.lat || 51.5074,
    lng: camera?.location?.lng || -0.1278,
    image_url: camera?.image_url || "https://picsum.photos/400/300",
    status: camera?.status || "online",
  });

  const handleSave = async () => {
    const data = {
      name: form.name,
      location: { lat: form.lat, lng: form.lng },
      image_url: form.image_url,
      status: form.status,
      last_plate: camera?.last_plate || "N/A",
      plates_count: camera?.plates_count || 0,
      alert: camera?.alert || false,
    };

    try {
      if (camera?.id) {
        await updateDoc(doc(db, "traffic_cameras", camera.id), data);
      } else {
        await addDoc(collection(db, "traffic_cameras"), data);
      }
      onSave();
    } catch (error) {
      alert("Error saving camera");
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Camera Name</Label>
        <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Piccadilly Circus" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label>Latitude</Label>
          <Input type="number" step="0.0001" value={form.lat} onChange={e => setForm({ ...form, lat: parseFloat(e.target.value) || 0 })} />
        </div>
        <div>
          <Label>Longitude</Label>
          <Input type="number" step="0.0001" value={form.lng} onChange={e => setForm({ ...form, lng: parseFloat(e.target.value) || 0 })} />
        </div>
      </div>
      <div>
        <Label>Image URL</Label>
        <Input value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })} placeholder="https://example.com/image.jpg" />
      </div>
      <Button onClick={handleSave} className="w-full">
        {camera ? "Update" : "Add"} Camera
      </Button>
    </div>
  );
}
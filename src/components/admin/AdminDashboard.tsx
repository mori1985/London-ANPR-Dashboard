// src/components/admin/AdminDashboard.tsx
'use client';

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Camera {
  id: string;
  name: string;
  location: { lat: number; lng: number };
  status: "online" | "offline";
  last_plate: string;
  plates_count: number;
  alert: boolean;
  image_url: string;
}

export default function AdminDashboard() {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [form, setForm] = useState({
    name: "",
    lat: 51.5074,
    lng: -0.1278,
    image_url: "https://picsum.photos/600/400?random=1",
    status: "online" as "online" | "offline",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "traffic_cameras"), (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Camera));
      setCameras(data);
    });
    return () => unsub();
  }, []);

  const handleSave = async () => {
    const data = {
      name: form.name || "New Camera",
      location: { lat: form.lat, lng: form.lng },
      image_url: form.image_url,
      status: form.status,
      last_plate: "N/A",
      plates_count: 0,
      alert: false,
    };

    try {
      if (editingId) {
        await updateDoc(doc(db, "traffic_cameras", editingId), data);
        setEditingId(null);
      } else {
        await addDoc(collection(db, "traffic_cameras"), data);
      }
      setForm({
        name: "",
        lat: 51.5074,
        lng: -0.1278,
        image_url: "https://picsum.photos/600/400?random=1",
        status: "online",
      });
    } catch (error) {
      alert("Error saving camera");
    }
  };

  const handleEdit = (cam: Camera) => {
    setForm({
      name: cam.name,
      lat: cam.location.lat,
      lng: cam.location.lng,
      image_url: cam.image_url,
      status: cam.status,
    });
    setEditingId(cam.id);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this camera?")) {
      await deleteDoc(doc(db, "traffic_cameras", id));
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">London ANPR - Admin Panel</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Add/Edit Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              {editingId ? "Edit Camera" : "Add New Camera"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Camera Name</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Piccadilly Circus" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Latitude</Label>
                <Input type="number" step="0.0001" value={form.lat} onChange={(e) => setForm({ ...form, lat: parseFloat(e.target.value) || 0 })} />
              </div>
              <div>
                <Label>Longitude</Label>
                <Input type="number" step="0.0001" value={form.lng} onChange={(e) => setForm({ ...form, lng: parseFloat(e.target.value) || 0 })} />
              </div>
            </div>
            <div>
              <Label>Image URL</Label>
              <Input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="https://example.com/image.jpg" />
            </div>
            <Button onClick={handleSave} className="w-full bg-blue-600 hover:bg-blue-700">
              {editingId ? "Update Camera" : "Add Camera"}
            </Button>
          </CardContent>
        </Card>

        {/* Camera List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Camera List ({cameras.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {cameras.length === 0 ? (
                <p className="text-center text-gray-500">No cameras added yet</p>
              ) : (
                cameras.map((cam) => (
                  <div key={cam.id} className="flex items-center justify-between p-4 border rounded-lg bg-white dark:bg-gray-800">
                    <div>
                      <p className="font-bold">{cam.name}</p>
                      <p className="text-sm text-gray-600">
                        {cam.location.lat.toFixed(4)}, {cam.location.lng.toFixed(4)} • {cam.status.toUpperCase()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleEdit(cam)}>Edit</Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(cam.id)}>Delete</Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
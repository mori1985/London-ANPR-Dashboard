// src/components/ExportButtons.tsx
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function ExportButtons({ data }: { data: any[] }) {
  const exportCSV = () => {
    const csv = [
      ["Name", "Status", "Last Plate", "Plates Today", "Lat", "Lng"],
      ...data.map(c => [c.name, c.status, c.last_plate, c.plates_count, c.location.lat, c.location.lng])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "anpr-report.csv";
    a.click();
  };

  return (
    <Button onClick={exportCSV} variant="outline" className="gap-2">
      <Download className="w-4 h-4" />
      Export CSV
    </Button>
  );
}
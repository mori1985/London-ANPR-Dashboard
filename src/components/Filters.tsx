// src/components/Filters.tsx
'use client';

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface FiltersProps {
  onFilter: (filters: any) => void;
}

export default function Filters({ onFilter }: FiltersProps) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [hasAlert, setHasAlert] = useState("all");

  useEffect(() => {
    onFilter({ search: search.toLowerCase(), status, hasAlert });
  }, [search, status, hasAlert, onFilter]);

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search plate or camera..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>
      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger className="w-full md:w-40">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="online">Online</SelectItem>
          <SelectItem value="offline">Offline</SelectItem>
        </SelectContent>
      </Select>
      <Select value={hasAlert} onValueChange={setHasAlert}>
        <SelectTrigger className="w-full md:w-40">
          <SelectValue placeholder="Alerts" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="true">Has Alert</SelectItem>
          <SelectItem value="false">No Alert</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
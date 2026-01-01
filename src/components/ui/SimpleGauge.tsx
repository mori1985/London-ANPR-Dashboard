// src/components/ui/SimpleGauge.tsx
"use client";

interface SimpleGaugeProps {
  value: number; // 0 تا 100 (درصد)
  size?: number;
  label?: string;
}

export default function SimpleGauge({ value, size = 200, label = "" }: SimpleGaugeProps) {
  // اطمینان از اینکه value بین 0 تا 100 باشه و عدد معتبر باشه
  const safeValue = isNaN(value) ? 0 : Math.min(100, Math.max(0, value));
  const radius = size / 2 - 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * safeValue) / 100;

  const getColor = () => {
    if (safeValue <= 50) return "#10b981"; // سبز
    if (safeValue <= 80) return "#f59e0b"; // نارنجی
    return "#ef4444"; // قرمز
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#374151"
          strokeWidth="20"
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor()}
          strokeWidth="20"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-4xl font-bold text-white">
          {Math.round(safeValue)}%
        </p>
        {label && <p className="text-lg text-gray-400 mt-1">{label}</p>}
      </div>
    </div>
  );
}
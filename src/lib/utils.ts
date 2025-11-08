// src/lib/utils.ts
// ابزارهای ShadCN — دستی کپی شده

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



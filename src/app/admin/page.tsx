// src/app/admin/page.tsx
import { redirect } from "next/navigation";
import { auth } from "@/lib/firebase";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default async function AdminPage() {
  const user = auth.currentUser;
  if (!user) redirect("/login");

  const token = await user.getIdTokenResult();
  if (!token.claims.admin) redirect("/");

  return <AdminDashboard />;
}
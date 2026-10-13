import { redirect } from "next/navigation";
import type { Admin } from "@prisma/client";
import { db } from "./db";
import { getSession } from "./session";

export async function getCurrentAdmin(): Promise<Admin | null> {
  const session = await getSession();
  if (!session) return null;
  return db.admin.findUnique({ where: { id: session.adminId } });
}

export async function requireAdmin(): Promise<Admin> {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}

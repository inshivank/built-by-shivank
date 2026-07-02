"use server";

import { signToken, setAuthCookie, clearAuthCookie } from "@/lib/auth";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

type LoginState = { error: string } | null;

export async function login(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@shivank.dev";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "admin123";

  if (email !== adminEmail) {
    return { error: "Invalid credentials" };
  }

  // Support both plain-text and bcrypt-hashed passwords in env
  let isValid = false;
  if (adminPassword.startsWith("$2")) {
    // bcrypt hash
    isValid = await bcrypt.compare(password, adminPassword);
  } else {
    // plain-text comparison (for dev convenience)
    isValid = password === adminPassword;
  }

  if (!isValid) {
    return { error: "Invalid credentials" };
  }

  const token = await signToken({ adminEmail: email, role: "admin" });
  await setAuthCookie(token);

  redirect("/admin");
}

export async function logout() {
  await clearAuthCookie();
  redirect("/admin/login");
}

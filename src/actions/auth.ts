"use server";

import { createHash, randomBytes } from "node:crypto";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/password";
import { createSession, destroySession } from "@/lib/session";
import { escapeHtml, sendMail } from "@/lib/mail";

export type AuthFormState = {
  error?: string;
  success?: string;
  devResetUrl?: string;
  devPreviewUrl?: string;
};

export async function loginAction(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Informe e-mail e senha." };
  }

  const admin = await db.admin.findUnique({ where: { email } });
  if (!admin || !verifyPassword(password, admin.passwordHash)) {
    return { error: "E-mail ou senha inválidos." };
  }

  await createSession(admin.id);
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/admin/login");
}

export async function requestPasswordResetAction(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  if (!email) {
    return { error: "Informe o e-mail cadastrado." };
  }

  const admin = await db.admin.findUnique({ where: { email } });

  // Resposta genérica para não revelar se o e-mail existe
  if (!admin) {
    return {
      success:
        "Se o e-mail estiver cadastrado, enviaremos o link de redefinição em instantes.",
    };
  }

  const token = randomBytes(32).toString("hex");
  const tokenHash = createHash("sha256").update(token).digest("hex");

  await db.passwordResetToken.create({
    data: {
      tokenHash,
      adminId: admin.id,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hora
    },
  });

  const baseUrl = process.env.APP_URL ?? "http://localhost:3000";
  const resetUrl = `${baseUrl}/admin/redefinir-senha?token=${token}`;

  const previewUrl = await sendMail({
    to: admin.email,
    subject: "Redefinição de senha — Painel Talentos RH",
    html: `
      <p>Olá, ${escapeHtml(admin.name)}!</p>
      <p>Recebemos uma solicitação para redefinir a senha da sua conta no painel administrativo.</p>
      <p><a href="${resetUrl}">Clique aqui para redefinir sua senha</a> (o link expira em 1 hora).</p>
      <p>Se você não solicitou, ignore este e-mail.</p>
    `,
  });

  console.log(`[auth] Link de redefinição para ${email}: ${resetUrl}`);

  return {
    success:
      "Se o e-mail estiver cadastrado, enviaremos o link de redefinição em instantes.",
    // Exibido apenas em ambiente de desenvolvimento (caixa de e-mail de teste)
    devResetUrl: resetUrl,
    devPreviewUrl: previewUrl ?? undefined,
  };
}

export async function resetPasswordAction(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const token = String(formData.get("token") ?? "");
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (!token) {
    return { error: "Token ausente. Solicite uma nova redefinição de senha." };
  }
  if (password.length < 8) {
    return { error: "A nova senha deve ter pelo menos 8 caracteres." };
  }
  if (password !== confirm) {
    return { error: "As senhas não coincidem." };
  }

  const tokenHash = createHash("sha256").update(token).digest("hex");
  const record = await db.passwordResetToken.findUnique({
    where: { tokenHash },
  });

  if (!record || record.usedAt || record.expiresAt < new Date()) {
    return {
      error: "Link inválido ou expirado. Solicite uma nova redefinição.",
    };
  }

  await db.$transaction([
    db.admin.update({
      where: { id: record.adminId },
      data: { passwordHash: hashPassword(password) },
    }),
    db.passwordResetToken.update({
      where: { id: record.id },
      data: { usedAt: new Date() },
    }),
  ]);

  redirect("/admin/login?reset=ok");
}

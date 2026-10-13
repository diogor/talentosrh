"use server";

import { escapeHtml, sendMail } from "@/lib/mail";
import { CONTACT_EMAIL } from "@/lib/constants";

export type ContactFormState = {
  error?: string;
  success?: string;
  devPreviewUrl?: string;
};

export async function sendContactAction(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { error: "Preencha nome, e-mail e mensagem." };
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { error: "Informe um e-mail válido." };
  }

  const previewUrl = await sendMail({
    to: process.env.CONTACT_EMAIL ?? CONTACT_EMAIL,
    subject: `[Site] Contato de ${name}`,
    html: `
      <h2>Novo contato pelo site</h2>
      <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
      <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
      <p><strong>Telefone:</strong> ${escapeHtml(phone) || "—"}</p>
      <p><strong>Mensagem:</strong></p>
      <p>${escapeHtml(message).replaceAll("\n", "<br>")}</p>
    `,
  });

  return {
    success: "Mensagem enviada com sucesso! Retornaremos em breve.",
    devPreviewUrl: previewUrl ?? undefined,
  };
}

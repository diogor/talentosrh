import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

type MailInput = {
  to: string;
  subject: string;
  html: string;
};

let transporterPromise: Promise<Transporter> | null = null;

/**
 * Modo desenvolvimento: cria uma conta de teste Ethereal (https://ethereal.email)
 * na primeira vez que um e-mail é enviado. As credenciais e o link de
 * visualização de cada mensagem são impressos no console do servidor.
 *
 * Para produção, basta definir SMTP_HOST, SMTP_PORT, SMTP_USER e SMTP_PASS
 * no .env e ajustar esta função.
 */
function getTransporter(): Promise<Transporter> {
  if (!transporterPromise) {
    transporterPromise = (async () => {
      const account = await nodemailer.createTestAccount();
      console.log(
        `[mail] Conta Ethereal criada — usuário: ${account.user} | senha: ${account.pass} | caixa: https://ethereal.email/login`
      );
      return nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: { user: account.user, pass: account.pass },
      });
    })();
  }
  return transporterPromise;
}

export async function sendMail(input: MailInput): Promise<string | null> {
  const transporter = await getTransporter();
  const info = await transporter.sendMail({
    from: `"${process.env.EMAIL_FROM_NAME ?? "Talentos RH"}" <no-reply@talentosrh.com.br>`,
    to: input.to,
    subject: input.subject,
    html: input.html,
  });
  const previewUrl = nodemailer.getTestMessageUrl(info) || null;
  console.log(`[mail] E-mail para ${input.to} — preview: ${previewUrl}`);
  return previewUrl;
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

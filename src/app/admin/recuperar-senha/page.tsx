import type { Metadata } from "next";
import Link from "next/link";
import { RequestResetForm } from "@/components/admin/RequestResetForm";

export const metadata: Metadata = { title: "Recuperar senha" };

export default function RecuperarSenhaPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-xl font-bold text-slate-900">Recuperar senha</h1>
          <p className="mt-1 text-sm text-slate-500">
            Informe o e-mail cadastrado e enviaremos um link para redefinir sua
            senha.
          </p>

          <div className="mt-6">
            <RequestResetForm />
          </div>

          <p className="mt-5 text-center">
            <Link
              href="/admin/login"
              className="text-sm font-medium text-blue-700 hover:text-blue-800"
            >
              ← Voltar ao login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

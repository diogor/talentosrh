import type { Metadata } from "next";
import Link from "next/link";
import { ResetPasswordForm } from "@/components/admin/ResetPasswordForm";

export const metadata: Metadata = { title: "Redefinir senha" };

export default async function RedefinirSenhaPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token = "" } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-xl font-bold text-slate-900">Redefinir senha</h1>
          <p className="mt-1 text-sm text-slate-500">
            Escolha uma nova senha para acessar o painel.
          </p>

          <div className="mt-6">
            {token ? (
              <ResetPasswordForm token={token} />
            ) : (
              <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                Link inválido: token ausente. Solicite uma nova redefinição de
                senha.
              </p>
            )}
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

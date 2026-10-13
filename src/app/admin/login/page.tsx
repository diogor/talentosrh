import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = { title: "Login" };

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ reset?: string }>;
}) {
  const session = await getSession();
  if (session) redirect("/admin");

  const { reset } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-8 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-700 text-xl font-bold text-white">
              T
            </span>
            <h1 className="mt-4 text-xl font-bold text-slate-900">
              Painel Talentos RH
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Acesso restrito à equipe de RH
            </p>
          </div>

          {reset === "ok" && (
            <p className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              Senha redefinida com sucesso. Faça login com a nova senha.
            </p>
          )}

          <LoginForm />

          <p className="mt-5 text-center">
            <Link
              href="/admin/recuperar-senha"
              className="text-sm font-medium text-blue-700 hover:text-blue-800"
            >
              Esqueci minha senha
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center">
          <Link href="/" className="text-sm text-slate-500 hover:text-slate-700">
            ← Voltar ao site
          </Link>
        </p>
      </div>
    </div>
  );
}

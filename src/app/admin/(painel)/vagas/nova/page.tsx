import type { Metadata } from "next";
import { createJobAction } from "@/actions/jobs";
import { requireAdmin } from "@/lib/auth";
import { JobForm } from "@/components/admin/JobForm";

export const metadata: Metadata = { title: "Nova vaga" };

export default async function NovaVagaPage() {
  await requireAdmin();

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold text-slate-900">Nova vaga</h1>
      <p className="mt-1 text-sm text-slate-500">
        Preencha os dados da vaga. Você pode salvá-la como rascunho e publicar
        depois.
      </p>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <JobForm action={createJobAction} submitLabel="Cadastrar vaga" />
      </div>
    </div>
  );
}

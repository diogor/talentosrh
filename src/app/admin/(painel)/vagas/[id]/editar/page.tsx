import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { updateJobAction } from "@/actions/jobs";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { JobForm } from "@/components/admin/JobForm";

export const metadata: Metadata = { title: "Editar vaga" };

export default async function EditarVagaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();

  const { id } = await params;
  const job = await db.job.findUnique({ where: { id } });
  if (!job) notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold text-slate-900">Editar vaga</h1>
      <p className="mt-1 text-sm text-slate-500">
        Atualize as informações da vaga &quot;{job.title}&quot;.
      </p>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <JobForm
          action={updateJobAction.bind(null, job.id)}
          initialData={{
            title: job.title,
            area: job.area,
            city: job.city,
            state: job.state,
            modality: job.modality,
            contractType: job.contractType,
            description: job.description,
            published: job.published,
          }}
          submitLabel="Salvar alterações"
        />
      </div>
    </div>
  );
}

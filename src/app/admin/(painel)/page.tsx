import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { deleteJobAction, togglePublishAction } from "@/actions/jobs";
import { DeleteJobButton } from "@/components/admin/DeleteJobButton";
import {
  CONTRACT_LABELS,
  MODALITY_LABELS,
} from "@/lib/constants";

export const metadata: Metadata = { title: "Vagas" };

function StatusBadge({ published }: { published: boolean }) {
  return published ? (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
      <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
      Publicada
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">
      <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
      Rascunho
    </span>
  );
}

function JobActions({
  jobId,
  jobTitle,
  published,
}: {
  jobId: string;
  jobTitle: string;
  published: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1">
      <form action={togglePublishAction.bind(null, jobId)}>
        <button
          type="submit"
          className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
            published
              ? "text-amber-700 hover:bg-amber-50"
              : "text-green-700 hover:bg-green-50"
          }`}
        >
          {published ? "Despublicar" : "Publicar"}
        </button>
      </form>
      <Link
        href={`/admin/vagas/${jobId}/editar`}
        className="rounded-md px-2.5 py-1.5 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-50"
      >
        Editar
      </Link>
      <DeleteJobButton
        action={deleteJobAction.bind(null, jobId)}
        jobTitle={jobTitle}
      />
    </div>
  );
}

export default async function AdminDashboardPage() {
  await requireAdmin();

  const [jobs, totalPublished, totalDrafts] = await Promise.all([
    db.job.findMany({ orderBy: { createdAt: "desc" } }),
    db.job.count({ where: { published: true } }),
    db.job.count({ where: { published: false } }),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Vagas</h1>
          <p className="mt-1 text-sm text-slate-500">
            Gerencie as vagas exibidas no site. Publicadas aparecem
            automaticamente na página de Vagas Abertas.
          </p>
        </div>
        <Link
          href="/admin/vagas/nova"
          className="rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
        >
          + Nova vaga
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
          <p className="text-2xl font-bold text-slate-900">{jobs.length}</p>
          <p className="text-xs text-slate-500 sm:text-sm">Total de vagas</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
          <p className="text-2xl font-bold text-green-700">{totalPublished}</p>
          <p className="text-xs text-slate-500 sm:text-sm">Publicadas</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
          <p className="text-2xl font-bold text-slate-500">{totalDrafts}</p>
          <p className="text-xs text-slate-500 sm:text-sm">Rascunhos</p>
        </div>
      </div>

      {jobs.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="font-medium text-slate-700">
            Nenhuma vaga cadastrada ainda.
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Clique em &quot;Nova vaga&quot; para cadastrar a primeira.
          </p>
        </div>
      ) : (
        <>
          {/* Tabela — desktop */}
          <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm md:block">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs tracking-wide text-slate-500 uppercase">
                <tr>
                  <th className="px-5 py-3.5 font-semibold">Vaga</th>
                  <th className="px-5 py-3.5 font-semibold">Local</th>
                  <th className="px-5 py-3.5 font-semibold">Contratação</th>
                  <th className="px-5 py-3.5 font-semibold">Status</th>
                  <th className="px-5 py-3.5 text-right font-semibold">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {jobs.map((job) => (
                  <tr key={job.id} className="align-middle">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-900">
                        {job.title}
                      </p>
                      <p className="text-xs text-slate-500">{job.area}</p>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-slate-600">
                      {job.city}/{job.state}
                      <span className="block text-xs text-slate-400">
                        {MODALITY_LABELS[
                          job.modality as keyof typeof MODALITY_LABELS
                        ] ?? job.modality}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {CONTRACT_LABELS[
                        job.contractType as keyof typeof CONTRACT_LABELS
                      ] ?? job.contractType}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge published={job.published} />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end">
                        <JobActions
                          jobId={job.id}
                          jobTitle={job.title}
                          published={job.published}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards — mobile */}
          <ul className="space-y-3 md:hidden">
            {jobs.map((job) => (
              <li
                key={job.id}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">{job.title}</p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {job.area} · {job.city}/{job.state} ·{" "}
                      {MODALITY_LABELS[
                        job.modality as keyof typeof MODALITY_LABELS
                      ] ?? job.modality}
                    </p>
                  </div>
                  <StatusBadge published={job.published} />
                </div>
                <div className="mt-3 border-t border-slate-100 pt-3">
                  <JobActions
                    jobId={job.id}
                    jobTitle={job.title}
                    published={job.published}
                  />
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

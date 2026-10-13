import type { Metadata } from "next";
import Link from "next/link";
import type { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import {
  BRAZILIAN_STATES,
  MODALITIES,
  MODALITY_LABELS,
  type Modality,
} from "@/lib/constants";
import { JobCard } from "@/components/site/JobCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Vagas Abertas",
  description:
    "Confira as vagas abertas divulgadas pela Talentos RH Consultoria e encontre sua próxima oportunidade.",
};

type SearchParams = Promise<{
  q?: string;
  modalidade?: string;
  uf?: string;
}>;

export default async function VagasPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { q = "", modalidade = "", uf = "" } = await searchParams;

  const where: Prisma.JobWhereInput = {
    published: true,
    ...(modalidade && MODALITIES.includes(modalidade as Modality)
      ? { modality: modalidade }
      : {}),
    ...(uf && BRAZILIAN_STATES.includes(uf as (typeof BRAZILIAN_STATES)[number])
      ? { state: uf }
      : {}),
    ...(q
      ? {
          OR: [
            { title: { contains: q } },
            { area: { contains: q } },
            { description: { contains: q } },
            { city: { contains: q } },
          ],
        }
      : {}),
  };

  const jobs = await db.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  const hasFilters = Boolean(q || modalidade || uf);

  return (
    <>
      <section className="bg-gradient-to-br from-slate-900 to-blue-950 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h1 className="text-4xl font-bold">Vagas Abertas</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            Encontre a oportunidade ideal para o seu perfil e candidate-se.
          </p>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          {/* Filtros */}
          <form
            action="/vagas"
            method="get"
            className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_180px_120px_auto]"
          >
            <div>
              <label htmlFor="q" className="sr-only">
                Buscar
              </label>
              <input
                id="q"
                name="q"
                type="search"
                defaultValue={q}
                placeholder="Buscar por título, área ou cidade…"
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="modalidade" className="sr-only">
                Modalidade
              </label>
              <select
                id="modalidade"
                name="modalidade"
                defaultValue={modalidade}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
              >
                <option value="">Modalidade</option>
                {MODALITIES.map((value) => (
                  <option key={value} value={value}>
                    {MODALITY_LABELS[value]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="uf" className="sr-only">
                UF
              </label>
              <select
                id="uf"
                name="uf"
                defaultValue={uf}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
              >
                <option value="">UF</option>
                {BRAZILIAN_STATES.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-800 sm:flex-none"
              >
                Filtrar
              </button>
              {hasFilters && (
                <Link
                  href="/vagas"
                  className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
                >
                  Limpar
                </Link>
              )}
            </div>
          </form>

          {/* Resultados */}
          <p className="mt-8 text-sm text-slate-500">
            {jobs.length === 0
              ? "Nenhuma vaga encontrada"
              : jobs.length === 1
                ? "1 vaga encontrada"
                : `${jobs.length} vagas encontradas`}
          </p>

          {jobs.length > 0 ? (
            <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <p className="font-medium text-slate-700">
                Nenhuma vaga disponível com esses critérios.
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Ajuste os filtros ou volte em breve — novas oportunidades são
                publicadas com frequência.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import {
  CONTACT_EMAIL,
  CONTRACT_LABELS,
  MODALITY_LABELS,
} from "@/lib/constants";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const job = await db.job.findUnique({ where: { id } });
  if (!job || !job.published) return { title: "Vaga não encontrada" };
  return {
    title: job.title,
    description: `Vaga de ${job.title} — ${job.area}, ${job.city}/${job.state}. Candidate-se pela Talentos RH.`,
  };
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-50 px-4 py-3">
      <dt className="text-xs font-medium tracking-wide text-slate-500 uppercase">
        {label}
      </dt>
      <dd className="mt-0.5 text-sm font-semibold text-slate-900">{value}</dd>
    </div>
  );
}

export default async function VagaDetalhePage({ params }: PageProps) {
  const { id } = await params;
  const job = await db.job.findUnique({ where: { id } });

  if (!job || !job.published) notFound();

  const applyHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    `Candidatura — ${job.title}`
  )}&body=${encodeURIComponent(
    `Olá! Tenho interesse na vaga "${job.title}" (${job.city}/${job.state}).\n\nSegue meu currículo em anexo.\n\nNome completo:\nTelefone:\n`
  )}`;

  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <Link
          href="/vagas"
          className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:text-blue-800"
        >
          ← Voltar para vagas
        </Link>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            {job.area}
          </span>
          <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            {job.title}
          </h1>

          <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <InfoItem label="Local" value={`${job.city}/${job.state}`} />
            <InfoItem
              label="Modalidade"
              value={
                MODALITY_LABELS[job.modality as keyof typeof MODALITY_LABELS] ??
                job.modality
              }
            />
            <InfoItem
              label="Contratação"
              value={
                CONTRACT_LABELS[
                  job.contractType as keyof typeof CONTRACT_LABELS
                ] ?? job.contractType
              }
            />
            <InfoItem
              label="Publicada em"
              value={new Intl.DateTimeFormat("pt-BR").format(job.createdAt)}
            />
          </dl>

          <div className="mt-10 border-t border-slate-100 pt-8">
            <h2 className="text-lg font-semibold text-slate-900">
              Descrição da vaga
            </h2>
            <div className="mt-4 leading-relaxed whitespace-pre-line text-slate-700">
              {job.description}
            </div>
          </div>

          <div className="mt-10 rounded-xl bg-blue-50 p-6 sm:flex sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">
                Interessou-se pela vaga?
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Envie seu currículo informando o título da vaga no assunto.
              </p>
            </div>
            <a
              href={applyHref}
              className="mt-4 inline-block rounded-lg bg-blue-700 px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-blue-800 sm:mt-0"
            >
              Candidatar-se
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

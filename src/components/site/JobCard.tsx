import Link from "next/link";
import type { Job } from "@prisma/client";
import { CONTRACT_LABELS, MODALITY_LABELS } from "@/lib/constants";

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function LocationIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0 text-slate-400"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21s-7-5.1-7-11a7 7 0 1 1 14 0c0 5.9-7 11-7 11z"
      />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0 text-slate-400"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      viewBox="0 0 24 24"
      aria-hidden
    >
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path
        strokeLinecap="round"
        d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 12h18"
      />
    </svg>
  );
}

export function JobCard({ job }: { job: Job }) {
  return (
    <Link
      href={`/vagas/${job.id}`}
      className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
          {job.area}
        </span>
        <span className="text-xs whitespace-nowrap text-slate-400">
          {formatDate(job.createdAt)}
        </span>
      </div>

      <h3 className="mt-4 text-lg font-semibold text-slate-900 group-hover:text-blue-700">
        {job.title}
      </h3>

      <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
        <li className="flex items-center gap-2">
          <LocationIcon />
          {job.city}/{job.state}
        </li>
        <li className="flex items-center gap-2">
          <BriefcaseIcon />
          {CONTRACT_LABELS[job.contractType as keyof typeof CONTRACT_LABELS] ??
            job.contractType}
          {" · "}
          {MODALITY_LABELS[job.modality as keyof typeof MODALITY_LABELS] ??
            job.modality}
        </li>
      </ul>

      <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-blue-700">
        Ver detalhes
        <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </span>
    </Link>
  );
}

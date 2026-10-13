"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import type { JobFormState } from "@/actions/jobs";
import {
  BRAZILIAN_STATES,
  CONTRACT_LABELS,
  CONTRACT_TYPES,
  MODALITY_LABELS,
  MODALITIES,
} from "@/lib/constants";

type JobFormProps = {
  action: (
    prevState: JobFormState,
    formData: FormData
  ) => Promise<JobFormState>;
  initialData?: {
    title: string;
    area: string;
    city: string;
    state: string;
    modality: string;
    contractType: string;
    description: string;
    published: boolean;
  };
  submitLabel: string;
};

const inputClass =
  "w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none";
const selectClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none";
const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-red-600">{message}</p>;
}

export function JobForm({ action, initialData, submitLabel }: JobFormProps) {
  const [state, formAction, pending] = useActionState<JobFormState, FormData>(
    action,
    {}
  );
  const [published, setPublished] = useState(
    initialData?.published ?? false
  );

  const errors = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="space-y-6">
      {state.error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <div>
        <label htmlFor="title" className={labelClass}>
          Título da vaga *
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={initialData?.title}
          placeholder="Ex.: Analista de Recursos Humanos"
          className={inputClass}
        />
        <FieldError message={errors.title} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="area" className={labelClass}>
            Área *
          </label>
          <input
            id="area"
            name="area"
            type="text"
            required
            defaultValue={initialData?.area}
            placeholder="Ex.: Tecnologia, Comercial, RH…"
            className={inputClass}
          />
          <FieldError message={errors.area} />
        </div>
        <div className="grid grid-cols-[1fr_90px] gap-3">
          <div>
            <label htmlFor="city" className={labelClass}>
              Cidade *
            </label>
            <input
              id="city"
              name="city"
              type="text"
              required
              defaultValue={initialData?.city}
              placeholder="Ex.: São Paulo"
              className={inputClass}
            />
            <FieldError message={errors.city} />
          </div>
          <div>
            <label htmlFor="state" className={labelClass}>
              UF *
            </label>
            <select
              id="state"
              name="state"
              required
              defaultValue={initialData?.state ?? ""}
              className={selectClass}
            >
              <option value="" disabled>
                UF
              </option>
              {BRAZILIAN_STATES.map((uf) => (
                <option key={uf} value={uf}>
                  {uf}
                </option>
              ))}
            </select>
            <FieldError message={errors.state} />
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="modality" className={labelClass}>
            Modalidade *
          </label>
          <select
            id="modality"
            name="modality"
            required
            defaultValue={initialData?.modality ?? ""}
            className={selectClass}
          >
            <option value="" disabled>
              Selecione…
            </option>
            {MODALITIES.map((value) => (
              <option key={value} value={value}>
                {MODALITY_LABELS[value]}
              </option>
            ))}
          </select>
          <FieldError message={errors.modality} />
        </div>
        <div>
          <label htmlFor="contractType" className={labelClass}>
            Regime de contratação *
          </label>
          <select
            id="contractType"
            name="contractType"
            required
            defaultValue={initialData?.contractType ?? ""}
            className={selectClass}
          >
            <option value="" disabled>
              Selecione…
            </option>
            {CONTRACT_TYPES.map((value) => (
              <option key={value} value={value}>
                {CONTRACT_LABELS[value]}
              </option>
            ))}
          </select>
          <FieldError message={errors.contractType} />
        </div>
      </div>

      <div>
        <label htmlFor="description" className={labelClass}>
          Descrição detalhada *
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={10}
          defaultValue={initialData?.description}
          placeholder={
            "Descreva as responsabilidades, requisitos e benefícios da vaga.\n\nDica: use quebras de linha para organizar o texto."
          }
          className={inputClass}
        />
        <FieldError message={errors.description} />
      </div>

      <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
        <input
          id="published"
          name="published"
          type="checkbox"
          checked={published}
          onChange={(event) => setPublished(event.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-blue-700 focus:ring-blue-500"
        />
        <label htmlFor="published" className="text-sm text-slate-700">
          <span className="font-medium">Publicar imediatamente</span>
          <span className="block text-xs text-slate-500">
            Vagas publicadas aparecem automaticamente na página de Vagas
            Abertas do site.
          </span>
        </label>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Link
          href="/admin"
          className="rounded-lg border border-slate-300 px-5 py-2.5 text-center text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
        >
          Cancelar
        </Link>
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Salvando…" : submitLabel}
        </button>
      </div>
    </form>
  );
}

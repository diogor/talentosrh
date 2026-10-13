"use server";

import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { fieldErrorsFrom, jobSchema, type JobInput } from "@/lib/validations";

export type JobFormState = {
  error?: string;
  fieldErrors?: Record<string, string>;
};

type ParseResult =
  | { ok: true; data: JobInput & { published: boolean } }
  | { ok: false; state: JobFormState };

function parseJobForm(formData: FormData): ParseResult {
  const raw = {
    title: String(formData.get("title") ?? ""),
    area: String(formData.get("area") ?? ""),
    city: String(formData.get("city") ?? ""),
    state: String(formData.get("state") ?? ""),
    modality: String(formData.get("modality") ?? ""),
    contractType: String(formData.get("contractType") ?? ""),
    description: String(formData.get("description") ?? ""),
  };

  const result = jobSchema.safeParse(raw);
  if (!result.success) {
    return {
      ok: false,
      state: {
        error: "Verifique os campos destacados e tente novamente.",
        fieldErrors: fieldErrorsFrom(result.error),
      },
    };
  }

  return {
    ok: true,
    data: {
      ...result.data,
      published: formData.get("published") === "on",
    },
  };
}

export async function createJobAction(
  _prevState: JobFormState,
  formData: FormData
): Promise<JobFormState> {
  await requireAdmin();

  const parsed = parseJobForm(formData);
  if (!parsed.ok) return parsed.state;

  await db.job.create({ data: parsed.data });
  redirect("/admin");
}

export async function updateJobAction(
  jobId: string,
  _prevState: JobFormState,
  formData: FormData
): Promise<JobFormState> {
  await requireAdmin();

  const parsed = parseJobForm(formData);
  if (!parsed.ok) return parsed.state;

  const existing = await db.job.findUnique({ where: { id: jobId } });
  if (!existing) {
    return { error: "Vaga não encontrada." };
  }

  await db.job.update({ where: { id: jobId }, data: parsed.data });
  redirect("/admin");
}

export async function togglePublishAction(jobId: string): Promise<void> {
  await requireAdmin();

  const job = await db.job.findUnique({ where: { id: jobId } });
  if (!job) return;

  await db.job.update({
    where: { id: jobId },
    data: { published: !job.published },
  });
}

export async function deleteJobAction(jobId: string): Promise<void> {
  await requireAdmin();
  await db.job.delete({ where: { id: jobId } }).catch(() => null);
}

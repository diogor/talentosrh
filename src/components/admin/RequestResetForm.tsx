"use client";

import { useActionState } from "react";
import {
  requestPasswordResetAction,
  type AuthFormState,
} from "@/actions/auth";

const initialState: AuthFormState = {};

export function RequestResetForm() {
  const [state, formAction, pending] = useActionState(
    requestPasswordResetAction,
    initialState
  );

  return (
    <form action={formAction} className="space-y-5">
      {state.error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      )}
      {state.success && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          <p>{state.success}</p>
          {(state.devPreviewUrl || state.devResetUrl) && (
            <div className="mt-2 space-y-1 text-xs">
              <p className="font-semibold">Modo desenvolvimento:</p>
              {state.devPreviewUrl && (
                <p>
                  <a
                    href={state.devPreviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    Ver e-mail na caixa de teste (Ethereal)
                  </a>
                </p>
              )}
              {state.devResetUrl && (
                <p>
                  <a href={state.devResetUrl} className="underline">
                    Ir direto para a página de redefinição
                  </a>
                </p>
              )}
            </div>
          )}
        </div>
      )}

      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          E-mail cadastrado
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          placeholder="admin@talentosrh.com.br"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Enviando…" : "Enviar link de redefinição"}
      </button>
    </form>
  );
}

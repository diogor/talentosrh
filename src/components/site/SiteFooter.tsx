import Link from "next/link";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  SITE_FULL_NAME,
  SITE_NAME,
} from "@/lib/constants";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">
              T
            </span>
            <span className="text-lg font-bold text-white">{SITE_NAME}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            Consultoria de Recursos Humanos dedicada a conectar pessoas certas
            às oportunidades certas, com ética e proximidade.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide text-white uppercase">
            Navegação
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link className="hover:text-white" href="/">Início</Link></li>
            <li><Link className="hover:text-white" href="/sobre">Sobre a Consultoria</Link></li>
            <li><Link className="hover:text-white" href="/vagas">Vagas Abertas</Link></li>
            <li><Link className="hover:text-white" href="/contato">Contato</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide text-white uppercase">
            Contato
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-400">
            <li>{CONTACT_EMAIL}</li>
            <li>{CONTACT_PHONE}</li>
            <li>Av. Paulista, 1000 — São Paulo/SP</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 py-5 text-center text-xs text-slate-500">
        © {year} {SITE_FULL_NAME}. Todos os direitos reservados.
      </div>
    </footer>
  );
}

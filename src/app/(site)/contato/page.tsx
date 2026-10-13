import type { Metadata } from "next";
import { ContactForm } from "@/components/site/ContactForm";
import { CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a Talentos RH Consultoria: entre em contato para soluções de recrutamento, seleção e gestão de pessoas.",
};

const CHANNELS = [
  { label: "E-mail", value: CONTACT_EMAIL },
  { label: "Telefone", value: CONTACT_PHONE },
  { label: "Endereço", value: "Av. Paulista, 1000 — Bela Vista, São Paulo/SP" },
];

export default function ContatoPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-slate-900 to-blue-950 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h1 className="text-4xl font-bold">Fale conosco</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            Quer contratar melhor ou entender como podemos apoiar o RH da sua
            empresa? Envie uma mensagem — respondemos em até 1 dia útil.
          </p>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-4">
            {CHANNELS.map((channel) => (
              <div
                key={channel.label}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  {channel.label}
                </p>
                <p className="mt-1 font-medium break-words text-slate-900">
                  {channel.value}
                </p>
              </div>
            ))}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                Horário de atendimento
              </p>
              <p className="mt-1 font-medium text-slate-900">
                Segunda a sexta, das 9h às 18h
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-semibold text-slate-900">
              Envie sua mensagem
            </h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

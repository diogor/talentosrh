import Link from "next/link";
import { db } from "@/lib/db";
import { JobCard } from "@/components/site/JobCard";

export const dynamic = "force-dynamic";

const SERVICES = [
  {
    title: "Recrutamento & Seleção",
    description:
      "Processos seletivos estruturados e conduzidos por especialistas, da definição do perfil ao fechamento da vaga.",
  },
  {
    title: "Desenvolvimento Organizacional",
    description:
      "Programas de desenvolvimento de lideranças, avaliação de desempenho e planos de sucessão sob medida.",
  },
  {
    title: "Consultoria de Gestão de Pessoas",
    description:
      "Apoio estratégico na estruturação das rotinas de RH: políticas, indicadores, clima e cultura organizacional.",
  },
];

const STATS = [
  { value: "15+", label: "anos de experiência" },
  { value: "300+", label: "empresas atendidas" },
  { value: "5 mil+", label: "profissionais contratados" },
  { value: "97%", label: "de clientes satisfeitos" },
];

export default async function HomePage() {
  const featuredJobs = await db.job.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 text-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="text-sm font-semibold tracking-widest text-blue-400 uppercase">
            Consultoria de Recursos Humanos
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-tight font-bold sm:text-5xl">
            Conectamos pessoas certas às oportunidades certas
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-300">
            Há mais de 15 anos ajudamos empresas a construir times de alta
            performance e profissionais a encontrar o próximo passo da
            carreira.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/vagas"
              className="rounded-lg bg-blue-600 px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-blue-500"
            >
              Ver vagas abertas
            </Link>
            <Link
              href="/contato"
              className="rounded-lg border border-slate-500 px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:border-slate-300 hover:bg-white/5"
            >
              Fale com um consultor
            </Link>
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-12 sm:px-6 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-blue-700 sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Serviços */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-slate-900">
              O que fazemos
            </h2>
            <p className="mt-3 text-slate-600">
              Soluções completas de RH para empresas que querem crescer com as
              pessoas certas.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {SERVICES.map((service) => (
              <div
                key={service.title}
                className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm"
              >
                <div className="mb-4 h-1.5 w-10 rounded-full bg-blue-600" />
                <h3 className="text-lg font-semibold text-slate-900">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vagas em destaque */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                Vagas em destaque
              </h2>
              <p className="mt-3 text-slate-600">
                Oportunidades abertas para você se candidatar agora.
              </p>
            </div>
            <Link
              href="/vagas"
              className="text-sm font-semibold text-blue-700 hover:text-blue-800"
            >
              Ver todas as vagas →
            </Link>
          </div>

          {featuredJobs.length > 0 ? (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <p className="mt-10 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500">
              Nenhuma vaga aberta no momento. Volte em breve!
            </p>
          )}
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-blue-700 text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6">
          <h2 className="max-w-2xl text-3xl font-bold">
            Sua empresa precisa contratar melhor?
          </h2>
          <p className="max-w-xl text-blue-100">
            Conte com um time de especialistas para atrair, selecionar e
            reter os melhores talentos do mercado.
          </p>
          <Link
            href="/contato"
            className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50"
          >
            Entre em contato
          </Link>
        </div>
      </section>
    </>
  );
}

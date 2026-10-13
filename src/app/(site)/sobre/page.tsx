import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre a Consultoria",
  description:
    "Conheça a Talentos RH: nossa história, missão, valores e diferenciais em consultoria de Recursos Humanos.",
};

const VALUES = [
  {
    title: "Ética e transparência",
    description:
      "Conduzimos cada processo com clareza para empresas e candidatos, do início ao fim.",
  },
  {
    title: "Pessoas em primeiro lugar",
    description:
      "Acreditamos que organizações fortes são construídas por pessoas engajadas e bem alocadas.",
  },
  {
    title: "Parceria de longo prazo",
    description:
      "Mais do que preencher vagas, construímos relações duradouras com clientes e talentos.",
  },
  {
    title: "Excelência técnica",
    description:
      "Metodologias atualizadas de avaliação e seleção, com foco em resultados mensuráveis.",
  },
];

const DIFFERENTIALS = [
  "Triagem curricular com apoio de tecnologia e olhar humano",
  "Entrevistas por competências conduzidas por psicólogos e especialistas",
  "Banco de talentos ativo em diversas áreas e níveis de senioridade",
  "Acompanhamento pós-contratação nos primeiros 90 dias",
  "Relatórios gerenciais com indicadores do processo seletivo",
  "Atendimento consultivo e personalizado para cada cliente",
];

export default function SobrePage() {
  return (
    <>
      <section className="bg-gradient-to-br from-slate-900 to-blue-950 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <h1 className="max-w-3xl text-4xl font-bold sm:text-5xl">
            Sobre a Talentos RH
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-300">
            Somos uma consultoria de Recursos Humanos que nasceu com um
            propósito simples: aproximar pessoas talentosas de empresas que
            as valorizem.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Nossa história
            </h2>
            <div className="mt-4 space-y-4 leading-relaxed text-slate-600">
              <p>
                Fundada em São Paulo, a Talentos RH atua há mais de 15 anos no
                mercado de Recursos Humanos, apoiando empresas de diferentes
                portes e segmentos na construção de equipes de alta
                performance.
              </p>
              <p>
                Ao longo dessa trajetória, já conduzimos milhares de processos
                seletivos e ajudamos mais de 300 empresas a contratar
                profissionais alinhados à sua cultura e aos seus objetivos
                estratégicos.
              </p>
              <p>
                Hoje, unimos experiência consultiva e tecnologia para entregar
                processos cada vez mais ágeis, assertivos e humanos — porque,
                para nós, recrutar bem é transformar realidades.
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 p-8">
            <h2 className="text-2xl font-bold text-slate-900">
              Missão, visão e valores
            </h2>
            <dl className="mt-6 space-y-5">
              <div>
                <dt className="font-semibold text-blue-700">Missão</dt>
                <dd className="mt-1 text-sm leading-relaxed text-slate-600">
                  Conectar pessoas e organizações por meio de processos de RH
                  éticos, eficientes e humanizados.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-blue-700">Visão</dt>
                <dd className="mt-1 text-sm leading-relaxed text-slate-600">
                  Ser referência nacional em consultoria de RH, reconhecida
                  pela qualidade das relações que constrói.
                </dd>
              </div>
            </dl>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {VALUES.map((value) => (
                <li
                  key={value.title}
                  className="rounded-lg border border-slate-200 bg-white p-4"
                >
                  <p className="text-sm font-semibold text-slate-900">
                    {value.title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">
                    {value.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Nossos diferenciais
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DIFFERENTIALS.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-5"
              >
                <svg
                  className="mt-0.5 h-5 w-5 shrink-0 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-sm leading-relaxed text-slate-700">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

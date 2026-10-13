import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/lib/password";

const db = new PrismaClient();

async function main() {
  const admin = await db.admin.upsert({
    where: { email: "admin@talentosrh.com.br" },
    update: {},
    create: {
      name: "Administrador",
      email: "admin@talentosrh.com.br",
      passwordHash: hashPassword("admin123"),
    },
  });
  console.log(`Admin criado/verificado: ${admin.email} (senha: admin123)`);

  await db.job.deleteMany();

  const jobs = [
    {
      title: "Analista de Recrutamento e Seleção",
      area: "Recursos Humanos",
      city: "São Paulo",
      state: "SP",
      modality: "HIBRIDO",
      contractType: "CLT",
      published: true,
      description:
        "Responsável por conduzir processos seletivos de ponta a ponta: alinhamento de perfil com gestores, triagem, entrevistas por competências e fechamento com candidatos.\n\nRequisitos:\n- Experiência comprovada em R&S;\n- Conhecimento em entrevistas por competências;\n- Desejável experiência com ATS.\n\nBenefícios: vale-refeição, plano de saúde, day off no aniversário.",
    },
    {
      title: "Desenvolvedor(a) Front-end React",
      area: "Tecnologia",
      city: "Curitiba",
      state: "PR",
      modality: "REMOTO",
      contractType: "PJ",
      published: true,
      description:
        "Atuação no desenvolvimento de interfaces web modernas com React e TypeScript para um cliente do segmento financeiro.\n\nRequisitos:\n- Domínio de React, TypeScript e CSS moderno;\n- Experiência com testes automatizados;\n- Vivência em times ágeis.\n\nContratação PJ, 100% remota.",
    },
    {
      title: "Estágio em Recursos Humanos",
      area: "Recursos Humanos",
      city: "Belo Horizonte",
      state: "MG",
      modality: "PRESENCIAL",
      contractType: "ESTAGIO",
      published: true,
      description:
        "Oportunidade para estudantes de Psicologia, Administração ou Gestão de RH vivenciarem a rotina de uma consultoria: apoio em processos seletivos, organização de banco de currículos e contato com candidatos.\n\nRequisitos:\n- Cursando a partir do 4º período;\n- Boa comunicação escrita e verbal;\n- Pacote Office intermediário.",
    },
    {
      title: "Gerente de Contas (Rascunho interno)",
      area: "Comercial",
      city: "Rio de Janeiro",
      state: "RJ",
      modality: "PRESENCIAL",
      contractType: "CLT",
      published: false,
      description:
        "Vaga em fase de alinhamento interno com o cliente. Gestão de carteira de contas e expansão de relacionamento.\n\nDescrição completa será publicada em breve.",
    },
  ];

  for (const job of jobs) {
    await db.job.create({ data: job });
  }
  console.log(`${jobs.length} vagas de exemplo criadas (3 publicadas, 1 rascunho).`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => db.$disconnect());

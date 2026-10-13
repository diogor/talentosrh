# Talentos RH — Site Institucional + Painel de Vagas

Site institucional de uma consultoria de Recursos Humanos com painel
administrativo interno para gestão de vagas. Vagas publicadas no painel
aparecem automaticamente na página **Vagas Abertas** do site.

## Stack

- **Next.js 15** (App Router) + TypeScript + Tailwind CSS
- **SQLite** via Prisma ORM (banco em arquivo, zero configuração)
- Autenticação própria: sessão JWT em cookie httpOnly (`jose`) + senha com
  hash `scrypt` (node:crypto)
- E-mails em modo desenvolvimento via **Nodemailer + Ethereal** (caixa de
  teste; o link de redefinição também é impresso no console)

## Começando

```bash
npm install
cp .env.example .env   # gere um AUTH_SECRET: openssl rand -base64 32
npx prisma migrate dev # cria o banco SQLite
npm run db:seed        # cria o admin e vagas de exemplo
npm run dev            # http://localhost:3000
```

**Credenciais do painel (seed):** `admin@talentosrh.com.br` / `admin123`
(troque após o primeiro acesso via recuperação de senha ou direto no banco).

## Rotas

### Site público
| Rota | Descrição |
|---|---|
| `/` | Página inicial (hero, serviços, vagas em destaque) |
| `/sobre` | Sobre a consultoria |
| `/vagas` | Listagem de vagas **publicadas**, com busca e filtros (modalidade, UF) |
| `/vagas/[id]` | Detalhe da vaga (rascunhos retornam 404) |
| `/contato` | Formulário de contato (e-mail em modo dev) |

### Painel administrativo (`/admin`)
| Rota | Descrição |
|---|---|
| `/admin/login` | Login (redireciona para `/admin` se já autenticado) |
| `/admin/recuperar-senha` | Solicita link de redefinição por e-mail |
| `/admin/redefinir-senha?token=…` | Define nova senha (token de 1h, uso único) |
| `/admin` | Dashboard: listar, publicar/despublicar, editar e excluir vagas |
| `/admin/vagas/nova` | Cadastro de vaga |
| `/admin/vagas/[id]/editar` | Edição de vaga |

As rotas `/admin/*` são protegidas por **middleware** e cada Server Action
re-verifica a sessão antes de executar.

## Campos da vaga

Título, Área, Cidade, UF, Modalidade (`Presencial` / `Remoto` / `Híbrido`),
Regime de contratação (`CLT` / `PJ` / `Estágio` / `Temporário` / `Freelancer`),
Descrição detalhada e status de publicação (`Publicada` / `Rascunho`).

## E-mails em desenvolvimento

Sem SMTP real, o sistema usa uma conta de teste Ethereal criada na primeira
vez que um e-mail é enviado. As credenciais da caixa e o link de
visualização de cada mensagem aparecem no console do servidor e, nos
formulários, em um aviso de "Modo desenvolvimento".

**Para produção:** substitua `getTransporter()` em `src/lib/mail.ts` por um
transporte SMTP real (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`),
defina `APP_URL` com o domínio final e rode `npm run build && npm start`.

## Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` / `npm start` | Build e start de produção |
| `npm run db:seed` | Recria admin + vagas de exemplo |
| `npm run db:studio` | Prisma Studio (inspeção visual do banco) |

## Estrutura

```
prisma/            # schema, migrações e seed
src/
├── actions/       # Server Actions (auth, vagas, contato)
├── app/
│   ├── (site)/    # páginas públicas (layout com header/footer)
│   └── admin/     # login/recuperação + (painel)/ área protegida
├── components/    # componentes do site e do admin
├── lib/           # db, sessão, auth, e-mail, validações, constantes
└── middleware.ts  # proteção das rotas /admin/*
```

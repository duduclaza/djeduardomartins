# DJ Eduardo Claza

Site oficial — tribal house e pop house, com catálogo de produções, área de
membros (download grátis das faixas) e painel webmaster para upload de
músicas.

Stack: Next.js (App Router) + TypeScript + Tailwind CSS + Prisma (Postgres
via Supabase) + NextAuth (login de membros e webmaster) + Framer Motion.

Produção (Vercel): https://djeduardomartins-claza.vercel.app

## Rodando localmente

```bash
npm install
cp .env.example .env   # depois edite o .env com seus próprios valores
npx prisma migrate dev
npm run db:seed        # cria a conta webmaster e 2 faixas de exemplo
npm run dev
```

Abra http://localhost:3000.

### Variáveis de ambiente (`.env`)

| Variável | Para quê serve |
| --- | --- |
| `POSTGRES_PRISMA_URL` | conexão pooled (pgbouncer) usada pela aplicação |
| `POSTGRES_URL_NON_POOLING` | conexão direta, usada pelas migrations do Prisma |
| `NEXTAUTH_SECRET` | chave de assinatura das sessões — gere com `openssl rand -base64 32` |
| `NEXTAUTH_URL` | URL base do site (`http://localhost:3000` em dev, domínio real em produção) |
| `ADMIN_NAME` / `ADMIN_EMAIL` / `ADMIN_PASSWORD` | usados **apenas** pelo `npm run db:seed` para criar a conta webmaster no banco |
| `NEXT_PUBLIC_INSTAGRAM` | @ do Instagram exibido no site |

O `.env` nunca é commitado (está no `.gitignore`). A senha do webmaster fica
guardada como hash no banco — em nenhum momento o texto puro da senha vai
para o repositório ou para o GitHub.

O banco é o Postgres provisionado via integração Supabase no projeto da
Vercel — local e produção apontam para o mesmo banco (`POSTGRES_PRISMA_URL`
/ `POSTGRES_URL_NON_POOLING`, pegos em Vercel → Project → Storage).

## Acessos

- **Membro**: cadastro livre em `/membros/cadastro`, faz login em
  `/membros/login` e baixa as faixas grátis em `/membros/area`.
- **Webmaster**: login em `/admin/login` com a conta criada pelo seed.
  No painel (`/admin`) é possível subir novas faixas (áudio + capa),
  marcar como grátis/paga, publicar/ocultar e excluir.

## Pendências antes de divulgar o site

1. **Foto do hero**: salve sua foto em `public/images/hero-dj.jpg` (tela
   inicial) e, opcionalmente, `public/images/about-dj.jpg` (seção Sobre).
   Sem esses arquivos o site usa um fundo gradiente neon como reserva.
2. **Armazenamento dos uploads**: hoje os áudios/capas enviados pelo painel
   webmaster são salvos em `public/uploads/` no servidor. Isso funciona,
   mas em deploy serverless (Vercel) esse diretório não persiste entre
   deploys — pra robustez de longo prazo, trocar por um storage externo
   (Vercel Blob, Supabase Storage, S3) nas rotas `src/app/api/tracks/route.ts`
   e `.../download/route.ts`.
3. **Venda de faixas**: o campo de preço já existe no modelo `Track`
   (`priceCents`), mas o checkout ainda não está integrado — hoje o botão de
   compra mostra "em breve". Quando quiser vender, integre um gateway
   (Stripe, Mercado Pago) nessas mesmas rotas.

## Deploy

Já conectado ao Vercel (projeto `djeduardomartins`, time `claza`), com
deploy automático a cada push na branch `main`. As variáveis de ambiente de
banco (`POSTGRES_*`) vêm da integração Supabase; `NEXTAUTH_SECRET` e
`NEXTAUTH_URL` ficam em Vercel → Project → Settings → Environment Variables.

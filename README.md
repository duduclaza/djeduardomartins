# DJ Eduardo Claza

Site oficial — tribal house e pop house, com catálogo de produções, área de
membros (download grátis das faixas) e painel webmaster para upload de
músicas.

Stack: Next.js (App Router) + TypeScript + Tailwind CSS + Prisma (SQLite em
dev) + NextAuth (login de membros e webmaster) + Framer Motion.

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
| `DATABASE_URL` | conexão do banco (SQLite local por padrão) |
| `NEXTAUTH_SECRET` | chave de assinatura das sessões — gere com `openssl rand -base64 32` |
| `ADMIN_NAME` / `ADMIN_EMAIL` / `ADMIN_PASSWORD` | usados **apenas** pelo `npm run db:seed` para criar a conta webmaster no banco |
| `NEXT_PUBLIC_INSTAGRAM` | @ do Instagram exibido no site |

O `.env` nunca é commitado (está no `.gitignore`). A senha do webmaster fica
guardada como hash no banco — em nenhum momento o texto puro da senha vai
para o repositório ou para o GitHub.

## Acessos

- **Membro**: cadastro livre em `/membros/cadastro`, faz login em
  `/membros/login` e baixa as faixas grátis em `/membros/area`.
- **Webmaster**: login em `/admin/login` com a conta criada pelo seed.
  No painel (`/admin`) é possível subir novas faixas (áudio + capa),
  marcar como grátis/paga, publicar/ocultar e excluir.

## Antes de publicar

1. **Foto do hero**: salve sua foto em `public/images/hero-dj.jpg` (tela
   inicial) e, opcionalmente, `public/images/about-dj.jpg` (seção Sobre).
   Sem esses arquivos o site usa um fundo gradiente neon como reserva.
2. **Banco de produção**: o SQLite (`prisma/dev.db`) é só para
   desenvolvimento local — em serviços como Vercel o disco é efêmero. Antes
   de ir ao ar, troque `DATABASE_URL` para um Postgres gerenciado (ex.: Neon,
   Supabase, Vercel Postgres) e rode `npx prisma migrate deploy`.
3. **Armazenamento dos uploads**: hoje os áudios/capas enviados pelo painel
   webmaster são salvos em `public/uploads/`. Isso funciona em dev, mas em
   produção serverless esse diretório não persiste — para o ar, troque por
   um storage externo (Vercel Blob, Supabase Storage, S3, etc.) nas rotas
   `src/app/api/tracks/route.ts` e `.../download/route.ts`.
4. **Venda de faixas**: o campo de preço já existe no modelo `Track`
   (`priceCents`), mas o checkout ainda não está integrado — hoje o botão de
   compra mostra "em breve". Quando quiser vender, integre um gateway
   (Stripe, Mercado Pago) nessas mesmas rotas.
5. Configure as variáveis de ambiente reais (não as do `.env.example`)
   direto no painel do seu provedor de deploy (Vercel, etc.), nunca no
   repositório.

## Deploy

Recomendado: [Vercel](https://vercel.com/new), conectando este repositório
GitHub e configurando as variáveis de ambiente do `.env.example` na aba
*Environment Variables* do projeto.

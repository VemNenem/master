# VemNenem Master

Frontend da aplicação VemNenem, construído com Next.js 15+ utilizando App Router e TypeScript.

## Sobre o Projeto

Este é o frontend principal do projeto VemNenem, desenvolvido com Next.js, o framework React de produção que oferece renderização híbrida (SSR/SSG), roteamento baseado em sistema de arquivos e otimizações automáticas de performance.

### Integração com Backend

O frontend se comunica com o backend Strapi através de APIs RESTful. As requisições podem ser feitas tanto no servidor (Server Components) quanto no cliente (Client Components), dependendo da necessidade.

## Requisitos

- Node.js 18.17 ou superior
- NPM, Yarn, PNPM ou Bun

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/VemNenem/master.git
cd master
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
# ou
pnpm install
# ou
bun install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env.local` na raiz do projeto:
```bash
cp .env.example .env.local
```

Configure as variáveis necessárias, especialmente a URL da API do backend:
```env
NEXT_PUBLIC_API_URL=http://localhost:1337/api
```

## Executando o Projeto

### Modo Desenvolvimento

Inicia o servidor de desenvolvimento com hot-reload:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

A página principal está em `app/page.tsx` e será atualizada automaticamente quando você editar o arquivo.

### Build para Produção

Gera a versão otimizada para produção:

```bash
npm run build
# ou
yarn build
```

### Executar Build de Produção

Após o build, inicie o servidor de produção:

```bash
npm run start
# ou
yarn start
```

### Linting

Executa verificação de código com ESLint:

```bash
npm run lint
# ou
yarn lint
```

## Deploy

Next.js pode ser deployed em:
- AWS (Amplify, EC2, Lambda)
- Google Cloud Platform
- Azure
- DigitalOcean
- Netlify
- Railway

Consulte a [documentação de deploy](https://nextjs.org/docs/app/building-your-application/deploying) para instruções específicas.

## Recursos de Aprendizado

- [Documentação Next.js](https://nextjs.org/docs) - Guia completo de features e API
- [Learn Next.js](https://nextjs.org/learn) - Tutorial interativo
- [Repositório Next.js](https://github.com/vercel/next.js) - Código fonte e contribuições
- [Exemplos Next.js](https://github.com/vercel/next.js/tree/canary/examples) - Casos de uso práticos

## Troubleshooting

### Erro de Porta em Uso

Se a porta 3000 estiver ocupada, especifique outra:
```bash
PORT=3001 npm run dev
```

### Cache do Next.js

Para limpar o cache:
```bash
rm -rf .next
npm run dev
```

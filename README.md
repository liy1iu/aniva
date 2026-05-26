# ANIVA

ANIVA é uma aplicação web de catálogo para anime, mangá, manhwa e manhua. O projeto permite consultar títulos, filtrar e ordenar o catálogo, abrir detalhes, favoritar, montar uma watchlist, cadastrar usuários e enviar indicações.

## funcionalidades

- home com destaque do dia, seções de tendência e categorias.
- catálogo com busca, filtros por tipo, gênero, vibe, status e nota mínima.
- ordenação por melhor nota, títulos mais recentes e ordem alfabética.
- página de detalhes com sinopse, nota, gêneros e recomendações.
- favoritos e watchlist salvos no LocalStorage.
- cadastro e consulta de usuários, com formulário validado em JavaScript.
- envio e consulta de indicações vinculadas a usuários cadastrados.
- upvote em indicações enviadas.
- confirmação em modal antes de apagar usuários ou indicações.
- dados carregados por Fetch API a partir de JSON.
- rotas com React Router.
- interface responsiva com Tailwind CSS, Flexbox, Grid, animações e feedback visual em hover.

## tecnologias

- React
- Vite
- React Router
- Tailwind CSS
- Framer Motion
- Lucide React
- Fetch API
- LocalStorage

## como executar

```bash
npm install
npm run dev
```

acesse:

```text
http://127.0.0.1:5173/
```

## scripts

```bash
npm run lint
npm run build
```

## estrutura principal

```text
src/
  components/
  hooks/
  pages/
  services/
  utils/
public/
  data/media.json
```

## observações acadêmicas

O projeto utiliza HTML semântico nos componentes, Box Model, Flexbox, Grid Layout, responsividade com classes utilitárias e media queries do Tailwind, componentização com props, estado com useState, efeitos com useEffect, navegação com React Router, consumo de JSON via Fetch API e armazenamento local com LocalStorage.

Também foram aplicadas validações em formulários, filtros dinâmicos gerados a partir dos dados do catálogo, modais de confirmação para ações destrutivas e componentes reutilizáveis para botões, cards, inputs, grids, filtros e telas de detalhe.

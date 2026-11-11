# aniva

aniva organiza um catálogo de anime, mangá, manhwa e manhua. explore o que está em alta, filtre e ordene obras, consulte fichas, publique avaliações e comentários e monte sua lista pessoal.

## rodar e verificar

```bash
npm ci
npm run dev
npm run lint
npm run build
npm test
```

o vite mostra no terminal o endereço local depois de `npm run dev`.

## pastas e arquivos

- `src/components`: navegação e cartões de obra.
- `src/context`: conta e estado da lista.
- `src/pages`: início, catálogo, ficha da obra, minha lista e entrada.
- `src/services/api.js`: funções de acesso ao catálogo, conta e feedback.
- `src/utils`: funções compartilhadas para dados e imagens.
- `public/data/media.json`: catálogo usado pelo front-end.
- `public/fonts.css` e `public/fonts`: fontes locais.

## rotas

- `/`: início.
- `/catalogo`: busca, filtros por formato, gênero, trope e situação, e ordenação. os critérios ficam na url: `q`, `formato`, `genero`, `trope`, `status` e `ordem`.
- `/obra/:id`: ficha, avaliações e comentários.
- `/minha-lista`: favoritos e lista para ver ou ler, com situação e progresso.
- `/entrar`: entrada e criação de conta. a página inicial também oferece busca e alternância entre tema claro e escuro.
- `/favoritos` e `/para-ver-ler`: redirecionam para `/minha-lista`.

## origem dos dados

o catálogo é lido de `public/data/media.json` por `getMediaCatalog`. busca, filtros e ordenação são processados no navegador. `rating` e `popularity` são números; cada obra pode ter a lista `tropes`.

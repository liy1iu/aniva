# ANiVA

ANiVA organiza um catálogo de anime, mangá, manhwa e manhua. Explore o que está em alta, filtre e ordene obras, consulte fichas, publique avaliações e comentários e monte sua lista pessoal.

## Rodar e verificar

```bash
npm ci
npm run dev
npm run lint
npm run build
npm test
```

O Vite mostra no terminal o endereço local depois de `npm run dev`.

## Pastas e arquivos

- `src/components`: navegação e cartões de obra.
- `src/context`: conta e estado da lista.
- `src/pages`: início, catálogo, ficha da obra, minha lista e entrada.
- `src/services/api.js`: funções de acesso ao catálogo, conta e feedback.
- `src/utils`: funções compartilhadas para dados e imagens.
- `public/data/media.json`: catálogo usado pelo frontend.
- `public/fonts.css` e `public/fonts`: fontes locais.

## Rotas

- `/`: início.
- `/catalogo`: busca, filtros por formato, gênero, trope e situação, e ordenação. Os critérios ficam na URL: `q`, `formato`, `genero`, `trope`, `status` e `ordem`.
- `/obra/:id`: ficha, avaliações e comentários.
- `/minha-lista`: favoritos e lista para ver ou ler, com situação e progresso.
- `/entrar`: entrada e criação de conta. A página inicial também oferece busca e alternância entre tema claro e escuro.
- `/favoritos` e `/para-ver-ler`: redirecionam para `/minha-lista`.

## Origem dos dados

O catálogo é lido de `public/data/media.json` por `getMediaCatalog`. Busca, filtros e ordenação são processados no navegador. `rating` e `popularity` são números; cada obra pode ter a lista `tropes`.

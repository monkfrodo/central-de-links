# Central de Links — PWA de Gerenciamento de Links

## O que é

Progressive Web App (PWA) para gerenciar e organizar links comerciais da Íntegros — checkouts, landing pages, páginas de vendas, upsells, etc. Funciona 100% offline no navegador usando localStorage. Permite busca, filtro por categoria, copiar links, adicionar/editar/remover, exportar/importar JSON.

Feito para uso interno do Kevin — não é público.

## Stack

- **Frontend:** HTML + CSS + JS vanilla
- **PWA:** Service Worker + manifest.json (instalável como app)
- **Armazenamento:** localStorage (chave `lnks5`)
- **Deploy:** GitHub Pages ou qualquer host estático

## Comandos

```bash
python3 -m http.server 8000   # servir localmente
```

## Variáveis de Ambiente

Nenhuma. Projeto 100% client-side.

## Estrutura de Pastas

```
central-de-links/
├── index.html          ← App completo (70 linhas HTML, UI nativa iOS-like)
├── css/
│   └── style.css       ← Estilos (148 linhas, dark/light mode automático)
├── js/
│   └── main.js         ← Toda a lógica (167 linhas, CRUD + busca + filtros)
├── manifest.json       ← PWA manifest (name: "Central de Links")
├── sw.js               ← Service Worker (cache-first com network fallback)
├── icon.svg            ← Ícone do app (SVG)
├── icon-maskable.svg   ← Ícone maskable para Android
├── .claudeignore       ← Ignora arquivos pesados
└── CLAUDE.md           ← Este arquivo
```

## Funcionalidades

### CRUD de Links
Cada link tem: nome, URL, produto, categoria, status, plataforma e notas.

### Categorias disponíveis
Checkout, Pagina de Vendas, Landing Page, Pagina de Obrigado, Upsell, Downsell, Webinar, Outro.

### Status
Ativo (dot verde), Em Teste (dot amarelo), Inativo (dot cinza).

### Plataformas
Assiny, Hotmart, Kiwify, Eduzz, Monetizze, Shopify, Proprio, Outro.

### Dados pré-carregados
O array `D` no JS contém os links padrão da Íntegros (checkouts Assiny, app, newsletter). Se o localStorage estiver vazio, carrega esses dados.

### Busca
Campo de busca filtra por nome, URL, produto, notas, categoria e plataforma.

### Filtros por categoria
Pills horizontais com scroll — filtra por Checkout, Landing Page, etc.

### Ações por link
Menu popup (long press / click) com: Copiar link, Abrir no navegador, Editar, Remover.

### Export/Import
- **Export:** Gera JSON legível com chaves em inglês (name, url, product...)
- **Import:** Aceita ambos formatos (chaves curtas e longas)

## Design System

- **UI:** Nativa iOS-like (cards, pills, bottom sheet, FAB, toast, popup menu)
- **Cores:** Automático dark/light via `prefers-color-scheme`
- **Dark:** bg `#000`, cards `#111`, text `#fff`
- **Light:** bg `#f2f2f7`, cards `#fff`, text `#000`
- **CSS vars:** `--bg`, `--card`, `--t1`, `--t2`, `--t3`, `--pill`, `--ok`, `--warn`, `--err`
- **Font:** System font stack (-apple-system, SF Pro Text)
- **Safe areas:** Suporta safe-area-inset para iPhone com notch

## PWA

- **Service Worker:** Cache-first para assets estáticos, fallback para rede
- **Manifest:** `display: standalone`, tema preto, instalável na home
- **Meta tags:** apple-mobile-web-app-capable, theme-color, viewport-fit=cover

## Regras de Desenvolvimento

### Fazer
- Manter o código minificado/compacto (nomes curtos de variáveis é intencional)
- Preservar suporte a dark/light mode automático
- Manter compatibilidade PWA (manifest + sw.js + meta tags)
- Testar export/import para garantir compatibilidade bidirecional

### Não fazer
- Não adicionar backend — o app é 100% client-side por design
- Não expandir nomes de variáveis — o código foi escrito compacto de propósito
- Não remover dados pré-carregados do array `D` (são os links reais da Íntegros)
- Não adicionar dependências externas

## Contexto de Negócio

Ferramenta interna do Kevin para organizar todos os links de checkout, vendas e landing pages dos produtos Íntegros. Cada produto (Low-ticket, Fundamentos, A Bússola, Íntegros) tem múltiplos checkouts com preços/parcelas diferentes. A central permite copiar rapidamente o link certo durante conversas de venda.

## Git

- **Branch:** `main`
- **Commits:** conventional commits em português

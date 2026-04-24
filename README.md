# Everaldo Pedroso Advocacia — Site Institucional

Site jurídico premium desenvolvido em HTML/CSS/JS puro, pronto para produção.

## Estrutura de Arquivos

```
everaldo-pedroso/
├── index.html          # Arquivo principal (SPA)
├── assets/             # Imagens e logos
│   ├── equipe/
│   └── escritorio/
├── css/
│   └── style.css       # Estilos globais
├── js/
│   └── main.js         # Navegação, animações e interações
└── README.md
```

## Como Rodar Localmente

**Opção 1 — VS Code + Live Server (recomendado):**
1. Abra a pasta no VS Code
2. Instale a extensão "Live Server"
3. Clique com botão direito em `index.html` → "Open with Live Server"

**Opção 2 — Python:**
```bash
cd everaldo-pedroso
python3 -m http.server 8080
# Acesse: http://localhost:8080
```

**Opção 3 — Node.js:**
```bash
npx serve everaldo-pedroso
```

## Como Publicar

### Netlify (gratuito, mais fácil)
1. Acesse netlify.com → "Add new site" → "Deploy manually"
2. Arraste a pasta `everaldo-pedroso` para a área de upload
3. Configure o domínio customizado nas configurações

### GitHub Pages
1. Crie repositório no GitHub
2. Faça upload dos arquivos
3. Settings → Pages → Branch: main

### Hospedagem tradicional (cPanel, HostGator, etc.)
1. Faça upload dos arquivos via FTP para a pasta `public_html`
2. O site estará acessível imediatamente

## O que Personalizar Antes de Publicar

### 1. Número OAB
Substitua `OAB/PR Nº XXXXX` pelo número real em:
- `index.html` (várias ocorrências — buscar e substituir)

### 2. Telefone / WhatsApp
Substitua `(41) 9 9999-9999` e `5541999999999` pelo número real.

Links WhatsApp seguem o padrão:
```
https://wa.me/55XXXXXXXXXXX
```

### 3. E-mail
Substitua `contato@everaldopedroso.adv.br` pelo e-mail real.

### 4. Foto do Advogado
Nos blocos com `aria-label="Foto do Dr. Everaldo Pedroso"`, substitua o SVG placeholder por uma tag `<img>`:
```html
<img src="assets/foto-dr-everaldo.jpg" alt="Dr. Everaldo Pedroso" loading="lazy" />
```

### 5. Endereço Completo
Na página de Contato, adicione o endereço completo na card de localização.

### 6. Redes Sociais
Substitua os `href="#"` dos ícones no footer pelos links reais do Instagram e LinkedIn.

### 7. Meta Tags e SEO
No `<head>` do `index.html`:
- Atualize `og:url` com o domínio real
- Adicione `og:image` com uma imagem de compartilhamento (1200x630px)

### 8. Google Analytics (opcional)
Adicione antes do `</head>`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## Funcionalidades Incluídas

- ✅ SPA navigation (sem reload de página)
- ✅ Navbar fixa com scroll behavior
- ✅ Menu hamburger responsivo
- ✅ Hero com animações de entrada
- ✅ Scroll reveal em todas as seções
- ✅ Formulário de contato com feedback visual
- ✅ Botão WhatsApp fixo (FAB)
- ✅ Design totalmente responsivo (mobile-first)
- ✅ HTML semântico (H1, H2, H3, ARIA labels)
- ✅ Meta tags e Open Graph básicos

## Design System

- **Fonte títulos:** Cormorant Garamond (serif elegante)
- **Fonte corpo:** DM Sans (sans-serif moderna)
- **Paleta:** Navy (#0F1F38) + Gold (#B8962E) + Cream (#F8F5EE)
- **Grid:** 12 colunas, container 1200px
- **Breakpoints:** 480px / 768px / 1024px

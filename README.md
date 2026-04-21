Obsidian Dark — Tema Escuro para Magento 2
Baseado no Luma | Paleta: Fundo Profundo + Acentos Âmbar/Dourado
---
🎨 Paleta de Cores
Elemento	Cor	Hex
Fundo principal	Obsidian	`#0d0f12`
Fundo cards	Elevated	`#1a1e26`
Fundo inputs	Surface	`#22273a`
Texto principal	Ice White	`#e8eaf0`
Texto secundário	Silver Blue	`#a0a8c0`
Destaque primário	Amber Gold	`#f0a500`
Destaque secundário	Steel Blue	`#4a90d9`
Sucesso	Emerald	`#3dba7e`
Erro	Crimson	`#e05a5a`
---
📋 Pré-requisitos
Magento 2.4.x (recomendado 2.4.6+)
PHP 8.1, 8.2 ou 8.3
Composer 2.x
Node.js 18+ e Grunt (para compilar LESS)
Tema Luma instalado (vem por padrão no Magento)
---
🚀 Instalação — Passo a Passo
MÉTODO 1 — Cópia Manual (Recomendado para desenvolvimento)
Passo 1: Copiar os arquivos do tema
Extraia o `.zip` e copie a pasta para o seu Magento:
```bash
cp -r app/design/frontend/DarkVendor \
    /var/www/html/seu-magento/app/design/frontend/
```
A estrutura final deve ser:
```
seu-magento/
└── app/
    └── design/
        └── frontend/
            └── DarkVendor/
                └── obsidian/
                    ├── theme.xml
                    ├── registration.php
                    ├── composer.json
                    ├── requirejs-config.js
                    ├── web/
                    │   ├── css/
                    │   │   ├── source/
                    │   │   │   ├── _variables.less
                    │   │   │   ├── _extend.less
                    │   │   │   └── _theme.less
                    │   │   └── obsidian-extras.css
                    │   └── js/
                    │       └── theme.js
                    └── Magento_Theme/
                        └── layout/
                            └── default.xml
```
Passo 2: Registrar o tema no Magento
```bash
cd /var/www/html/seu-magento

# Limpa o cache
php bin/magento cache:flush

# Registra novos componentes
php bin/magento setup:upgrade

# Reindexação (se necessário)
php bin/magento indexer:reindex
```
Passo 3: Ativar o tema no Admin
Acesse: Admin → Conteúdo → Design → Configuração
Clique em Editar na loja desejada
Em Tema Padrão, selecione Obsidian Dark
Clique em Salvar Configuração
Limpe o cache: Sistema → Gerenciamento de Cache → Liberar Cache do Magento
Passo 4: Compilar os arquivos LESS
```bash
cd /var/www/html/seu-magento

# Instalar dependências do Grunt (somente na primeira vez)
npm install

# Compilar o tema específico
grunt less:DarkVendor_obsidian

# OU compilar tudo
grunt less
```
> **Modo Developer** (recomendado para desenvolvimento):
> ```bash
> php bin/magento deploy:mode:set developer
> ```
> No modo developer, os arquivos LESS são compilados automaticamente ao acessar.
---
MÉTODO 2 — Via Composer
Se você quiser gerenciar via Composer, adicione ao seu `composer.json` raiz:
```json
{
    "repositories": [
        {
            "type": "path",
            "url": "app/design/frontend/DarkVendor/obsidian"
        }
    ],
    "require": {
        "darkvendor/magento2-theme-obsidian": "*"
    }
}
```
Depois execute:
```bash
composer update darkvendor/magento2-theme-obsidian
php bin/magento setup:upgrade
php bin/magento cache:flush
```
---
⚙️ Compilação para Produção
Para ambiente de produção, compile e implante os arquivos estáticos:
```bash
# 1. Ativar modo produção
php bin/magento deploy:mode:set production

# 2. Implantar conteúdo estático (substitua pt_BR pelo seu locale)
php bin/magento setup:static-content:deploy pt_BR en_US \
    --theme DarkVendor/obsidian \
    -f

# 3. Limpar e recriar o cache
php bin/magento cache:clean
php bin/magento cache:flush

# 4. Limpar cache do servidor web (Nginx/Varnish se aplicável)
# nginx: nginx -s reload
# varnish: varnishadm "ban req.url ~ ."
```
---
🎨 Personalização de Cores
Todas as cores estão centralizadas em:
```
web/css/source/_variables.less
```
Para mudar a cor de destaque (âmbar → sua cor):
```less
// Linha ~35 em _variables.less
@obsidian-accent:       #f0a500;  // ← substitua pelo hex desejado
@obsidian-accent-hover: #ffb830;  // ← versão mais clara para hover
@obsidian-accent-dark:  #c47f00;  // ← versão mais escura para active
```
Após modificar, recompile:
```bash
grunt less:DarkVendor_obsidian
# ou em modo developer, apenas recarregue o browser
```
---
🔤 Tipografia
O tema usa Sora (títulos) + Inter (corpo), carregadas do Google Fonts.
Para trocar as fontes, edite em `_variables.less`:
```less
@font-family-name__base:    'SuaFonte', sans-serif;
@font-family-name__heading: 'SuaFonteTítulo', sans-serif;
```
E atualize o link do Google Fonts em `Magento_Theme/layout/default.xml`.
---
🐛 Solução de Problemas
O tema não aparece na lista do Admin:
```bash
php bin/magento setup:upgrade
php bin/magento cache:flush
```
Estilos não estão sendo aplicados:
```bash
# Limpar arquivos gerados
rm -rf var/cache var/page_cache var/view_preprocessed pub/static/frontend/DarkVendor
php bin/magento setup:static-content:deploy pt_BR -f
php bin/magento cache:flush
```
Erro de compilação LESS:
```bash
# Verificar se o Grunt está instalado
npm install -g grunt-cli
npm install
grunt less:DarkVendor_obsidian --verbose
```
Imagens do logo aparecem escuras:
Troque o logo por uma versão clara (branca/cinza claro) no Admin:
Conteúdo → Design → Configuração → Logo da Loja
---
📁 Estrutura de Arquivos
```
obsidian/
├── theme.xml                          # Declaração do tema (herda Luma)
├── registration.php                   # Registro do componente Magento
├── composer.json                      # Metadados Composer
├── requirejs-config.js                # Configuração de módulos JS
├── web/
│   ├── css/
│   │   ├── source/
│   │   │   ├── _variables.less        # ⭐ TODAS as cores e variáveis
│   │   │   ├── _extend.less           # Sobrescritas do Luma (dark)
│   │   │   └── _theme.less            # Entry point do LESS
│   │   └── obsidian-extras.css        # Animações e efeitos extras
│   └── js/
│       └── theme.js                   # Melhorias de UX (scroll, animações)
└── Magento_Theme/
    ├── layout/
    │   └── default.xml                # Meta tags dark mode + Google Fonts
    └── templates/
        └── html/
            └── head.phtml             # Template do <head> com color-scheme
```
---
✅ Checklist pós-instalação
[ ] Tema ativado no Admin (Conteúdo → Design → Configuração)
[ ] Cache limpo (Sistema → Gerenciamento de Cache)
[ ] Setup:upgrade executado
[ ] Conteúdo estático compilado (produção)
[ ] Logo trocado para versão clara
[ ] Testado nas páginas: Home, Categoria, Produto, Carrinho, Checkout, Conta
[ ] Testado em mobile (responsividade)
[ ] Verificado acessibilidade de contraste (WCAG AA)
---
📄 Licença
OSL-3.0 — Open Software License 3.0
---
Obsidian Dark Theme v1.0.0 — DarkVendor

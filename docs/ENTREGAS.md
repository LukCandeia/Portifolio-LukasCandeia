# Registro das entregas

Lote de seis commits autorizado explicitamente por Lukas em 21/11/2026. As etapas 7 a 12 e a hospedagem ficam para 22/11/2026, mediante nova instrução.

## 1. docs: registrar escopo e regras do portfolio

Registra identidade, objetivo, fontes dos projetos, regras de autorização e plano das doze etapas.

## 2. chore: configurar ambiente de desenvolvimento

Adiciona servidor local, Prettier com versão fixa e lockfile. Scripts de teste entram junto dos respectivos arquivos nas etapas futuras.

## 3. feat: criar estrutura semantica e identidade Lk

Adiciona HTML semântico, seções, formulário inicialmente desabilitado e favicon Lk. CSS e JavaScript serão vinculados quando seus arquivos entrarem no histórico.

## 4. style: aplicar bento e temas com glassmorphism

Adiciona estilos responsivos, temas claro e escuro e status com glassmorphism verde suave. Vincula a folha de estilo ao HTML.

## 5. feat: adicionar conteudo bilingue do portfolio

Adiciona textos PT/EN revisados com Humanizer, sete projetos, experiências, formação e mensagens de interface.

## 6. feat: implementar idioma tema e projetos

Adiciona tema e idioma persistidos, filtros com contador no singular, projetos, modais, experiências e tecnologias. Os controles estáticos também são traduzidos; formulário e carrossel aguardam a integração das etapas 7 a 10.

## Verificação

A configuração do Prettier aceita a quebra de linha do ambiente (`endOfLine: auto`), incluindo a conversão para CRLF feita pelo Git no Windows. Esse ajuste foi incluído na etapa 6 após verificar a cópia exportada.

A árvore local completa passou em `npm run check`, sete testes e `npm run format:check` antes deste lote. Cada etapa selecionada passa por revisão de diff, sintaxe dos módulos e conferência de referências locais antes do commit. Esses resultados não comprovam entrega real de e-mail.

Uma cópia exata do conteúdo selecionado para a etapa 6 foi executada em servidor local separado. No navegador, foram confirmados idioma e tema após recarga, filtro Ferramentas com um resultado, abertura do modal de Notaê e fechamento com Escape, devolvendo o foco ao botão de origem. O envio de mensagens permaneceu desabilitado, conforme o escopo desta entrega. Não apareceram erros nos logs capturados.

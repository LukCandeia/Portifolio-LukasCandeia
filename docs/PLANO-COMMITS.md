# Plano de 12 commits

Etapas 1 a 6 registradas no lote de 21/11/2026, autorizado explicitamente por Lukas. As etapas 7 a 12 ficam para 22/11/2026. O andamento está em [Registro das entregas](ENTREGAS.md).

## Skills por etapa

| Etapa                   | Skill ou método                                   | Aplicação                                                                                        |
| ----------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Revisão editorial       | Humanizer                                         | Textos PT/EN da página, comentários e documentação, preservando informações fornecidas por Lukas |
| Interface               | Frontend Design                                   | Conferência do bento, vidro verde do status, hierarquia, temas e telas menores                   |
| Código e testes         | Leitura dos módulos, Node Test Runner e navegador | Imports, eventos, validação, estados de envio, filtros, teclado e tradução                       |
| Organização dos commits | Git e revisão do conteúdo selecionado             | Separar mudanças por responsabilidade, conferir o diff e pedir autorização antes de cada commit  |

Humanizer foi aplicado à linguagem escrita. A organização e as correções de lógica fazem parte da revisão técnica. As ferramentas MCP Ruflo foram procuradas, mas não estavam disponíveis nesta sessão.

## Hoje, 21/11: base e navegação

| Nº  | Mensagem proposta                                 | Conteúdo                                                                                           | Verificação da etapa                                            |
| --- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| 1   | `docs: registrar escopo e regras do portfolio`    | `AGENTS.md`, `docs/PROJETO.md`, `docs/FONTES.md`, este plano e introdução do README                | Humanizer; fatos, fontes e regra de autorização                 |
| 2   | `chore: configurar ambiente de desenvolvimento`   | `.gitignore`, configurações do Prettier, `package.json`, lockfile e `scripts/serve.js`             | Instalação reproduzível, formatação e inicialização do servidor |
| 3   | `feat: criar estrutura semantica e identidade Lk` | Estrutura de `index.html` e `public/favicon.svg`, inicialmente sem carregar módulos ainda ausentes | Navegação por âncoras, rótulos e monograma                      |
| 4   | `style: aplicar bento e temas com glassmorphism`  | Estilos de `src/styles.css`, incluindo status verde e layout responsivo                            | Frontend Design; leitura, foco e adaptação das seções           |
| 5   | `feat: adicionar conteudo bilingue do portfolio`  | `src/content.js` e `src/ui-copy.js`                                                                | Humanizer; PT/EN, projetos, experiências e formação             |
| 6   | `feat: implementar idioma tema e projetos`        | Núcleo de `src/app.js` e carregamento no HTML: tradução, preferências, filtros, contador e modais  | Tema e idioma após recarga, filtros, Escape e retorno do foco   |

## Amanhã, 22/11: ferramentas, contato e fechamento

| Nº  | Mensagem proposta                                   | Conteúdo                                                                       | Verificação da etapa                                                              |
| --- | --------------------------------------------------- | ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| 7   | `feat: implementar carrossel de ferramentas`        | `src/tool-icons.js` e `src/carousel.js`                                        | Ícones, pausas, setas e regras de movimento reduzido                              |
| 8   | `feat: conectar envio ao Formspree`                 | `src/config.js`, `src/contact.js`, `tests/contact.test.js` e comando de testes | Endpoint, POST, sucesso, rejeição, limite e falha de rede simulados               |
| 9   | `feat: validar campos e estados do contato`         | `src/contact-form.js`                                                          | Campos vazios, espaços, e-mail inválido, bloqueio durante envio e mensagens PT/EN |
| 10  | `feat: integrar formulario e ferramentas na pagina` | `src/enhancements.js` e integração final em `src/app.js`                       | Carrossel e formulário funcionando junto da troca de idioma                       |
| 11  | `test: verificar traducoes filtros e estrutura`     | `tests/content.test.js`, `scripts/check.js` e comandos de verificação          | Sintaxe de todos os módulos, paridade PT/EN, filtros, IDs, âncoras e arquivos     |
| 12  | `docs: registrar revisao e instrucoes de uso`       | README completo, `docs/FORMULARIO.md`, `docs/REVISAO.md` e `docs/VALIDACAO.md` | Humanizer; comandos, resultados, limites e pendências conferidos com o código     |

## Como preparar cada commit

As mudanças já foram implementadas localmente. A divisão será feita por arquivos e, quando necessário, por trechos. Não recriar erros antigos para depois corrigi-los em outro commit.

Os comandos de teste e de verificação entram no `package.json` quando os respectivos arquivos existirem. O HTML só carrega `app.js` no commit 6. Nesse commit, o núcleo ainda não importa nem chama `setupEnhancements`; a integração entra no commit 10, depois dos módulos dos quais depende. Até essa integração, o formulário permanece desabilitado. A folha de estilo só é referenciada quando estiver incluída. Isso evita imports e referências quebrados no histórico intermediário.

Antes de cada commit, selecionar o escopo, conferir o diff, executar as verificações disponíveis naquela etapa e mostrar o conteúdo a Lukas. Só então pedir sua autorização explícita. A aprovação do planejamento, por si só, não autoriza execução. Em 21/11/2026, Lukas autorizou expressamente executar e enviar ao repositório os seis primeiros commits; essa autorização cobre o lote descrito.

Usar a data real de execução. Os seis commits de amanhã não serão antecipados ou agendados automaticamente. Push e publicação precisam de uma instrução própria. Foto, contribuições individuais e teste real de recebimento ficam pendentes até haver informação ou autorização suficiente.

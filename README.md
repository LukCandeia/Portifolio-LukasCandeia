# Portfólio de Lukas Candeia

Sou estudante de Engenharia de Software na PUC e busco uma oportunidade de estágio ou júnior, com foco em backend. Este site reúne meus projetos, experiências e contatos em português e inglês.

A página usa HTML, CSS e JavaScript, com temas claro e escuro, composição bento e glassmorphism. Não há dependências de execução nem etapa de build. O Prettier é usado apenas no desenvolvimento.

## Funcionalidades e decisões

- Página contínua com apresentação, projetos, formação, experiências, tecnologias e contato.
- Conteúdo em português brasileiro e inglês, com preferência de idioma e tema salva no navegador.
- Projetos filtrados por categoria, com detalhes em diálogos que podem ser fechados pelo teclado.
- Layout responsivo, paleta neutra e card de disponibilidade com vidro verde suave.
- Em implementação: carrossel de ferramentas com setas, botão de pausa e suporte à preferência de movimento reduzido.
- Estrutura de formulário com nome, e-mail e mensagem. O envio pelo Formspree ainda está em implementação e permanece desabilitado nesta versão.

HTML, CSS e JavaScript nativos atendem ao escopo sem exigir um framework. A integração de mensagens foi planejada com um serviço externo, dispensando um backend próprio para o portfólio.

Os controles do carrossel ficam ocultos até sua integração. Os links de e-mail, LinkedIn e GitHub estão disponíveis para contato.

## Executar localmente

Requer Node.js 22 ou superior.

```sh
npm ci
npm run dev
```

Abra [a prévia local](http://127.0.0.1:5173/). Para outra porta, defina a variável `PORT`. O servidor aceita conexões apenas na própria máquina e serve os arquivos da página, de `src` e de `public`.

## Verificar alterações

```sh
npm run format:check
```

O comando confere a formatação. Use `npm run format` para aplicá-la. Os testes automatizados e o comando de verificação completa de sintaxe ainda serão incorporados ao repositório.

A formatação não substitui o teste no navegador. Antes de publicar ou alterar uma funcionalidade, confira:

1. Troca de idioma e tema, inclusive após recarregar a página.
2. Filtros de projetos, contador e abertura dos detalhes; Escape deve fechar o diálogo e devolver o foco ao botão de origem.
3. Navegação por teclado e leitura em telas pequenas, nos dois temas e idiomas.
4. Após integrar o carrossel, pausa e setas, inclusive com movimento reduzido ativado.
5. Após integrar o envio, campos vazios, espaços e e-mail inválido no formulário. Em falhas de envio, o conteúdo deve ser preservado.

O recebimento de e-mail, o funcionamento dos projetos externos e o comportamento em um celular real precisam de verificação própria. Após configurar a hospedagem, confira os caminhos dos recursos e o envio de uma mensagem de teste.

## Onde editar

| Arquivo              | Responsabilidade                                       |
| -------------------- | ------------------------------------------------------ |
| `index.html`         | Estrutura da página, navegação e formulário            |
| `src/content.js`     | Textos PT/EN, experiências, tecnologias e projetos     |
| `src/ui-copy.js`     | Textos dos controles, status e mensagens do formulário |
| `src/app.js`         | Idioma, tema, filtros e detalhes dos projetos          |
| `src/styles.css`     | Layout, temas e adaptações para telas menores          |
| `public/favicon.svg` | Monograma Lk                                           |
| `scripts/serve.js`   | Servidor de desenvolvimento local                      |

Ao editar textos, atualize os dois idiomas. As artes dos projetos são desenhos em CSS, não capturas das aplicações. A foto pessoal ainda será escolhida; o monograma ocupa esse espaço.

## Contato e preferências

O envio pelo Formspree ainda está em implementação. Enquanto o formulário estiver desabilitado, use os links de contato. O comportamento previsto e a configuração estão em [Formulário](docs/FORMULARIO.md).

A configuração usará um endpoint público e um destinatário definido no painel do Formspree. Senhas e chaves administrativas não devem entrar no código.

Tema e idioma ficam salvos no navegador. A página continua funcionando se o armazenamento estiver indisponível. As fontes DM Sans e Manrope são carregadas pelo Google Fonts, com alternativa local sans-serif. Não há analytics.

## Publicação

O [repositório oficial](https://github.com/LukCandeia/Portifolio-LukasCandeia) guarda o código e a documentação técnica.

O site pode ser hospedado como arquivos estáticos. A publicação deve incluir `index.html`, `src/` e `public/`, preservando os caminhos relativos. O servidor em `scripts/serve.js` é destinado ao desenvolvimento local. A hospedagem ainda não está configurada.

As fontes das descrições dos projetos estão em [Fontes](docs/FONTES.md). As participações individuais nos projetos em equipe ainda serão detalhadas.

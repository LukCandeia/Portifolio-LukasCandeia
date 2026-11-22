export const projects = [
  {
    id: 'api',
    year: 2026,
    startMonth: null,
    deadlineMonth: null,
    media: null,
    category: 'backend',
    visual: 'api',
    mark: '{ }',
    tags: ['Node.js', 'Express', 'JavaScript'],
    url: 'https://github.com/LukCandeia/API-RestFull-com-Node.js',
    pt: {
      title: 'API de produtos',
      type: 'Aplicação cliente-servidor',
      description:
        'Gerenciamento de produtos com uma API REST própria e uma interface que consome seus endpoints.',
      detail:
        'Aplicação com operações de cadastro, consulta, atualização e exclusão de produtos. O servidor Express também entrega a interface, que consome a API com Fetch. O README documenta as rotas e o uso de Postman para validar endpoints.',
    },
    en: {
      title: 'Product API',
      type: 'Client-server application',
      description:
        'Product management with a custom REST API and an interface that consumes its endpoints.',
      detail:
        'An application for creating, reading, updating and deleting products. The Express server also serves the interface, which consumes the API using Fetch. The README documents routes and the use of Postman to validate endpoints.',
    },
  },
  {
    id: 'bookmark',
    year: 2026,
    startMonth: 7,
    deadlineMonth: 12,
    media: null,
    category: 'fullstack',
    visual: 'books',
    mark: 'b.',
    tags: ['React', 'Node.js', 'MongoDB'],
    team: true,
    url: 'https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2026-2-ti2-8183100-bookshelf',
    pt: {
      title: 'BookMark',
      type: 'Em equipe · Em desenvolvimento',
      description:
        'Uma comunidade para descobrir livros, organizar leituras e acompanhar o próprio hábito.',
      detail:
        'Projeto acadêmico com catálogo, listas de leitura, favoritos, métricas e feed social. A aplicação conecta React a uma API em Node.js e Express com MongoDB. O catálogo depende da Google Books API.',
    },
    en: {
      title: 'BookMark',
      type: 'Team project · In development',
      description:
        'A community to discover books, organize reading lists and track reading habits.',
      detail:
        'A university project featuring a catalog, reading lists, favorites, metrics and a social feed. The application connects React to a Node.js and Express API with MongoDB. Its catalog relies on the Google Books API.',
    },
  },
  {
    id: 'notae',
    year: 2026,
    startMonth: null,
    deadlineMonth: null,
    media: {
      src: './projects/notae.png',
      alt: { pt: 'Tela inicial do Notaê no Obsidian', en: 'Notaê home screen in Obsidian' },
    },
    category: 'tool',
    visual: 'notes',
    mark: 'Notaê',
    tags: ['JavaScript', 'Obsidian', 'Markdown'],
    url: 'https://github.com/LukCandeia/Notae',
    pt: {
      title: 'Notaê',
      type: 'Ferramenta de estudos',
      description: 'Um complemento local para Obsidian que facilita a organização dos estudos.',
      detail:
        'Modelo de vault e complemento local para criar disciplinas, organizar estudos independentes e guardar textos, links e arquivos. O conteúdo permanece em Markdown, sem exigir conta ou chave de API. A interface e a lógica funcionam localmente no Obsidian, sem servidor.',
    },
    en: {
      title: 'Notaê',
      type: 'Study tool',
      description: 'A local Obsidian plugin that makes it easier to organize study materials.',
      detail:
        'A vault template and local plugin to create subjects, organize independent studies and save text, links and files. Content stays in Markdown, without requiring an account or API key. Its interface and logic run locally in Obsidian, without a server.',
    },
  },
  {
    id: 'auth',
    year: 2026,
    startMonth: null,
    deadlineMonth: null,
    media: null,
    category: 'backend',
    visual: 'auth',
    mark: '••••',
    tags: ['Node.js', 'Cookies', 'JWT'],
    url: 'https://github.com/LukCandeia/Tratamento-de-login-cookies-e-autenticacao-HTTP',
    pt: {
      title: 'Autenticação HTTP',
      type: 'Laboratório de backend',
      description: 'Um estudo prático sobre sessões, cookies HttpOnly e autenticação com JWT.',
      detail:
        'Laboratório que compara cookies simples, HttpOnly, SameSite e JWT por meio de login, consulta de usuário e logout. Usa usuários em memória e contém etapas intencionalmente vulneráveis para aprendizado. Não é um sistema de autenticação pronto para produção.',
    },
    en: {
      title: 'HTTP authentication',
      type: 'Backend lab',
      description: 'A hands-on study of sessions, HttpOnly cookies and JWT authentication.',
      detail:
        'A lab comparing simple cookies, HttpOnly, SameSite and JWT through login, user lookup and logout. Users are stored in memory, and some stages are intentionally vulnerable for learning. This is not a production-ready authentication system.',
    },
  },
  {
    id: 'hospital',
    year: 2026,
    startMonth: 7,
    deadlineMonth: 12,
    media: null,
    category: 'backend',
    visual: 'hospital',
    mark: '+',
    tags: ['POO / OOP', 'API', 'Arquitetura / Architecture'],
    team: true,
    url: 'https://github.com/5byp8r/TrabalhoPraticoProgModular',
    pt: {
      title: 'Sistema hospitalar',
      type: 'Em equipe · Em desenvolvimento',
      description:
        'Modelagem de um sistema para conectar pacientes, profissionais e processos hospitalares.',
      detail:
        'Projeto de programação modular com proposta de centralizar informações de atendimentos, consultas e internações. O README define orientação a objetos, arquitetura em camadas e desenvolvimento de APIs como fundamentos do sistema.',
    },
    en: {
      title: 'Hospital system',
      type: 'Team project · In development',
      description:
        'Modeling a system connecting patients, healthcare professionals and hospital processes.',
      detail:
        'A modular programming project intended to centralize care, appointment and admission information. The README identifies object-oriented programming, layered architecture and API development as the system’s foundations.',
    },
  },
  {
    id: 'alessandra',
    year: 2026,
    startMonth: null,
    deadlineMonth: null,
    media: null,
    category: 'freelance',
    visual: 'beauty',
    mark: 'af',
    tags: ['Web', 'UX', 'WhatsApp'],
    url: 'https://github.com/LukCandeia/Alessandra-Ferreira-Desing-Sombrancelha',
    pt: {
      title: 'Alessandra Ferreira',
      type: 'Freelance · Presença digital',
      description:
        'Um site pensado para apresentar serviços de estética e facilitar o contato com a profissional.',
      detail:
        'Projeto de site para uma profissional de design de sobrancelhas. O briefing documentado inclui apresentação dos serviços, fotos de antes e depois, localização e direcionamento para WhatsApp com informações do atendimento desejado.',
    },
    en: {
      title: 'Alessandra Ferreira',
      type: 'Freelance · Digital presence',
      description: 'A website for presenting beauty services and contacting the professional.',
      detail:
        'A website project for an eyebrow designer. The documented brief includes services, before-and-after photos, location and a WhatsApp link with details about the desired appointment.',
    },
  },
  {
    id: 'protege',
    year: 2026,
    startMonth: 2,
    deadlineMonth: 6,
    media: null,
    category: 'fullstack',
    visual: 'protege',
    mark: 'p+',
    tags: ['Product discovery', 'UX', 'Web'],
    team: true,
    url: 'https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2026-1-ti1-0427200-protege',
    pt: {
      title: 'Protege+',
      type: 'Em equipe · Primeiro período',
      description:
        'Um projeto acadêmico sobre acesso à informação e redes de apoio para vítimas de violência doméstica.',
      detail:
        'Primeiro projeto da faculdade, com pesquisa de contexto, personas, histórias de usuário e prototipação. A proposta aborda canais de apoio e acesso à informação para pessoas em situação de violência doméstica. Apresentado aqui como projeto acadêmico, não como serviço de emergência.',
    },
    en: {
      title: 'Protege+',
      type: 'Team project · First semester',
      description:
        'A university project about access to information and support networks for victims of domestic violence.',
      detail:
        'A first-semester project including context research, personas, user stories and prototyping. Its proposal explores support channels and access to information for people experiencing domestic violence. Presented here as an academic project, not an emergency service.',
    },
  },
];

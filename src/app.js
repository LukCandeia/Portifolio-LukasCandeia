import { copy, projects } from './content.js';
import { uiCopy } from './ui-copy.js';
const readPreference = (key) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};
const savePreference = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* Preferências são opcionais; a página funciona sem armazenamento. */
  }
};
let language = readPreference('portfolio-language') === 'en' ? 'en' : 'pt';
let theme = readPreference('portfolio-theme') === 'dark' ? 'dark' : 'light';
let filter = 'all';
const dialog = document.querySelector('#project-dialog');
const grid = document.querySelector('#project-grid');
let activeProject = null;
// Os controles interativos de contato e ferramentas entram na próxima entrega.
function updateStaticControls() {
  const text = uiCopy[language];
  document.querySelectorAll('[data-extra]').forEach((element) => {
    element.textContent = text[element.dataset.extra];
  });
  document.querySelector('.form-submit').textContent = text.send;
  document.querySelector('.form-status').textContent = text.unavailable;
  document
    .querySelector('#contact-form')
    .setAttribute('aria-label', language === 'pt' ? 'Formulário de contato' : 'Contact form');
  document.querySelector('.daily-card').setAttribute('aria-label', text.daily);
}
const escape = (value) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character],
  );
const tags = (project) =>
  project.tags.map((tag) =>
    tag === 'POO / OOP'
      ? language === 'pt'
        ? 'POO'
        : 'OOP'
      : tag === 'Arquitetura / Architecture'
        ? language === 'pt'
          ? 'Arquitetura'
          : 'Architecture'
        : tag,
  );
function renderTags(project) {
  return tags(project)
    .map((tag) => `<span>${escape(tag)}</span>`)
    .join('');
}

function renderProjectCard(project) {
  const item = project[language];
  const details = copy[language].details;
  const apiRoute =
    project.id === 'api'
      ? '<span class="api-route" aria-hidden="true">GET /produtos <b>200 OK</b></span>'
      : '';

  return `
    <article class="project-card">
      <button class="project-art ${project.visual}" data-project="${project.id}"
        aria-label="${escape(details + ': ' + item.title)}">
        <span class="art-orbit" aria-hidden="true"></span>
        <span class="art-mark" aria-hidden="true">${project.mark}</span>
        ${apiRoute}
        <span class="art-open" aria-hidden="true">↗</span>
      </button>
      <div class="project-body">
        <p class="project-type">${escape(item.type)}</p>
        <h3>${escape(item.title)}</h3>
        <p class="project-description">${escape(item.description)}</p>
        <div class="tags">${renderTags(project)}</div>
        <button class="project-detail text-link" data-project="${project.id}">
          ${escape(details)}<span aria-hidden="true">↗</span>
        </button>
      </div>
    </article>`;
}

function renderProjects() {
  const visible = projects.filter((project) => filter === 'all' || project.category === filter);
  grid.innerHTML = visible.map(renderProjectCard).join('');
  const countLabel = copy[language][visible.length === 1 ? 'countOne' : 'count'];
  document.querySelector('#project-count').textContent = `${visible.length} ${countLabel}`;
}

function renderDialog() {
  const item = activeProject[language];
  const teamNote = activeProject.team
    ? `<p class="dialog-note">${escape(copy[language].teamNote)}</p>`
    : '';

  document.querySelector('#dialog-content').innerHTML = `
    <p class="eyebrow">${escape(item.type)}</p>
    <h2 id="dialog-title">${escape(item.title)}</h2>
    <p>${escape(item.detail)}</p>
    ${teamNote}
    <div class="tags">${renderTags(activeProject)}</div>
    <a class="button primary" href="${activeProject.url}" target="_blank" rel="noopener noreferrer">
      ${escape(copy[language].repo)}<span aria-hidden="true">↗</span>
    </a>
    <p class="source-note">${escape(copy[language].sourceNote)}</p>`;
}
function applyTheme() {
  document.documentElement.dataset.theme = theme;
  document
    .querySelector('#theme-toggle')
    .setAttribute('aria-label', copy[language][theme === 'dark' ? 'light' : 'dark']);
  document.querySelector('#theme-toggle').setAttribute('aria-pressed', String(theme === 'dark'));
  document.querySelector('meta[name="theme-color"]').content =
    theme === 'dark' ? '#101010' : '#efefed';
}
function renderLanguage() {
  updateStaticControls();
  const text = copy[language];
  document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
  document.title =
    language === 'pt'
      ? 'Lukas Candeia | Engenheiro de software em formação'
      : 'Lukas Candeia | Software engineer in training';
  document.querySelector('meta[name="description"]').content = text.intro;
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    element.innerHTML = text[element.dataset.i18n];
  });
  document
    .querySelectorAll('[data-lang]')
    .forEach((button) =>
      button.setAttribute('aria-pressed', String(button.dataset.lang === language)),
    );
  for (const [selector, key] of [
    ['#navigation', 'navigation'],
    ['.filters', 'filter'],
    ['.language', 'language'],
    ['#home', 'presentation'],
    ['.dialog-close', 'close'],
  ])
    document.querySelector(selector).setAttribute('aria-label', text[key]);
  document.querySelector('#experience-list').innerHTML = text.experience
    .map(
      ([title, description]) =>
        `<article><span class="experience-icon" aria-hidden="true">↗</span><div><h3>${title}</h3><p>${description}</p></div></article>`,
    )
    .join('');
  document.querySelector('#stack-grid').innerHTML = text.stack
    .map(
      ([title, skills]) =>
        `<article class="glass stack-card"><h3>${title}</h3><div class="tags">${skills.map((skill) => `<span>${skill}</span>`).join('')}</div></article>`,
    )
    .join('');
  renderProjects();
  if (dialog.open) renderDialog();
  applyTheme();
}
document.querySelectorAll('[data-lang]').forEach((button) =>
  button.addEventListener('click', () => {
    language = button.dataset.lang;
    savePreference('portfolio-language', language);
    renderLanguage();
  }),
);
document.querySelector('#theme-toggle').addEventListener('click', () => {
  theme = theme === 'light' ? 'dark' : 'light';
  savePreference('portfolio-theme', theme);
  applyTheme();
});
document.querySelectorAll('[data-filter]').forEach((button) =>
  button.addEventListener('click', () => {
    filter = button.dataset.filter;
    document
      .querySelectorAll('[data-filter]')
      .forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
    renderProjects();
  }),
);
grid.addEventListener('click', (event) => {
  const trigger = event.target.closest('[data-project]');
  if (!trigger) return;
  activeProject = projects.find((project) => project.id === trigger.dataset.project);
  renderDialog();
  dialog.showModal();
  document.body.classList.add('modal-open');
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) {
    const rect = dialog.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    )
      dialog.close();
  }
});
dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
renderLanguage();

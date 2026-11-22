import { useEffect, useState } from 'react';
import { copy } from './content.js';
import { uiCopy } from './ui-copy.js';
import { ToolsCarousel } from './components/ToolsCarousel.jsx';
import { ProjectTimeline } from './components/ProjectTimeline.jsx';
import { Contact } from './components/Contact.jsx';

function readPreference(key, fallback) {
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [language, setLanguage] = useState(() =>
    readPreference('portfolio-language', 'pt') === 'en' ? 'en' : 'pt',
  );
  const [theme, setTheme] = useState(() =>
    readPreference('portfolio-theme', 'light') === 'dark' ? 'dark' : 'light',
  );
  const t = copy[language];
  const ui = uiCopy[language];

  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
    document.documentElement.dataset.theme = theme;
    document.title =
      language === 'pt'
        ? 'Lukas Candeia | Engenheiro de software em formação'
        : 'Lukas Candeia | Software engineer in training';
    document.querySelector('meta[name="description"]').content = t.intro;
    document.querySelector('meta[name="theme-color"]').content =
      theme === 'dark' ? '#101010' : '#efefed';
    try {
      localStorage.setItem('portfolio-language', language);
      localStorage.setItem('portfolio-theme', theme);
    } catch {
      /* O site também funciona sem armazenamento local. */
    }
  }, [language, theme, t]);

  return (
    <>
      <a className="skip-link" href="#main">
        {t.skip}
      </a>
      <header className="header wrap">
        <a className="brand" href="#home" aria-label="Lukas Candeia">
          <span className="brand-symbol">
            Lk<span>↗</span>
          </span>
          <span>
            Lukas Candeia<span className="brand-sub">{t.portfolio}</span>
          </span>
        </a>
        <nav aria-label={t.navigation} id="navigation">
          <a href="#about">{t.about}</a>
          <a href="#projects">{t.projects}</a>
          <a href="#experience">{t.experiences}</a>
          <a href="#contact">{t.contact}</a>
        </nav>
        <div className="controls">
          <div className="language" role="group" aria-label={t.language}>
            <button aria-pressed={language === 'pt'} onClick={() => setLanguage('pt')}>
              PT
            </button>
            <span>/</span>
            <button aria-pressed={language === 'en'} onClick={() => setLanguage('en')}>
              EN
            </button>
          </div>
          <button
            className="theme-toggle"
            id="theme-toggle"
            aria-label={t[theme === 'dark' ? 'light' : 'dark']}
            aria-pressed={theme === 'dark'}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M20 14.2A8.5 8.5 0 0 1 9.8 4a8.5 8.5 0 1 0 10.2 10.2Z" />
            </svg>
          </button>
        </div>
      </header>
      <main id="main" className="wrap">
        <section className="bento" id="home" aria-label={t.presentation}>
          <div className="glass introduction">
            <div className="intro-top">
              <span className="pill">
                <span className="status-dot" />
                {t.available}
              </span>
              <span className="tiny">&lt;/&gt;</span>
            </div>
            <div>
              <p className="hello">{t.hello}</p>
              <h1>{t.headline}</h1>
              <p className="intro-copy">{t.intro}</p>
            </div>
            <div className="intro-bottom">
              <a className="button primary" href="#projects">
                {t.viewProjects}
                <span aria-hidden="true">↗</span>
              </a>
              <span className="small">{t.opportunity}</span>
            </div>
          </div>
          <div className="glass identity">
            <div className="identity-top">
              <span>{t.inProgress}</span>
              <span aria-hidden="true">✳</span>
            </div>
            <div className="monogram" aria-hidden="true">
              Lk<span>.</span>
            </div>
            <div className="identity-bottom">
              <span>Lukas Candeia</span>
              <span>{t.developer}</span>
            </div>
          </div>
          <div className="glass status-card">
            <span className="card-label">{ui.status}</span>
            <p>
              <span className="status-dot" />
              <strong>{ui.work}</strong>
            </p>
          </div>
          <ToolsCarousel text={ui} />
          <a className="glass contact-shortcut" href="#contact">
            <span className="card-label">{t.nextStep}</span>
            <strong>{t.together}</strong>
            <span className="shortcut-bottom">
              {t.talk}
              <span className="round-arrow" aria-hidden="true">
                ↗
              </span>
            </span>
          </a>
        </section>
        <ProjectTimeline language={language} text={t} />
        <section className="about-section section" id="about" aria-labelledby="about-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{t.aboutLabel}</p>
              <h2 id="about-heading">{t.aboutHeading}</h2>
            </div>
          </div>
          <div className="about-grid">
            <div className="about-copy">
              <p className="lead">{t.aboutLead}</p>
              <p>{t.aboutCopy}</p>
              <p>{t.aboutCopy2}</p>
              <div className="signature">
                Lukas Candeia <span aria-hidden="true">↗</span>
              </div>
            </div>
            <aside className="glass education-card">
              <p className="eyebrow">{t.educationLabel}</p>
              <h3>{t.educationTitle}</h3>
              <p className="education-school">{t.educationSchool}</p>
              <p>{t.educationCopy}</p>
            </aside>
          </div>
        </section>
        <section
          className="section experience-section"
          id="experience"
          aria-labelledby="experience-heading"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">{t.experienceLabel}</p>
              <h2 id="experience-heading">{t.experienceHeading}</h2>
            </div>
          </div>
          <div className="experience-list">
            {t.experience.slice(0, 4).map(([title, description], index) => (
              <article key={index}>
                <span className="experience-icon" aria-hidden="true">
                  ↗
                </span>
                <div>
                  <p className="experience-meta">
                    <span>{t.experienceInstitutions[index]}</span>
                    <time dateTime="2026">2026</time>
                  </p>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="section stack-section" id="stack" aria-labelledby="stack-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{t.stackLabel}</p>
              <h2 id="stack-heading">{t.stackHeading}</h2>
            </div>
            <p>{t.stackIntro}</p>
          </div>
          <div className="stack-grid">
            {t.stack.map(([title, skills]) => (
              <article className="glass stack-card" key={title}>
                <h3>{title}</h3>
                <div className="tags">
                  {skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <div className="practice-list">
            {t.experience.slice(4).map(([title, description]) => (
              <div key={title}>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </section>
        <Contact language={language} text={t} ui={ui} />
      </main>
      <footer className="wrap">
        <span>© 2026 Lukas Candeia</span>
        <span>{t.footer}</span>
        <a href="#home">{t.backTop} ↑</a>
      </footer>
    </>
  );
}

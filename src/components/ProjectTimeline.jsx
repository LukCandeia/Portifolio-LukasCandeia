import { PortfolioIcon } from './PortfolioIcon.jsx';
import { useEffect, useRef, useState } from 'react';
import { projects } from '../projects.js';
import { groupProjects, monthLabel } from '../timeline.js';

function Tags({ project, language }) {
  return (
    <div className="tags">
      {project.tags.map((tag) => (
        <span key={tag}>
          {tag.includes(' / ') ? tag.split(' / ')[language === 'pt' ? 0 : 1] : tag}
        </span>
      ))}
    </div>
  );
}

function ProjectDialog({ project, language, text, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    const trigger = document.activeElement;
    dialog.showModal();
    document.body.classList.add('modal-open');
    return () => {
      dialog.close();
      document.body.classList.remove('modal-open');
      trigger?.focus();
    };
  }, []);
  const item = project[language];
  return (
    <dialog
      ref={ref}
      id="project-dialog"
      aria-labelledby="dialog-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target !== ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        if (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        )
          onClose();
      }}
    >
      <button className="dialog-close" aria-label={text.close} onClick={onClose}>
        ×
      </button>
      <div id="dialog-content">
        <p className="eyebrow">{item.type}</p>
        <h2 id="dialog-title">{item.title}</h2>
        {project.media && (
          <img className="dialog-image" src={project.media.src} alt={project.media.alt[language]} />
        )}
        <p>{item.detail}</p>
        {project.team && <p className="dialog-note">{text.teamNote}</p>}
        <Tags project={project} language={language} />
        <a className="button primary" href={project.url} target="_blank" rel="noopener noreferrer">
          {text.repo}
          <span aria-hidden="true">
            <PortfolioIcon />
          </span>
        </a>
        <p className="source-note">{text.sourceNote}</p>
      </div>
    </dialog>
  );
}

export function ProjectTimeline({ language, text }) {
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const groups = groupProjects(projects, filter);
  const count = groups.reduce((total, group) => total + group.projects.length, 0);
  const filters = {
    all: text.all,
    backend: 'Backend',
    fullstack: 'Full-stack',
    tool: text.toolsFilter,
    freelance: 'Freelance',
  };
  return (
    <section className="projects-section section" id="projects" aria-labelledby="projects-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{text.workLabel}</p>
          <h2 id="projects-heading">{text.projectHeading}</h2>
        </div>
        <p>{text.projectIntro}</p>
      </div>
      <div className="filters" role="group" aria-label={text.filter}>
        {Object.entries(filters).map(([key, label]) => (
          <button key={key} aria-pressed={filter === key} onClick={() => setFilter(key)}>
            {label}
          </button>
        ))}
      </div>
      <ol className="project-timeline">
        {groups.map((group) => (
          <li className="timeline-group" key={group.key}>
            <h3 className="timeline-date">
              {group.month ? (
                <time dateTime={group.key}>{monthLabel(group.year, group.month, language)}</time>
              ) : (
                `${text.otherProjects} ${group.year}`
              )}
            </h3>
            {!group.month && <p className="timeline-note">{text.unknownMonth}</p>}
            <div className="project-grid">
              {group.projects.map((project) => {
                const item = project[language];
                return (
                  <article className="project-card" key={project.id}>
                    <button
                      className={`project-art ${project.visual}`}
                      onClick={() => setSelected(project)}
                      aria-label={`${text.details}: ${item.title}`}
                    >
                      {project.media ? (
                        <img
                          src={project.media.src}
                          alt={project.media.alt[language]}
                          loading="lazy"
                          width="960"
                          height="600"
                        />
                      ) : (
                        <>
                          <span className="art-orbit" aria-hidden="true" />
                          <span className="art-mark" aria-hidden="true">
                            {project.mark}
                          </span>
                          <span className="art-caption">{text.projectIllustration}</span>
                        </>
                      )}
                      <span className="art-open" aria-hidden="true">
                        <PortfolioIcon />
                      </span>
                    </button>
                    <div className="project-body">
                      <p className="project-type">{item.type}</p>
                      <h4>{item.title}</h4>
                      {project.deadlineMonth && (
                        <p className="project-deadline">
                          {text.deadline}:{' '}
                          <time
                            dateTime={`${project.year}-${String(project.deadlineMonth).padStart(2, '0')}`}
                          >
                            {monthLabel(project.year, project.deadlineMonth, language)}
                          </time>
                        </p>
                      )}
                      <p className="project-description">{item.description}</p>
                      <Tags project={project} language={language} />
                      <div className="project-actions">
                        <button
                          className="project-detail text-link"
                          onClick={() => setSelected(project)}
                        >
                          {text.details}
                          <span aria-hidden="true">
                            <PortfolioIcon />
                          </span>
                        </button>
                        <a
                          className="text-link"
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${text.repo}: ${item.title}`}
                        >
                          GitHub <PortfolioIcon />
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </li>
        ))}
      </ol>
      <p className="sr-only" role="status">
        {count} {text[count === 1 ? 'countOne' : 'count']}
      </p>
      <a
        className="text-link github-all"
        href="https://github.com/LukCandeia"
        target="_blank"
        rel="noopener noreferrer"
      >
        {text.allGithub}
        <span aria-hidden="true">
          <PortfolioIcon />
        </span>
      </a>
      {selected && (
        <ProjectDialog
          project={selected}
          language={language}
          text={text}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}

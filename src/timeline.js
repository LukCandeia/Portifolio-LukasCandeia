export function groupProjects(projects, category = 'all') {
  const visible = projects.filter((project) => category === 'all' || project.category === category);
  const dated = visible
    .filter((project) => project.startMonth)
    .sort((a, b) => a.year - b.year || a.startMonth - b.startMonth);
  const groups = [];
  for (const project of dated) {
    const key = `${project.year}-${String(project.startMonth).padStart(2, '0')}`;
    let group = groups.find((item) => item.key === key);
    if (!group) {
      group = { key, year: project.year, month: project.startMonth, projects: [] };
      groups.push(group);
    }
    group.projects.push(project);
  }
  // Só o ano é conhecido: esses projetos não recebem uma ordem cronológica inventada.
  for (const year of [...new Set(visible.filter((p) => !p.startMonth).map((p) => p.year))].sort()) {
    groups.push({
      key: `${year}-unknown`,
      year,
      month: null,
      projects: visible.filter((p) => p.year === year && !p.startMonth),
    });
  }
  return groups;
}

export function monthLabel(year, month, language) {
  return new Intl.DateTimeFormat(language === 'pt' ? 'pt-BR' : 'en', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, 1)));
}

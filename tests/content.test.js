import test from 'node:test';
import assert from 'node:assert/strict';
import { copy } from '../src/content.js';
import { uiCopy } from '../src/ui-copy.js';
import { projects } from '../src/projects.js';
import { groupProjects } from '../src/timeline.js';

test('os catálogos de tradução têm as mesmas chaves', () => {
  for (const catalog of [copy, uiCopy]) {
    assert.deepEqual(Object.keys(catalog.pt).sort(), Object.keys(catalog.en).sort());
  }
});

test('a timeline ordena os meses conhecidos e agrupa os projetos sem mês', () => {
  const groups = groupProjects(projects);
  assert.deepEqual(
    groups.map((group) => group.key),
    ['2026-02', '2026-07', '2026-unknown'],
  );
  assert.deepEqual(
    groups[0].projects.map((project) => project.id),
    ['protege'],
  );
  assert.equal(groups.flatMap((group) => group.projects).length, projects.length);
  assert.ok(groups.at(-1).projects.every((project) => !project.startMonth));
});

test('o filtro preserva a cronologia e omite grupos vazios', () => {
  const groups = groupProjects(projects, 'backend');
  assert.deepEqual(
    groups.map((group) => group.key),
    ['2026-07', '2026-unknown'],
  );
  assert.ok(
    groups.every((group) => group.projects.every((project) => project.category === 'backend')),
  );
});

import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

import {
  getBySlug,
  getFeatured,
  getOther,
  getSecondary,
  labProjects,
  projects,
} from '../src/data/projects.js'
import { meta } from '../src/data/meta.js'

const allowedTiers = new Set(['featured', 'secondary', 'other'])
const allowedStatuses = new Set(['live', 'code', 'wip'])
const architectureIds = new Set(['synaptic', 'possah'])

test('project slugs are unique and route-safe', () => {
  const slugs = projects.map((project) => project.slug)

  assert.equal(new Set(slugs).size, slugs.length)
  for (const slug of slugs) {
    assert.match(slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  }
})

test('project groups partition every portfolio project', () => {
  const grouped = [...getFeatured(), ...getSecondary(), ...getOther()]

  assert.equal(grouped.length, projects.length)
  assert.deepEqual(new Set(grouped.map(({ slug }) => slug)), new Set(projects.map(({ slug }) => slug)))
})

test('every project has the data required by its card', () => {
  for (const project of projects) {
    assert.ok(project.name, `${project.slug} must have a name`)
    assert.ok(project.tease, `${project.slug} must have card copy`)
    assert.ok(project.category, `${project.slug} must have a category`)
    assert.ok(project.stack.length > 0, `${project.slug} must list its stack`)
    assert.ok(allowedTiers.has(project.tier), `${project.slug} has an unsupported tier`)
    assert.ok(allowedStatuses.has(project.status), `${project.slug} has an unsupported status`)
    assert.notEqual(project.url, '#')
    assert.notEqual(project.sourceUrl, '#')
    assert.ok(project.url || project.sourceUrl, `${project.slug} must have a live or source destination`)
  }
})

test('featured project routes resolve to complete case studies', () => {
  for (const project of getFeatured()) {
    assert.equal(getBySlug(project.slug), project)
    for (const field of ['tagline', 'problem', 'solution', 'highlights', 'decisions', 'result', 'reflection']) {
      assert.ok(project[field], `${project.slug} must provide ${field}`)
    }

    if (project.architecture) {
      assert.ok(architectureIds.has(project.architecture.svg), `${project.slug} references an unknown diagram`)
    }
  }

  assert.equal(getBySlug('not-a-project'), undefined)
})

test('lab entries have unique slugs and valid optional destinations', () => {
  assert.equal(new Set(labProjects.map(({ slug }) => slug)).size, labProjects.length)
  for (const project of labProjects) {
    assert.ok(project.name)
    assert.ok(project.tagline)
    assert.ok(project.stack.length > 0)
    if (project.url) assert.match(project.url, /^https:\/\//)
  }
})

test('public metadata uses valid destinations', async () => {
  assert.match(meta.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  assert.match(meta.github, /^https:\/\/github\.com\//)
  assert.match(meta.linkedin, /^https:\/\/(?:www\.)?linkedin\.com\//)
  assert.equal(meta.resumePath, '/resume/')

  const resume = await readFile(new URL(`../public${meta.resumePath}index.html`, import.meta.url), 'utf8')
  assert.ok(resume.length > 0, 'published resume must not be empty')
  assert.match(resume, /<!doctype html>/i)
  assert.match(resume, /<h1>SUJETH A S<\/h1>/)
})

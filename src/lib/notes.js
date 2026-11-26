// Notes are Markdown files in /notes/<subject-folder>/<topic>.md, bundled at build time.
// Frontmatter (all optional): title, subject, order.
// Adding a note = add a .md file and push; Netlify rebuilds.

const files = import.meta.glob('/notes/**/*.md', { query: '?raw', import: 'default', eager: true })

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  if (!match) return { meta: {}, body: raw }
  const meta = {}
  for (const line of match[1].split(/\r?\n/)) {
    const i = line.indexOf(':')
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim()
  }
  return { meta, body: raw.slice(match[0].length) }
}

const titleCase = (s) => s.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

export const notes = Object.entries(files)
  .map(([path, raw]) => {
    const [, folder, file] = path.match(/^\/notes\/(?:(.+)\/)?([^/]+)\.md$/)
    const { meta, body } = parseFrontmatter(raw)
    const subjectSlug = folder || 'general'
    return {
      subjectSlug,
      slug: file,
      path: `/${subjectSlug}/${file}`,
      title: meta.title || titleCase(file),
      subject: meta.subject || titleCase(subjectSlug),
      order: Number(meta.order) || 999,
      body,
    }
  })
  .sort((a, b) => a.subject.localeCompare(b.subject) || a.order - b.order || a.title.localeCompare(b.title))

/** [{ subject, subjectSlug, notes: [...] }] in display order. */
export const subjects = Object.values(
  notes.reduce((acc, n) => {
    ;(acc[n.subjectSlug] ??= { subject: n.subject, subjectSlug: n.subjectSlug, notes: [] }).notes.push(n)
    return acc
  }, {}),
)

export function findNote(subjectSlug, slug) {
  return notes.find((n) => n.subjectSlug === subjectSlug && n.slug === slug)
}

export function searchNotes(query) {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return notes.filter((n) => `${n.title} ${n.subject} ${n.body}`.toLowerCase().includes(q))
}

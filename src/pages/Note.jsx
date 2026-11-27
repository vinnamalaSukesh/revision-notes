import { Link, useParams } from 'react-router-dom'

import Markdown from '../components/Markdown'
import { subjectColor } from '../lib/colors'
import { findNote, subjects } from '../lib/notes'

export default function Note() {
  const { subject, slug } = useParams()
  const note = findNote(subject, slug)

  if (!note) {
    return (
      <div className="space-y-3">
        <p>Note not found.</p>
        <Link to="/" className="text-indigo-600 underline dark:text-indigo-400">Back to all notes</Link>
      </div>
    )
  }

  const siblings = subjects.find((s) => s.subjectSlug === note.subjectSlug).notes
  const i = siblings.indexOf(note)
  const prev = siblings[i - 1]
  const next = siblings[i + 1]

  const color = subjectColor(subjects, note.subjectSlug)

  return (
    <article className="space-y-5">
      <div className="space-y-2">
        <Link to="/" className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${color.badge}`}>← {note.subject}</Link>
        <h1 className="bg-linear-to-r from-indigo-600 via-fuchsia-600 to-orange-500 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
          {note.title}
        </h1>
      </div>

      <Markdown>{note.body}</Markdown>

      {prev || next ? (
        <nav className="grid grid-cols-2 gap-3 border-t border-fuchsia-200 pt-5 dark:border-fuchsia-900">
          {prev ? (
            <Link to={prev.path} className="rounded-lg border border-stone-200 bg-white p-2.5 text-xs hover:border-fuchsia-400 dark:border-stone-800 dark:bg-stone-900">
              <span className="block text-stone-500">← Previous</span>
              {prev.title}
            </Link>
          ) : <span />}
          {next ? (
            <Link to={next.path} className="rounded-lg border border-stone-200 bg-white p-2.5 text-right text-xs hover:border-fuchsia-400 dark:border-stone-800 dark:bg-stone-900">
              <span className="block text-stone-500">Next →</span>
              {next.title}
            </Link>
          ) : null}
        </nav>
      ) : null}
    </article>
  )
}

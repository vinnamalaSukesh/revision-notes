import { Link, useParams } from 'react-router-dom'

import Markdown from '../components/Markdown'
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

  return (
    <article className="space-y-6">
      <div className="space-y-2">
        <Link to="/" className="text-sm text-stone-500 hover:text-indigo-600">← {note.subject}</Link>
        <h1 className="text-3xl font-bold tracking-tight">{note.title}</h1>
      </div>

      <Markdown>{note.body}</Markdown>

      {prev || next ? (
        <nav className="grid grid-cols-2 gap-3 border-t border-stone-200 pt-6 dark:border-stone-800">
          {prev ? (
            <Link to={prev.path} className="rounded-xl border border-stone-200 p-3 text-sm hover:border-indigo-400 dark:border-stone-800">
              <span className="block text-stone-500">← Previous</span>
              {prev.title}
            </Link>
          ) : <span />}
          {next ? (
            <Link to={next.path} className="rounded-xl border border-stone-200 p-3 text-right text-sm hover:border-indigo-400 dark:border-stone-800">
              <span className="block text-stone-500">Next →</span>
              {next.title}
            </Link>
          ) : null}
        </nav>
      ) : null}
    </article>
  )
}

import { useState } from 'react'
import { Link } from 'react-router-dom'

import { notes, searchNotes, subjects } from '../lib/notes'

function NoteLink({ note, showSubject }) {
  return (
    <Link
      to={note.path}
      className="flex items-center justify-between gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3 transition hover:border-indigo-400 hover:shadow-sm dark:border-stone-800 dark:bg-stone-900 dark:hover:border-indigo-500"
    >
      <span className="font-medium">{note.title}</span>
      {showSubject ? <span className="shrink-0 text-xs text-stone-500">{note.subject}</span> : <span className="text-stone-400">→</span>}
    </Link>
  )
}

export default function Home() {
  const [query, setQuery] = useState('')
  const results = searchNotes(query)

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">My notes</h1>
        <p className="text-sm text-stone-500">
          {notes.length} {notes.length === 1 ? 'topic' : 'topics'} across {subjects.length}{' '}
          {subjects.length === 1 ? 'subject' : 'subjects'}
        </p>
      </div>

      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search notes… e.g. reduce"
        className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-stone-700 dark:bg-stone-900"
      />

      {query.trim() ? (
        <section className="space-y-2">
          {results.length ? (
            results.map((n) => <NoteLink key={n.path} note={n} showSubject />)
          ) : (
            <p className="text-sm text-stone-500">No notes match “{query}”.</p>
          )}
        </section>
      ) : (
        subjects.map((s) => (
          <section key={s.subjectSlug} className="space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              {s.subject}
            </h2>
            <div className="space-y-2">
              {s.notes.map((n) => <NoteLink key={n.path} note={n} />)}
            </div>
          </section>
        ))
      )}
    </div>
  )
}

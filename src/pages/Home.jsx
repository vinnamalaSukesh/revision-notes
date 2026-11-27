import { useState } from 'react'
import { Link } from 'react-router-dom'

import { subjectColor } from '../lib/colors'
import { notes, searchNotes, subjects } from '../lib/notes'

function NoteLink({ note, showSubject }) {
  const color = subjectColor(subjects, note.subjectSlug)
  return (
    <Link
      to={note.path}
      className={`flex items-center justify-between gap-3 rounded-lg border border-l-4 border-stone-200 bg-white px-3 py-2.5 shadow-sm transition hover:shadow-md dark:border-stone-800 dark:bg-stone-900 ${color.card}`}
    >
      <span className="font-medium">{note.title}</span>
      {showSubject ? (
        <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${color.badge}`}>{note.subject}</span>
      ) : (
        <span className="text-stone-400">→</span>
      )}
    </Link>
  )
}

export default function Home() {
  const [query, setQuery] = useState('')
  const results = searchNotes(query)

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="bg-linear-to-r from-indigo-600 via-fuchsia-600 to-orange-500 bg-clip-text text-xl font-bold tracking-tight text-transparent sm:text-2xl">
          My notes
        </h1>
        <p className="text-xs text-stone-500">
          {notes.length} {notes.length === 1 ? 'topic' : 'topics'} across {subjects.length}{' '}
          {subjects.length === 1 ? 'subject' : 'subjects'}
        </p>
      </div>

      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search notes… e.g. reduce"
        className="w-full rounded-lg border border-fuchsia-200 bg-white px-3 py-2 outline-none focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20 dark:border-fuchsia-900 dark:bg-stone-900"
      />

      {query.trim() ? (
        <section className="space-y-2">
          {results.length ? (
            results.map((n) => <NoteLink key={n.path} note={n} showSubject />)
          ) : (
            <p className="text-xs text-stone-500">No notes match “{query}”.</p>
          )}
        </section>
      ) : (
        subjects.map((s) => (
          <section key={s.subjectSlug} className="space-y-2">
            <h2 className={`text-xs font-bold uppercase tracking-widest ${subjectColor(subjects, s.subjectSlug).heading}`}>
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

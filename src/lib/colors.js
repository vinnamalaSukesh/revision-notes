// One colour theme per subject, picked by the subject's position on the home page.
// Full class names are written out so Tailwind can find them.
const palette = [
  {
    heading: 'text-amber-600 dark:text-amber-400',
    card: 'border-l-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40',
    badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
  },
  {
    heading: 'text-sky-600 dark:text-sky-400',
    card: 'border-l-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/40',
    badge: 'bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300',
  },
  {
    heading: 'text-emerald-600 dark:text-emerald-400',
    card: 'border-l-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40',
    badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300',
  },
  {
    heading: 'text-rose-600 dark:text-rose-400',
    card: 'border-l-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40',
    badge: 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300',
  },
  {
    heading: 'text-violet-600 dark:text-violet-400',
    card: 'border-l-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/40',
    badge: 'bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300',
  },
]

export function subjectColor(subjects, subjectSlug) {
  const i = Math.max(0, subjects.findIndex((s) => s.subjectSlug === subjectSlug))
  return palette[i % palette.length]
}

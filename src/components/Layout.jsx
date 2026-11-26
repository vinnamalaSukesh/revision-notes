import { Link, Outlet, ScrollRestoration } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-100">
      <header className="sticky top-0 z-10 border-b border-stone-200 bg-stone-50/90 backdrop-blur dark:border-stone-800 dark:bg-stone-950/90">
        <div className="flex items-center gap-2 px-4 py-3 sm:px-8">
          <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-indigo-600 text-sm text-white">R</span>
            Revision Notes
          </Link>
        </div>
      </header>
      <main className="px-4 py-6 sm:px-8 sm:py-10">
        <Outlet />
      </main>
      <ScrollRestoration />
    </div>
  )
}

import { Link, Outlet, ScrollRestoration } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-pink-50 text-sm text-stone-800 dark:from-stone-950 dark:via-stone-950 dark:to-indigo-950 dark:text-stone-100">
      <header className="sticky top-0 z-10 bg-linear-to-r from-indigo-600 via-fuchsia-600 to-orange-500 text-white shadow-md">
        <div className="flex items-center gap-2 px-4 py-2.5 sm:px-8">
          <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="grid h-6 w-6 place-items-center rounded-md bg-white text-xs font-bold text-fuchsia-600">R</span>
            Revision Notes
          </Link>
        </div>
      </header>
      <main className="px-4 py-5 sm:px-8 sm:py-8">
        <Outlet />
      </main>
      <ScrollRestoration />
    </div>
  )
}

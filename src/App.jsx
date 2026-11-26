import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Layout from './components/Layout'
import Home from './pages/Home'
import Note from './pages/Note'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/:subject/:slug', element: <Note /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}

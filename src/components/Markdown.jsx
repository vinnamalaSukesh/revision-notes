import 'highlight.js/styles/github-dark.css'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'

// Wide tables scroll sideways on phones instead of breaking the page width.
const components = {
  table: ({ node: _node, ...props }) => (
    <div className="not-prose my-4 overflow-x-auto rounded-xl border border-indigo-200 dark:border-indigo-900">
      <table className="w-full border-collapse text-left text-xs [&_td]:border-t [&_td]:border-indigo-100 [&_td]:px-3 [&_td]:py-1.5 [&_td]:align-top dark:[&_td]:border-indigo-950 [&_th]:bg-indigo-100 [&_th]:px-3 [&_th]:py-1.5 [&_th]:font-semibold [&_th]:text-indigo-800 dark:[&_th]:bg-indigo-950 dark:[&_th]:text-indigo-200" {...props} />
    </div>
  ),
}

export default function Markdown({ children }) {
  return (
    <div className="prose prose-sm prose-stone max-w-none dark:prose-invert prose-headings:tracking-tight prose-h2:mt-8 prose-h2:border-b prose-h2:border-fuchsia-200 prose-h2:pb-1.5 prose-h2:text-fuchsia-600 dark:prose-h2:border-fuchsia-900 dark:prose-h2:text-fuchsia-400 prose-strong:text-indigo-600 dark:prose-strong:text-indigo-300 prose-blockquote:border-indigo-400 prose-blockquote:not-italic prose-code:before:content-none prose-code:after:content-none prose-pre:rounded-xl prose-pre:bg-[#0d1117] prose-pre:text-xs prose-pre:shadow-md [&_:not(pre)>code]:rounded [&_:not(pre)>code]:bg-pink-100 [&_:not(pre)>code]:px-1 [&_:not(pre)>code]:py-0.5 [&_:not(pre)>code]:font-medium [&_:not(pre)>code]:text-pink-700 dark:[&_:not(pre)>code]:bg-pink-950 dark:[&_:not(pre)>code]:text-pink-300 [&_li::marker]:text-fuchsia-500">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  )
}

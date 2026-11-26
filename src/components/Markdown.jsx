import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

// Wide tables scroll sideways on phones instead of breaking the page width.
const components = {
  table: ({ node: _node, ...props }) => (
    <div className="not-prose my-5 overflow-x-auto rounded-xl border border-stone-200 dark:border-stone-800">
      <table className="w-full border-collapse text-left text-sm [&_td]:border-t [&_td]:border-stone-200 [&_td]:px-3 [&_td]:py-2 [&_td]:align-top dark:[&_td]:border-stone-800 [&_th]:bg-stone-100 [&_th]:px-3 [&_th]:py-2 [&_th]:font-semibold dark:[&_th]:bg-stone-900" {...props} />
    </div>
  ),
}

export default function Markdown({ children }) {
  return (
    <div className="prose prose-stone max-w-none dark:prose-invert prose-headings:tracking-tight prose-h2:mt-10 prose-h2:border-b prose-h2:border-stone-200 prose-h2:pb-2 dark:prose-h2:border-stone-800 prose-blockquote:border-indigo-400 prose-blockquote:not-italic prose-code:before:content-none prose-code:after:content-none prose-pre:bg-stone-900 prose-pre:text-stone-100">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  )
}

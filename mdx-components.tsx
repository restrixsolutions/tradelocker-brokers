import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mb-8 mt-12 text-balance text-foreground">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mb-6 mt-10 text-foreground">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold mb-4 mt-8 text-foreground">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-semibold mb-3 mt-6 text-foreground">{children}</h4>
    ),
    p: ({ children }) => (
      <p className="text-base text-muted-foreground mb-6 leading-relaxed">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-6 space-y-3 text-muted-foreground ml-4">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-6 space-y-3 text-muted-foreground ml-4">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="mb-2">{children}</li>
    ),
    a: ({ href, children }) => (
      <Link href={href as string} className="text-accent hover:underline font-medium">
        {children}
      </Link>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-accent pl-6 py-4 italic my-6 text-muted-foreground bg-accent/5 rounded-r-lg">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="bg-accent/10 px-2 py-1 rounded text-sm font-mono text-foreground">{children}</code>
    ),
    pre: ({ children }) => (
      <pre className="bg-card border border-border rounded-lg p-6 overflow-x-auto mb-6 text-sm">
        {children}
      </pre>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-muted-foreground">{children}</em>
    ),
    hr: () => (
      <hr className="my-8 border-border" />
    ),
    ...components,
  }
}


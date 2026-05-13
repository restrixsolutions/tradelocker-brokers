import { BrokerCtaBanner } from "@/components/broker-cta-banner"

// Simple markdown parser for blog content
export function parseMarkdown(content: string): JSX.Element {
  const lines = content.split('\n')
  const elements: JSX.Element[] = []
  let currentIndex = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Skip empty lines
    if (line.trim() === '') {
      continue
    }

    // Inline component: <BrokerCtaBanner brokerName="..." affiliateLink="..." highlight="..." />
    // Supports the tag spanning multiple lines until the self-closing "/>"
    const trimmed = line.trim()
    if (trimmed.startsWith('<BrokerCtaBanner')) {
      let buffer = trimmed
      let j = i
      while (!buffer.includes('/>') && j + 1 < lines.length) {
        j += 1
        buffer += ' ' + lines[j].trim()
      }
      const attrs = parseJsxAttrs(buffer)
      if (attrs.brokerName && attrs.affiliateLink) {
        elements.push(
          <BrokerCtaBanner
            key={currentIndex++}
            brokerName={attrs.brokerName}
            affiliateLink={attrs.affiliateLink}
            highlight={attrs.highlight}
          />
        )
        i = j
        continue
      }
    }

    // Markdown table: header row, separator row (|---|---|), then body rows
    if (line.trim().startsWith('|') && i + 1 < lines.length && /^\s*\|?\s*:?-{2,}/.test(lines[i + 1].replace(/\|/g, ' '))) {
      const headerCells = splitTableRow(line)
      const bodyRows: string[][] = []
      let j = i + 2
      while (j < lines.length && lines[j].trim().startsWith('|')) {
        bodyRows.push(splitTableRow(lines[j]))
        j++
      }
      elements.push(
        <div key={currentIndex++} className="my-6 overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/40">
              <tr>
                {headerCells.map((cell, idx) => (
                  <th key={idx} className="px-4 py-3 text-left font-semibold text-foreground border-b border-border">
                    {parseInlineMarkdown(cell)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row, rIdx) => (
                <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-background' : 'bg-muted/20'}>
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-4 py-3 text-muted-foreground border-b border-border/50 align-top">
                      {parseInlineMarkdown(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
      i = j - 1
      continue
    }

    // Blockquote: one or more consecutive lines starting with "> "
    if (line.trim().startsWith('>')) {
      const quoteLines: string[] = [line.replace(/^\s*>\s?/, '')]
      let j = i + 1
      while (j < lines.length && lines[j].trim().startsWith('>')) {
        quoteLines.push(lines[j].replace(/^\s*>\s?/, ''))
        j++
      }
      elements.push(
        <blockquote
          key={currentIndex++}
          className="my-6 border-l-4 border-accent bg-accent/5 px-5 py-4 rounded-r-lg"
        >
          {quoteLines
            .filter((l) => l.trim() !== '')
            .map((l, idx) => (
              <p key={idx} className="text-base text-foreground/90 leading-relaxed mb-2 last:mb-0">
                {parseInlineMarkdown(l)}
              </p>
            ))}
        </blockquote>
      )
      i = j - 1
      continue
    }

    // Headers
    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={currentIndex++} className="text-2xl font-semibold mb-4 mt-8 text-foreground">
          {line.replace('### ', '')}
        </h3>
      )
    } else if (line.startsWith('## ')) {
      elements.push(
        <h2 key={currentIndex++} className="text-3xl font-bold mb-6 mt-10 text-foreground">
          {line.replace('## ', '')}
        </h2>
      )
    } else if (line.startsWith('# ')) {
      elements.push(
        <h1 key={currentIndex++} className="text-4xl font-bold mb-8 mt-12 text-balance text-foreground">
          {line.replace('# ', '')}
        </h1>
      )
    }
    // Bullet points
    else if (line.startsWith('- ')) {
      const text = line.replace('- ', '')
      elements.push(
        <div key={currentIndex++} className="flex items-start mb-2">
          <span className="text-accent mr-3 mt-1">•</span>
          <span className="text-muted-foreground">{parseInlineMarkdown(text)}</span>
        </div>
      )
    }
    // Numbered lists
    else if (/^\d+\.\s/.test(line)) {
      const text = line.replace(/^\d+\.\s/, '')
      elements.push(
        <div key={currentIndex++} className="flex items-start mb-2">
          <span className="text-accent mr-3 mt-1 font-semibold">{line.match(/^\d+/)?.[0]}.</span>
          <span className="text-muted-foreground">{parseInlineMarkdown(text)}</span>
        </div>
      )
    }
    // Regular paragraphs
    else {
      elements.push(
        <p key={currentIndex++} className="text-base text-muted-foreground mb-6 leading-relaxed">
          {parseInlineMarkdown(line)}
        </p>
      )
    }
  }

  return <div className="space-y-4">{elements}</div>
}

function parseInlineMarkdown(text: string): JSX.Element {
  // Handle bold text
  const boldRegex = /\*\*(.*?)\*\*/g
  const parts: (string | JSX.Element)[] = []
  let lastIndex = 0
  let match

  while ((match = boldRegex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    
    // Add bold text
    parts.push(
      <strong key={match.index} className="font-semibold text-foreground">
        {match[1]}
      </strong>
    )
    
    lastIndex = match.index + match[0].length
  }
  
  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }
  
  // Handle links
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  const finalParts: (string | JSX.Element)[] = []
  let linkLastIndex = 0
  
  parts.forEach((part, index) => {
    if (typeof part === 'string') {
      let linkMatch
      while ((linkMatch = linkRegex.exec(part)) !== null) {
        // Add text before the link
        if (linkMatch.index > linkLastIndex) {
          finalParts.push(part.slice(linkLastIndex, linkMatch.index))
        }
        
        // Add link
        finalParts.push(
          <a 
            key={`${index}-${linkMatch.index}`}
            href={linkMatch[2]} 
            className="text-accent hover:underline font-medium"
          >
            {linkMatch[1]}
          </a>
        )
        
        linkLastIndex = linkMatch.index + linkMatch[0].length
      }
      
      // Add remaining text
      if (linkLastIndex < part.length) {
        finalParts.push(part.slice(linkLastIndex))
      }
      
      linkLastIndex = 0
    } else {
      finalParts.push(part)
    }
  })
  
  return <>{finalParts}</>
}

// Splits a markdown table row like "| a | b | c |" into ["a", "b", "c"]
function splitTableRow(line: string): string[] {
  const trimmed = line.trim().replace(/^\|/, '').replace(/\|$/, '')
  return trimmed.split('|').map((cell) => cell.trim())
}

// Parses JSX-like attributes from a string such as:
// '<BrokerCtaBanner brokerName="RestroFX" affiliateLink="https://..." highlight="..." />'
function parseJsxAttrs(input: string): Record<string, string> {
  const attrs: Record<string, string> = {}
  const regex = /(\w+)\s*=\s*"([^"]*)"/g
  let m
  while ((m = regex.exec(input)) !== null) {
    attrs[m[1]] = m[2]
  }
  return attrs
}

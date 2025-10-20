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

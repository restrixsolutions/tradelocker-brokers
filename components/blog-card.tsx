import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar } from "lucide-react"
import { formatDate } from "@/lib/blog-utils"
import type { BlogPost } from "@/lib/blog-utils"

interface BlogCardProps {
  post: BlogPost
  layout?: "grid" | "list"
}

export function BlogCard({ post, layout = "grid" }: BlogCardProps) {
  if (layout === "list") {
    return (
      <Link href={`/blog/${post.slug}`} className="group">
        <Card className="hover:border-accent/50 transition-all duration-300 hover:shadow-lg">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary">{post.category}</Badge>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(post.publishDate)}
                  </span>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime} min read
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground line-clamp-2">{post.description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {post.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    )
  }

  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <Card className="h-full hover:border-accent/50 transition-all duration-300 hover:shadow-lg overflow-hidden">
        {post.ogImage && (
          <div className="w-full h-48 bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
            {/* Placeholder for OG image - will be replaced with actual image */}
            <div className="text-4xl font-bold text-accent/30">{post.category}</div>
          </div>
        )}
        
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary">{post.category}</Badge>
            {post.featured && (
              <Badge className="bg-accent text-accent-foreground">Featured</Badge>
            )}
          </div>
          <CardTitle className="group-hover:text-accent transition-colors line-clamp-2">
            {post.title}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <CardDescription className="line-clamp-3 mb-4">{post.description}</CardDescription>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(post.publishDate)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readTime} min
            </span>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}


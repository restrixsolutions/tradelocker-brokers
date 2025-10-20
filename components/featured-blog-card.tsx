import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, ArrowRight } from "lucide-react"
import { formatDate } from "@/lib/blog-utils"
import type { BlogPost } from "@/lib/blog-utils"
import { Button } from "@/components/ui/button"

interface FeaturedBlogCardProps {
  post: BlogPost
}

export function FeaturedBlogCard({ post }: FeaturedBlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <Card className="overflow-hidden hover:border-accent/50 transition-all duration-300 hover:shadow-2xl">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="h-full min-h-[300px] bg-gradient-to-br from-accent/20 via-accent/10 to-background flex items-center justify-center p-8">
            <div className="text-center">
              <Badge className="mb-4 text-lg px-4 py-2">Featured Article</Badge>
              <div className="text-6xl font-bold text-accent/30">{post.category}</div>
            </div>
          </div>

          {/* Content Section */}
          <CardContent className="flex flex-col justify-center p-8 md:p-12">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="text-sm">
                {post.category}
              </Badge>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(post.publishDate)}
              </span>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readTime} min read
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-accent transition-colors">
              {post.title}
            </h2>

            <p className="text-lg text-muted-foreground mb-6 line-clamp-3">
              {post.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.slice(0, 4).map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>

            <Button className="w-fit group-hover:bg-accent/90 transition-colors">
              Read Full Article
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardContent>
        </div>
      </Card>
    </Link>
  )
}


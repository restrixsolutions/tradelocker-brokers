import { Star } from "lucide-react"

interface StarRatingProps {
  rating: number
  size?: "sm" | "md"
  showValue?: boolean
  className?: string
}

export function StarRating({ rating, size = "sm", showValue = false, className = "" }: StarRatingProps) {
  const dim = size === "md" ? "h-4 w-4" : "h-3.5 w-3.5"
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex items-center">
        {[0, 1, 2, 3, 4].map((i) => {
          const fill = Math.max(0, Math.min(1, rating - i))
          return (
            <span key={i} className="relative inline-block">
              <Star className={`${dim} text-muted-foreground/30`} />
              <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <Star className={`${dim} text-amber-400 fill-amber-400`} />
              </span>
            </span>
          )
        })}
      </div>
      {showValue && <span className="text-xs font-semibold text-muted-foreground ml-1">{rating.toFixed(1)}</span>}
    </div>
  )
}

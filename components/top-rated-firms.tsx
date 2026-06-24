import Image from "next/image"
import { Award, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StarRating } from "@/components/star-rating"
import { getRating } from "@/lib/ratings"
import type { Broker, PropFirm } from "@/lib/types"

type Brand = Broker | PropFirm

interface TopRatedFirmsProps {
  brands: Brand[]
  type: "broker" | "prop-firm"
  heading?: string
}

const medalColors = ["text-amber-400", "text-slate-400", "text-orange-400"]

export function TopRatedFirms({ brands, type, heading }: TopRatedFirmsProps) {
  const top = [...brands]
    .sort((a, b) => getRating(b, type) - getRating(a, type))
    .slice(0, 3)

  if (top.length === 0) return null

  const label = type === "broker" ? "Brokers" : "Firms"

  return (
    <section className="py-16">
      <div className="mb-3 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          Top Rated <span className="text-emerald-500">{heading || label}</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Our highest-rated {type === "broker" ? "brokers" : "prop firms"} based on regulation, trading conditions, and
          overall reliability.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {top.map((brand, i) => {
          const rating = getRating(brand, type)
          return (
            <div
              key={brand.id}
              className="relative flex flex-col items-center rounded-2xl border border-border/60 bg-card p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-lg"
            >
              <div className="absolute right-4 top-4">
                <Award className={`h-7 w-7 ${medalColors[i]}`} />
              </div>

              <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl border border-border bg-background">
                <Image
                  src={brand.logo || "/placeholder.svg"}
                  alt={brand.name}
                  width={64}
                  height={64}
                  className="object-contain p-2"
                />
              </div>

              <h3 className="mt-4 text-xl font-bold">{brand.name}</h3>

              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {brand.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-2">
                <StarRating rating={rating} size="md" />
                <span className="text-sm font-bold">{rating.toFixed(1)}/5</span>
              </div>

              <Button
                className="mt-5 w-full gap-2 bg-emerald-500 text-white hover:bg-emerald-600"
                asChild
              >
                <a href={brand.affiliate_link} target="_blank" rel="noopener noreferrer">
                  Get Started
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          )
        })}
      </div>
    </section>
  )
}

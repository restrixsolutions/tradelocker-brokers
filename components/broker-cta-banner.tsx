import Link from "next/link"
import { Button } from "@/components/ui/button"

interface BrokerCtaBannerProps {
  brokerName: string
  affiliateLink: string
  highlight?: string
}

export function BrokerCtaBanner({ 
  brokerName, 
  affiliateLink, 
  highlight 
}: BrokerCtaBannerProps) {
  return (
    <div className="my-8 rounded-lg border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 p-6 shadow-lg">
      <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex-1 space-y-2">
          <h3 className="text-2xl font-bold text-foreground">
            Ready to Trade with {brokerName}?
          </h3>
          {highlight && (
            <p className="text-lg text-muted-foreground">{highlight}</p>
          )}
          <p className="text-sm text-muted-foreground">
            Get started with {brokerName} today and access professional trading conditions.
          </p>
        </div>
        <div className="flex gap-3">
          <Button 
            asChild 
            size="lg"
            className="bg-primary px-8 py-6 text-lg font-semibold shadow-lg hover:bg-primary/90"
          >
            <Link 
              href={affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Account →
            </Link>
          </Button>
          <Button 
            asChild 
            variant="outline"
            size="lg"
            className="border-2 px-8 py-6 text-lg font-semibold"
          >
            <Link href="/brokers">
              Compare Brokers
            </Link>
          </Button>
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-muted-foreground">
        *This is an affiliate link. We may receive compensation if you open an account.
      </p>
    </div>
  )
}


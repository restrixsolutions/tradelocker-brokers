import { Container } from "@/components/container"
import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border py-8 md:py-12">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8 px-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-3 md:mb-4">
              <Image
                src="/tradelocker-logo.png"
                alt="TradeLocker"
                width={480}
                height={400}
                className="h-16 md:h-20 w-auto"
              />
            </div>
            <p className="text-xs md:text-sm text-muted-foreground">
              Your trusted source for TradeLocker-compatible brokers and prop firms. Compare, analyze, and choose the
              best platform for your trading journey.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Quick Links</h4>
            <ul className="space-y-2 text-xs md:text-sm">
              <li>
                <Link href="/brokers" className="text-muted-foreground hover:text-accent transition-colors">
                  Brokers
                </Link>
              </li>
              <li>
                <Link href="/prop-firms" className="text-muted-foreground hover:text-accent transition-colors">
                  Prop Firms
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-accent transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/how-to-use" className="text-muted-foreground hover:text-accent transition-colors">
                  How to Use
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Company</h4>
            <ul className="space-y-2 text-xs md:text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-accent transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/data" className="text-muted-foreground hover:text-accent transition-colors">
                  Data & Feeds
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-muted-foreground hover:text-accent transition-colors">
                  Press Kit
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-6 md:mt-8 px-4">
          <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Disclaimer</h4>
          <p className="text-xs text-muted-foreground">
            Trading forex and CFDs involves significant risk. This website provides information for educational
            purposes only. Always conduct your own research before trading.
          </p>
        </div>
        <div className="pt-6 md:pt-8 border-t border-border text-center text-xs md:text-sm text-muted-foreground px-4">
          <p>&copy; 2025 TradeLockerBrokers.com. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  )
}

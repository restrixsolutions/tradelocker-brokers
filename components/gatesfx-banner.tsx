"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface GatesFXData {
  name: string
  logo: string
  affiliate_link: string
}

interface GatesFXBannerProps {
  gatesfx: GatesFXData
}

export function GatesFXBanner({ gatesfx }: GatesFXBannerProps) {
  return (
    <div className="w-full mb-6 md:mb-8">
      {/* Gradient banner with rounded corners */}
      <div className="relative overflow-hidden rounded-xl md:rounded-2xl bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500 p-4 md:p-6 lg:p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          {/* Left side: Icon and Text */}
          <div className="flex items-center gap-3 md:gap-6 flex-1 w-full md:w-auto">
            {/* GatesFX Logo from Supabase */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-xl md:rounded-2xl overflow-hidden border-2 border-white">
                <Image
                  src={gatesfx.logo}
                  alt={gatesfx.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-white mb-1 md:mb-2 leading-tight">
                Stop Paying High Fees
              </h3>
              <p className="text-white text-xs md:text-sm lg:text-base opacity-90 leading-snug md:leading-relaxed">
                Get lower spreads + 100% bonus at GatesFX. Exclusive deal.
              </p>
            </div>
          </div>

          {/* Right side: CTA Button */}
          <div className="flex-shrink-0 w-full md:w-auto">
            <Button 
              asChild 
              className="bg-white text-purple-600 hover:bg-gray-100 rounded-full w-full md:w-auto px-4 md:px-6 py-3 md:py-4 lg:py-6 text-sm md:text-base font-semibold h-auto"
            >
              <Link href={gatesfx.affiliate_link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                Claim Your Bonus
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

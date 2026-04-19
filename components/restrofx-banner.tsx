"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface RestroFXBannerData {
  name: string
  logo: string
  affiliate_link: string
}

interface RestroFXBannerProps {
  broker: RestroFXBannerData
}

export function RestroFXBanner({ broker }: RestroFXBannerProps) {
  const href = "https://portal.restrofx.com/r/0Osaul1w"

  return (
    <div className="w-full mb-6 md:mb-8">
      <div className="relative overflow-hidden rounded-xl md:rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950 to-teal-900 p-4 md:p-6 lg:p-8 border border-emerald-500/20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          <div className="flex items-center gap-3 md:gap-6 flex-1 w-full md:w-auto">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-xl md:rounded-2xl overflow-hidden border-2 border-white/90 bg-white">
                <Image
                  src={broker.logo}
                  alt={broker.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-contain p-1"
                />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-white mb-1 md:mb-2 leading-tight">
                ECN from $25 · Leverage 1:500 up to 1:1000
              </h3>
              <p className="text-white text-xs md:text-sm lg:text-base opacity-90 leading-snug md:leading-relaxed">
                Three RestroFX account paths: ECN/Standard (Default & VIP markups on majors + $4 RT) and RAW ($18 RT,
                $500 min). Dynamic LP pricing — you always see feed + markup.
              </p>
            </div>
          </div>

          <div className="flex-shrink-0 w-full md:w-auto">
            <Button
              asChild
              className="bg-emerald-400 text-slate-950 hover:bg-emerald-300 rounded-full w-full md:w-auto px-4 md:px-6 py-3 md:py-4 lg:py-6 text-sm md:text-base font-semibold h-auto"
            >
              <Link href={href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                Open RestroFX
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

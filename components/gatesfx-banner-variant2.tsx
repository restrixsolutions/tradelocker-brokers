"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function GatesFXBannerVariant2() {
  return (
    <div className="w-full mb-8">
      {/* Dark banner with blue accents */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-blue-500/20 p-6 md:p-8">
        {/* Accent glow effect */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left side: Logo and Text */}
          <div className="flex items-center gap-6 flex-1">
            {/* GatesFX Logo */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white p-3 flex items-center justify-center shadow-lg">
                <Image
                  src="/images/logos/gatesfx.png"
                  alt="GatesFX Logo"
                  width={80}
                  height={80}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-blue-400" />
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  Analyze Your Trades
                </h3>
              </div>
              <p className="text-gray-300 text-sm md:text-base">
                Get instant analysis of your trading performance with GatesFX
              </p>
            </div>
          </div>

          {/* Right side: CTA Button */}
          <div className="flex-shrink-0">
            <Button 
              asChild 
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-6 text-base font-semibold h-auto shadow-lg"
            >
              <Link href="https://secure.gatesfx.com/links/go/1080" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                Sign Up Now
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

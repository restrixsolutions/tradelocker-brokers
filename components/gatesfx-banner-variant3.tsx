"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function GatesFXBannerVariant3() {
  return (
    <div className="w-full mb-8">
      {/* Minimal banner with dark theme */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 p-6 border border-slate-700">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left side: Logo and Text */}
          <div className="flex items-center gap-4 flex-1">
            {/* GatesFX Logo */}
            <div className="flex-shrink-0">
              <Image
                src="/images/logos/gatesfx.png"
                alt="GatesFX Logo"
                width={60}
                height={60}
                className="rounded-lg"
              />
            </div>

            {/* Text Content */}
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  Analyze Your Trades
                </h3>
                <Badge variant="secondary" className="bg-blue-600 text-white">
                  Get Started
                </Badge>
              </div>
              <p className="text-gray-400 text-sm mt-1">
                Get instant trading analysis with GatesFX
              </p>
            </div>
          </div>

          {/* Right side: CTA Button */}
          <div className="flex-shrink-0">
            <Button 
              asChild 
              variant="outline"
              className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white rounded-full px-6 py-6 text-base font-medium h-auto"
            >
              <Link href="https://gatesfx.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                Learn More
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

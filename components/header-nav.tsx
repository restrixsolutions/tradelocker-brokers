"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ArrowRight, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function HeaderNav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/brokers", label: "Brokers" },
    { href: "/prop-firms", label: "Prop Firms" },
    { href: "/blog", label: "Blog" },
    { href: "/how-to-use", label: "How To Use TradeLocker" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-lg border-b border-border shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Left side: Logo + Desktop Navigation */}
          <div className="flex items-center gap-6 md:gap-12">
            <Link href="/" className="flex items-center flex-shrink-0">
              <Image
                src="/tradelocker-logo.png"
                alt="TradeLocker"
                width={180}
                height={40}
                className="h-7 md:h-10 w-auto"
                priority
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right side: CTA Button + Mobile Menu */}
          <div className="flex items-center gap-2 md:gap-4">
            <Button asChild className="relative overflow-hidden bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold px-3 md:px-6 text-xs md:text-sm before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-600 before:via-blue-500 before:to-cyan-500 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 animate-gradient bg-[length:200%_200%]">
              <a href="https://www.forexproprank.com/prop-firm-ready" target="_blank" rel="noopener noreferrer">
                <span className="relative z-10 hidden sm:inline">PROP FIRM READY READER</span>
                <span className="relative z-10 sm:hidden">READER</span>
                <ArrowRight className="relative z-10 ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" />
              </a>
            </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[350px] p-6">
                <div className="flex flex-col gap-6 mt-8">
                  <Link href="/" onClick={() => setIsOpen(false)}>
                    <Image
                      src="/tradelocker-logo.png"
                      alt="TradeLocker"
                      width={180}
                      height={40}
                      className="h-8 w-auto mb-4"
                    />
                  </Link>
                  <nav className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="text-lg font-medium text-foreground hover:text-accent transition-colors py-2 border-b border-border"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                  <Button
                    asChild
                    className="relative overflow-hidden bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white hover:shadow-lg transition-all duration-300 font-semibold w-full mt-4 before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-600 before:via-blue-500 before:to-cyan-500 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 animate-gradient bg-[length:200%_200%]"
                  >
                    <a 
                      href="https://www.forexproprank.com/prop-firm-ready" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="relative z-10">PROP FIRM READY READER</span>
                      <ArrowRight className="relative z-10 ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

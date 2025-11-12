import type { Metadata } from "next"
import { HeaderNav } from "@/components/header-nav"
import { Container } from "@/components/container"
import { Section } from "@/components/section"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Calendar, Monitor } from "lucide-react"
import Link from "next/link"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import Image from "next/image"

export const metadata: Metadata = {
  title: "TradeLocker Providers - Financial Services Offering TradeLocker Platform",
  description:
    "Directory of financial service providers offering TradeLocker platform access. View companies that have integrated TradeLocker, their locations, and platform offerings.",
  keywords: ["TradeLocker providers", "TradeLocker access", "financial service providers", "TradeLocker directory", "platform providers"],
  openGraph: {
    title: "TradeLocker Providers Directory",
    description: "Financial service providers offering TradeLocker platform access.",
    type: "website",
    url: "https://tradelockerbrokers.com/providers",
  },
  alternates: {
    canonical: "https://tradelockerbrokers.com/providers",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function ProvidersPage() {
  const supabase = await getSupabaseServerClient()

  // Fetch providers from database
  const { data: providers } = await supabase
    .from("brokers")
    .select("id, name, logo, country_established, year_established, description")
    .order("name", { ascending: true })
    .limit(12)

  const providersData = providers || []

  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeaderNav />

      {/* Hero Section */}
      <Section className="pt-32 pb-12">
        <Container>
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              TradeLocker Provider Directory
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Financial service providers that have integrated TradeLocker platform. 
              This directory provides factual information about companies offering TradeLocker access.
            </p>
            <div className="bg-muted/50 border border-border rounded-lg p-6 text-left max-w-2xl mx-auto">
              <p className="text-sm text-muted-foreground">
                <strong>Note:</strong> This is an informational directory only. Each provider independently 
                configures TradeLocker with different features, instruments, account requirements, and terms. 
                We recommend researching each provider's specific offerings and regulations.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Providers List Section */}
      <Section className="py-12">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Companies Offering TradeLocker
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
            {providersData.map((provider) => (
              <Link key={provider.id} href="/brokers" className="block group">
                <Card className="h-full hover:shadow-xl hover:border-accent/50 transition-all duration-300 cursor-pointer">
                  <CardContent className="pt-6 h-full flex flex-col">
                    {/* Logo */}
                    <div className="w-full h-20 mb-4 flex items-center justify-center bg-background rounded-lg border border-border group-hover:border-accent/30 transition-colors">
                      <Image
                        src={provider.logo || "/placeholder.svg"}
                        alt={`${provider.name} logo`}
                        width={100}
                        height={50}
                        className="object-contain"
                      />
                    </div>
                    
                    {/* Provider Name */}
                    <h3 className="text-xl font-semibold mb-4 text-center group-hover:text-accent transition-colors">{provider.name}</h3>
                    
                    {/* Factual Information Only */}
                    <div className="space-y-3 text-sm text-muted-foreground flex-grow">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium text-foreground">Location:</span>
                          <br />
                          {provider.country_established}
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <Calendar className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium text-foreground">Established:</span>
                          <br />
                          {provider.year_established}
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <Monitor className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium text-foreground">Platform:</span>
                          <br />
                          TradeLocker
                        </div>
                      </div>
                    </div>
                    
                    {/* Description if available */}
                    {provider.description && (
                      <p className="text-sm text-muted-foreground mt-4 line-clamp-3">
                        {provider.description}
                      </p>
                    )}
                    
                    {/* Visual indicator it's clickable */}
                    <div className="mt-4 pt-4 border-t border-border flex items-center justify-center text-sm text-muted-foreground group-hover:text-accent transition-colors">
                      <span>View Details</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* CTA to Full Comparison */}
          <div className="text-center">
            <Card className="max-w-3xl mx-auto border-accent/30 bg-gradient-to-br from-accent/5 to-background">
              <CardContent className="pt-8 pb-8">
                <h3 className="text-2xl font-semibold mb-4">Need More Details?</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  View our comprehensive comparison tool to see detailed information about each provider's 
                  features, account requirements, platform offerings, and access options.
                </p>
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold" asChild>
                  <Link href="/brokers">
                    View Detailed Comparison
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* How to Choose Section */}
      <Section className="py-10 bg-muted/30">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            How to Choose a TradeLocker Provider
          </h2>
          <div className="max-w-4xl mx-auto space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">1. Verify Regulation</h3>
                <p className="text-muted-foreground">
                  Check that the provider is properly regulated by a recognized financial authority in their 
                  jurisdiction. Regulatory status ensures client fund protection and operational standards.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">2. Review Account Requirements</h3>
                <p className="text-muted-foreground">
                  Different providers have varying minimum deposit requirements, account types, and eligibility 
                  criteria. Ensure their requirements align with your situation.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">3. Check Platform Configuration</h3>
                <p className="text-muted-foreground">
                  While all these providers use TradeLocker, each may configure it differently with varying 
                  available instruments, features, and access levels.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">4. Understand Terms & Conditions</h3>
                <p className="text-muted-foreground">
                  Review each provider's specific terms, fee structures, withdrawal policies, and operational 
                  procedures before making a decision.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">5. Compare Features & Services</h3>
                <p className="text-muted-foreground">
                  Use detailed comparison tools to evaluate differences in offerings, support, and additional 
                  services provided by each company.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">
              Ready to compare providers in detail?
            </p>
            <Button size="lg" variant="outline" asChild>
              <Link href="/brokers">
                Access Comparison Tool
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section className="py-10">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Common Questions</h2>
          <div className="max-w-4xl mx-auto space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">How is this list compiled?</h3>
                <p className="text-muted-foreground">
                  This directory includes financial service providers that have publicly integrated TradeLocker 
                  platform. Information is sourced from company websites, regulatory filings, and official 
                  announcements.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">Are all these providers available in my country?</h3>
                <p className="text-muted-foreground">
                  Provider availability varies by jurisdiction due to regulatory requirements. Each company 
                  operates under specific licenses that may restrict service to certain countries. Check with 
                  individual providers for availability in your location.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">Do all providers offer the same TradeLocker experience?</h3>
                <p className="text-muted-foreground">
                  While the core TradeLocker platform is consistent, each provider configures it according to 
                  their business model. This means available instruments, features, account types, and access 
                  levels may differ between providers.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">How can I compare these providers?</h3>
                <p className="text-muted-foreground mb-4">
                  We offer a detailed comparison tool that shows features, requirements, and specifications 
                  side-by-side for easier evaluation.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/brokers">
                    Use Comparison Tool
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">Is this a complete list?</h3>
                <p className="text-muted-foreground">
                  This directory includes known providers that have publicly integrated TradeLocker. New 
                  providers may be added as they launch or announce TradeLocker integration. The list is 
                  updated regularly.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section className="py-10 bg-gradient-to-br from-accent/10 via-background to-background">
        <Container>
          <Card className="border-accent/30 max-w-3xl mx-auto">
            <CardContent className="pt-8 pb-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Learn More?</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Explore detailed information about TradeLocker platform capabilities and access our 
                comprehensive provider comparison tool.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold" asChild>
                  <Link href="/brokers">
                    Compare Providers
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/platform">
                    Learn About Platform
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </Container>
      </Section>

      <Footer />
    </div>
  )
}


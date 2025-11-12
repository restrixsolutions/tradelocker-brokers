import type { Metadata } from "next"
import { HeaderNav } from "@/components/header-nav"
import { Container } from "@/components/container"
import { Section } from "@/components/section"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Monitor, Smartphone, Zap, BarChart3, Shield, Globe } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export const metadata: Metadata = {
  title: "TradeLocker Platform - Modern Browser-Based Trading Software",
  description:
    "Learn about TradeLocker, the modern browser-based trading platform. Explore features, technical specifications, and how this software works. Compatible with desktop, mobile, and tablet devices.",
  keywords: ["TradeLocker platform", "trading software", "browser-based platform", "trading technology", "charting software", "financial software"],
  openGraph: {
    title: "TradeLocker Platform - Modern Trading Software",
    description: "Discover TradeLocker's browser-based trading platform technology and features.",
    type: "website",
    url: "https://tradelockerbrokers.com/platform",
  },
  alternates: {
    canonical: "https://tradelockerbrokers.com/platform",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function PlatformPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeaderNav />

      {/* Hero Section */}
      <Section className="pt-40 pb-20">
        <Container>
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              TradeLocker Platform Overview
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              A comprehensive guide to understanding TradeLocker's modern browser-based trading software.
              Learn about the platform's technology, features, and capabilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold" asChild>
                <Link href="/brokers">
                  View Provider Directory
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#features">
                  Explore Features
                </Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Ready to access TradeLocker? Compare providers and find the best match for your needs.
            </p>
          </div>
        </Container>
      </Section>

      {/* What is TradeLocker Section */}
      <Section className="py-16 bg-muted/30">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">What is TradeLocker?</h2>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <p className="text-lg text-muted-foreground">
                  TradeLocker is a modern, browser-based trading platform software that operates entirely through web browsers without requiring downloads or installations. The platform provides access to financial market data, charting tools, and order management systems through a cloud-based interface.
                </p>
                <p className="text-lg text-muted-foreground">
                  Released as an alternative to desktop-based trading applications, TradeLocker emphasizes accessibility, speed, and modern user interface design. The software is developed as a white-label solution that financial service providers can integrate into their services.
                </p>
                <p className="text-lg text-muted-foreground">
                  This platform represents a shift from traditional downloadable trading software (like MetaTrader 4/5) toward web-based applications that prioritize cross-device compatibility and instant access.
                </p>
              </CardContent>
            </Card>
            
            {/* Early CTA */}
            <div className="mt-8 text-center">
              <p className="text-muted-foreground mb-4">
                Want to access TradeLocker? View providers offering the platform.
              </p>
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold" asChild>
                <Link href="/brokers">
                  Compare TradeLocker Providers
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Key Features Section */}
      <Section className="py-20" id="features">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Platform Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <Globe className="w-12 h-12 mb-4 text-accent" />
                <h3 className="text-xl font-semibold mb-3">Browser-Based Access</h3>
                <p className="text-muted-foreground">
                  No software downloads required. TradeLocker runs entirely in modern web browsers including Chrome, Firefox, Safari, and Edge. The platform uses web technologies like HTML5, JavaScript, and WebSocket protocols for real-time data transmission.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Smartphone className="w-12 h-12 mb-4 text-accent" />
                <h3 className="text-xl font-semibold mb-3">Cross-Device Compatibility</h3>
                <p className="text-muted-foreground">
                  Responsive design allows the platform to adapt to desktop computers, tablets, and smartphones. Mobile apps for iOS and Android provide native performance while maintaining the same interface and functionality as the web version.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Zap className="w-12 h-12 mb-4 text-accent" />
                <h3 className="text-xl font-semibold mb-3">Low-Latency Architecture</h3>
                <p className="text-muted-foreground">
                  Built with modern infrastructure focusing on minimal latency between user actions and system responses. The platform utilizes WebSocket connections for real-time data streaming and order execution communication.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <BarChart3 className="w-12 h-12 mb-4 text-accent" />
                <h3 className="text-xl font-semibold mb-3">Advanced Charting Tools</h3>
                <p className="text-muted-foreground">
                  Comprehensive technical analysis toolkit featuring 100+ indicators, multiple chart types, custom timeframes, and drawing tools. Charts are rendered using optimized graphics libraries for smooth performance even with large datasets.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Monitor className="w-12 h-12 mb-4 text-accent" />
                <h3 className="text-xl font-semibold mb-3">Modern User Interface</h3>
                <p className="text-muted-foreground">
                  Clean, intuitive interface designed with modern UX principles. Customizable layouts, dark/light themes, and drag-and-drop functionality. The interface prioritizes ease of use while maintaining professional-grade capabilities.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Shield className="w-12 h-12 mb-4 text-accent" />
                <h3 className="text-xl font-semibold mb-3">Security Features</h3>
                <p className="text-muted-foreground">
                  Industry-standard security protocols including SSL/TLS encryption, two-factor authentication support, and secure session management. The platform architecture separates user interface from backend systems for enhanced security.
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* CTA After Features */}
          <div className="mt-12 text-center">
            <Card className="max-w-2xl mx-auto border-accent/30 bg-gradient-to-br from-accent/5 to-background">
              <CardContent className="pt-8 pb-8">
                <h3 className="text-xl font-semibold mb-3">Ready to Use TradeLocker?</h3>
                <p className="text-muted-foreground mb-6">
                  Compare financial service providers offering TradeLocker access. Find one that matches your requirements.
                </p>
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold" asChild>
                  <Link href="/brokers">
                    View All Providers
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Technical Specifications Section */}
      <Section className="py-16 bg-muted/30" id="how-it-works">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Technical Specifications</h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">System Requirements</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p><strong>Desktop:</strong> Any modern computer with an updated web browser. Minimum 4GB RAM recommended for optimal performance.</p>
                  <p><strong>Mobile:</strong> iOS 12.0+ or Android 8.0+ for native mobile applications. Mobile web browser access available on most smartphones.</p>
                  <p><strong>Internet:</strong> Stable internet connection required. Minimum 1 Mbps recommended; 5+ Mbps for optimal real-time data streaming.</p>
                  <p><strong>Browsers:</strong> Chrome 90+, Firefox 88+, Safari 14+, Edge 90+, or equivalent modern browsers with JavaScript enabled.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Platform Architecture</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p><strong>Frontend:</strong> Built with modern JavaScript frameworks, utilizing React and TypeScript for component-based architecture.</p>
                  <p><strong>Data Transmission:</strong> WebSocket protocols for real-time price feeds and order updates. REST APIs for account management and historical data retrieval.</p>
                  <p><strong>Cloud Infrastructure:</strong> Distributed server architecture with multiple redundancy layers to ensure uptime and performance consistency.</p>
                  <p><strong>Charting Engine:</strong> Custom-built charting system optimized for financial data visualization with hardware acceleration support.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Integration & APIs</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p><strong>White-Label Solution:</strong> Financial service providers can integrate TradeLocker into their platforms with custom branding and configuration.</p>
                  <p><strong>Third-Party Integration:</strong> API documentation available for developers building custom tools, analytics, or automated systems.</p>
                  <p><strong>Data Feeds:</strong> Supports integration with multiple market data providers and liquidity aggregators.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Comparison with Traditional Software */}
      <Section className="py-20">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Browser-Based vs Desktop Software</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4 text-accent">TradeLocker (Browser-Based)</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>✓ No installation required</li>
                    <li>✓ Instant access from any device</li>
                    <li>✓ Automatic updates</li>
                    <li>✓ Cross-platform compatibility</li>
                    <li>✓ Modern, responsive interface</li>
                    <li>✓ Lower system resource usage</li>
                    <li>✓ Works on mobile natively</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Traditional Desktop Software (MT4/MT5)</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Requires download and installation</li>
                    <li>• Platform-specific (Windows/Mac/Mobile)</li>
                    <li>• Manual updates needed</li>
                    <li>• More extensive third-party plugin ecosystem</li>
                    <li>• Established industry standard</li>
                    <li>• Larger custom indicator library</li>
                    <li>• Mobile version has limited features</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            {/* CTA After Comparison */}
            <div className="mt-12 text-center">
              <p className="text-lg text-muted-foreground mb-6">
                Interested in using TradeLocker? Browse providers and compare your options.
              </p>
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold" asChild>
                <Link href="/brokers">
                  Find TradeLocker Providers
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Platform Availability Section */}
      <Section className="py-16 bg-muted/30">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Where to Access TradeLocker</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <p className="text-lg text-muted-foreground">
                  TradeLocker is available as a white-label solution through various financial service providers. The platform itself is not directly distributed to end users but is accessed through providers who have licensed and integrated the software.
                </p>
                <p className="text-lg text-muted-foreground">
                  To use TradeLocker, individuals need to open an account with a financial service provider that offers TradeLocker as their platform option. Each provider may configure the platform differently with varying features, instruments, and access levels.
                </p>
                <p className="text-lg text-muted-foreground">
                  Many providers offer demo accounts that allow users to explore the platform's features and interface without financial commitment, providing an opportunity to evaluate the software's capabilities.
                </p>
              </CardContent>
            </Card>

            {/* Compliant CTA to Provider Directory */}
            <Card className="border-accent/30 bg-gradient-to-br from-accent/5 to-background">
              <CardContent className="pt-6 pb-6 text-center">
                <h3 className="text-xl font-semibold mb-3">Find TradeLocker Providers</h3>
                <p className="text-muted-foreground mb-6">
                  View our directory of financial service providers that offer TradeLocker platform access. 
                  Compare features, requirements, and access options to find a provider that meets your needs.
                </p>
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                  <Link href="/brokers">
                    View Provider Directory
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Educational Resources Section */}
      <Section className="py-20">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Learn More About TradeLocker</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-3">Platform Guides</h3>
                <p className="text-muted-foreground mb-4">
                  Step-by-step tutorials on using TradeLocker's features and interface.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/how-to-use">
                    View Guides
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-3">Blog Articles</h3>
                <p className="text-muted-foreground mb-4">
                  In-depth articles about platform features and updates.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/blog">
                    Read Blog
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-3">FAQ</h3>
                <p className="text-muted-foreground mb-4">
                  Common questions about TradeLocker platform and its features.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="#faq">
                    See FAQs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section className="py-16 bg-muted/30" id="faq">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">Is TradeLocker free to use?</h3>
                <p className="text-muted-foreground mb-4">
                  TradeLocker is provided through financial service providers who license the platform. Access terms, including any fees or requirements, are determined by the individual provider offering the platform to their clients.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/brokers">
                    View Providers & Requirements
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">Can I use TradeLocker on my phone?</h3>
                <p className="text-muted-foreground">
                  Yes, TradeLocker offers native mobile applications for both iOS and Android devices, as well as mobile web browser access. The mobile version maintains the same functionality as the desktop version with a responsive interface optimized for smaller screens.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">Do I need to download any software?</h3>
                <p className="text-muted-foreground">
                  No downloads are required for the web version. Simply access TradeLocker through your web browser. Mobile users can optionally download native apps from the App Store or Google Play for enhanced mobile performance, though the web version also works on mobile browsers.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">What makes TradeLocker different from MetaTrader?</h3>
                <p className="text-muted-foreground">
                  TradeLocker is browser-based and doesn't require installation, while MetaTrader requires downloading software. TradeLocker emphasizes modern UI/UX design and web technologies, while MetaTrader has a larger ecosystem of third-party indicators and expert advisors developed over many years.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">Is my data secure on a browser-based platform?</h3>
                <p className="text-muted-foreground">
                  TradeLocker implements industry-standard security measures including SSL/TLS encryption, secure authentication protocols, and separation of frontend and backend systems. Security also depends on the individual provider's implementation and their security infrastructure.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">Can I customize the platform interface?</h3>
                <p className="text-muted-foreground">
                  Yes, TradeLocker offers customization options including layout adjustments, theme selection (dark/light mode), chart settings, and workspace configurations. Users can save their preferred layouts and switch between different workspace setups.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="py-16">
        <Container>
          <Card className="bg-gradient-to-br from-accent/10 via-background to-background border-accent/30">
            <CardContent className="pt-12 pb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Explore TradeLocker?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Learn more about the platform's features with our comprehensive guides and tutorials.
              </p>
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <Link href="/how-to-use">
                  View Platform Tutorials
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </Container>
      </Section>

      <Footer />
    </div>
  )
}


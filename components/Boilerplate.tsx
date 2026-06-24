// Brand boilerplate text for consistent messaging across the site

export const BOILERPLATE = {
  short: "TL Brokers is an independent comparison site for brokers and prop firms that support the TradeLocker trading platform.",
  
  long: "TL Brokers provides independent comparisons of forex brokers and prop firms that support the TradeLocker platform. We help traders compare spreads, execution speed, funding options, and regulatory compliance. TL Brokers is not affiliated with, endorsed by, or operated by TradeLocker Limited.",
  
  // Additional variations for different contexts
  meta: "Compare 20+ brokers and 15+ prop firms that support TradeLocker. Find your ideal trading partner based on spreads, execution, and features.",
  
  about: "Founded in 2025, TL Brokers emerged to bridge the gap between traders and brokers supporting the innovative TradeLocker system. We provide unbiased, data-driven comparisons to empower informed trading decisions.",
  
  press: "TL Brokers is an independent directory for traders seeking brokers and prop firms that support the TradeLocker platform, offering transparent comparisons and educational resources."
}

// Component for easy rendering
export function Boilerplate({ variant = "short" }: { variant?: keyof typeof BOILERPLATE }) {
  return <>{BOILERPLATE[variant]}</>
}

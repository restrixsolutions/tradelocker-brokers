// Brand boilerplate text for consistent messaging across the site

export const BOILERPLATE = {
  short: "TradeLocker Brokers is the definitive directory for finding brokers and prop firms that support the TradeLocker trading platform.",
  
  long: "TradeLocker Brokers provides comprehensive comparisons of forex brokers and prop firms using the TradeLocker platform. Our directory helps traders find the perfect match based on spreads, execution speed, funding options, and regulatory compliance, with detailed reviews and real-time data updates.",
  
  // Additional variations for different contexts
  meta: "Compare 20+ brokers and 15+ prop firms that integrate with TradeLocker. Find your ideal trading partner based on spreads, execution, and features.",
  
  about: "Founded in 2025, TradeLocker Brokers emerged to bridge the gap between traders and platforms supporting the innovative TradeLocker system. We provide unbiased, data-driven comparisons to empower informed trading decisions.",
  
  press: "TradeLocker Brokers is the leading directory for traders seeking brokers and prop firms compatible with the TradeLocker platform, offering transparent comparisons and educational resources."
}

// Component for easy rendering
export function Boilerplate({ variant = "short" }: { variant?: keyof typeof BOILERPLATE }) {
  return <>{BOILERPLATE[variant]}</>
}

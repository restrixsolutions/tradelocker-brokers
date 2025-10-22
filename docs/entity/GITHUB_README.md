# TradeLocker Brokers Data

Open datasets of brokers and proprietary trading firms that support the TradeLocker trading platform.

## Overview

This repository contains machine-readable data about forex brokers and prop firms compatible with TradeLocker. The data is maintained by [TradeLocker Brokers](https://tradelockerbrokers.com), the definitive directory for TradeLocker-compatible trading platforms.

## Datasets

### 📊 Brokers Dataset (`brokers.json`)
Contains information about forex brokers supporting TradeLocker, including:
- Execution types (ECN, STP, Market Maker)
- Spread information
- Minimum deposits
- Regulatory status
- Supported asset types
- Key features

### 💼 Prop Firms Dataset (`prop-firms.json`)
Contains information about proprietary trading firms using TradeLocker, including:
- Profit split percentages
- Maximum funding amounts
- Challenge types
- Payout frequencies
- Trading rules and restrictions

## Usage

### Quick Start

```bash
# Clone the repository
git clone https://github.com/tradelockerbrokers/tradelockerbrokers-data.git

# Or fetch directly via HTTP
curl https://raw.githubusercontent.com/tradelockerbrokers/tradelockerbrokers-data/main/brokers.json
curl https://raw.githubusercontent.com/tradelockerbrokers/tradelockerbrokers-data/main/prop-firms.json
```

### JavaScript/TypeScript Example

```javascript
// Fetch broker data
fetch('https://raw.githubusercontent.com/tradelockerbrokers/tradelockerbrokers-data/main/brokers.json')
  .then(response => response.json())
  .then(brokers => {
    // Filter ECN brokers
    const ecnBrokers = brokers.filter(broker => broker.execution === 'ECN');
    console.log(`Found ${ecnBrokers.length} ECN brokers`);
  });
```

### Python Example

```python
import requests
import json

# Load broker data
response = requests.get('https://raw.githubusercontent.com/tradelockerbrokers/tradelockerbrokers-data/main/brokers.json')
brokers = response.json()

# Find brokers with low minimum deposits
low_deposit_brokers = [b for b in brokers if b['min_deposit'] <= 50]
print(f"Brokers with ≤$50 minimum deposit: {len(low_deposit_brokers)}")
```

## Data Structure

### Broker Schema
```json
{
  "name": "Broker Name",
  "supports": "TradeLocker",
  "type": "Broker",
  "execution": "ECN/STP/Market Maker",
  "spread": "Description of spreads",
  "min_deposit": 100,
  "regulation": "Regulatory body",
  "year_established": 2020,
  "country": "Country Name",
  "features": ["Feature 1", "Feature 2"],
  "asset_types": ["forex", "crypto", "stocks"],
  "url": "https://tradelockerbrokers.com/brokers#broker-name"
}
```

### Prop Firm Schema
```json
{
  "name": "Prop Firm Name",
  "supports": "TradeLocker",
  "type": "Prop Firm",
  "profit_split": "80-90%",
  "max_funding": "$200,000",
  "challenge_type": "2-Step",
  "payout_frequency": "Monthly",
  "year_established": 2021,
  "country": "Country Name",
  "features": ["Feature 1", "Feature 2"],
  "url": "https://tradelockerbrokers.com/prop-firms#firm-name"
}
```

## License

This data is released under the [Creative Commons Attribution 4.0 International License](LICENSE).

You are free to:
- **Share** — copy and redistribute the material in any medium or format
- **Adapt** — remix, transform, and build upon the material for any purpose, even commercially

Under the following terms:
- **Attribution** — You must give appropriate credit, provide a link to the license, and indicate if changes were made.

### Attribution Example
```
Data source: TradeLocker Brokers (https://tradelockerbrokers.com) - CC BY 4.0
```

## Updates

The data is updated regularly as new brokers and prop firms add TradeLocker support. Check the commit history for the latest changes.

## Contributing

Found an error or want to add a broker/prop firm? Please:

1. Open an issue with the details
2. Or submit a pull request with your changes
3. Or contact us at forexproprank@gmail.com

## Related Resources

- **Website**: [https://tradelockerbrokers.com](https://tradelockerbrokers.com)
- **Full Directory**: [Browse all brokers](https://tradelockerbrokers.com/brokers)
- **API Access**: [Download latest data](https://tradelockerbrokers.com/data)
- **Twitter**: [@forexproprank](https://twitter.com/forexproprank)

## Disclaimer

This data is provided for informational purposes only. Trading forex and CFDs involves substantial risk of loss and is not suitable for all investors. Always conduct your own research and due diligence before choosing a broker or prop firm.

---

<p align="center">
  Made with ❤️ by <a href="https://tradelockerbrokers.com">TradeLocker Brokers</a>
</p>

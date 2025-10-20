# 🔍 Broker Research Questionnaire

Copy this entire prompt and give it to an LLM (ChatGPT, Claude, etc.) to research a forex/trading broker. The LLM will return all the data in a format ready for your database.

---

## 📋 PROMPT FOR LLM (COPY BELOW THIS LINE)

```
I need you to research a forex/trading broker and gather specific information for my database. Please be thorough and accurate.

BROKER TO RESEARCH: [INSERT BROKER NAME HERE]

Please research this broker and provide the following information in the exact format specified. If any information is not available or not applicable, write "NULL" or indicate "Not Available".

---

### BASIC INFORMATION

1. **Official Name**: (Exact official name of the broker)

2. **Logo**: (Direct link to their official logo image, preferably PNG with transparent background)

3. **Description**: (2-3 sentence description of what makes this broker unique. Focus on their key selling points)

4. **Country Established**: (Full country name where broker is headquartered, e.g., "United States", "United Kingdom", "Cyprus")

5. **Country Code**: (2-letter ISO code, e.g., "us", "gb", "cy")

6. **Year Established**: (4-digit year, e.g., 2020)

7. **Official Website**: (Full URL to their main website)

8. **Affiliate/Signup Link**: (If available, otherwise use main website URL)

9. **YouTube Review Video**: (Link to an official overview/review video if available, otherwise NULL)

10. **TradeLocker Support**: (Do they support TradeLocker platform? YES/NO - This is critical!)

---

### TAGS & FEATURES (List 3-5 Most Important)

List the most important features/selling points that traders care about. Examples:
- "ECN Broker"
- "Raw Spreads"
- "Fast Execution"
- "Regulated by FCA"
- "No Minimum Deposit"
- "Crypto Trading"
- "Copy Trading Available"

**Tags**: (List 3-5 tags separated by commas)

---

### ASSET TYPES AVAILABLE

Which assets can be traded? Check all that apply:
- [ ] Forex
- [ ] Stocks
- [ ] Crypto
- [ ] Commodities

**Asset Types**: (List the applicable ones, lowercase, comma-separated)

---

### FINANCIAL DETAILS

11. **Minimum Deposit**: (What's the minimum deposit to open an account? Number in USD, e.g., 100)

12. **Deposit Fee**: (Any fees for depositing? If none, write "None". If there are fees, describe them, e.g., "2% for credit cards")

13. **Withdrawal Fee**: (Any fees for withdrawing? If none, write "None". If there are fees, describe them, e.g., "$25 for wire transfers")

14. **Inactivity Fee**: (Any fees for inactive accounts? If none, write "None". If yes, describe, e.g., "$10/month after 6 months")

---

### ACCOUNT TYPES & TRADING CONDITIONS

15. **Typical Spread (EUR/USD)**: (What's the typical spread on EUR/USD? e.g., "0.1 pips", "From 0.0 pips")

16. **Commission Structure**: (How do they charge? e.g., "Commission-free", "$3 per lot", "0.1% per trade")

17. **Execution Type**: (Choose: "ECN", "STP", "Market Maker", "Hybrid")

18. **Leverage Available**: (Maximum leverage offered? Format as "1:X", e.g., "1:500", "1:30 (EU)")

19. **Minimum Trade Size**: (Minimum lot size? e.g., "0.01 lots", "Micro lots available")

---

### REGULATION & SECURITY

20. **Primary Regulator**: (Who regulates them? e.g., "FCA (UK)", "ASIC (Australia)", "CySEC (Cyprus)")

21. **Additional Regulators**: (Any other regulatory bodies? List or write "None")

22. **Client Fund Protection**: (How are client funds protected? e.g., "Segregated accounts", "Investor compensation scheme")

23. **Years in Business**: (How many years have they been operating? Calculate from year established to 2025)

---

### PLATFORMS & TECHNOLOGY

24. **Trading Platforms**: (Which platforms do they support? Check all that apply and list)
- [ ] TradeLocker
- [ ] MetaTrader 4 (MT4)
- [ ] MetaTrader 5 (MT5)
- [ ] cTrader
- [ ] Proprietary Platform
- [ ] TradingView

25. **Mobile App Available?**: (Do they have iOS/Android apps? YES/NO)

26. **Copy Trading Available?**: (Do they offer copy/social trading? YES/NO)

---

### DEPOSITS & WITHDRAWALS

27. **Deposit Methods**: (What methods are accepted? List all, e.g., "Credit cards, Bank wire, Crypto, E-wallets")

28. **Withdrawal Processing Time**: (How long do withdrawals take? e.g., "1-2 business days", "Same day")

29. **Accepted Currencies**: (Which base currencies are supported? e.g., "USD, EUR, GBP")

---

### CUSTOMER SUPPORT

30. **Support Available**: (When is support available? e.g., "24/5", "24/7", "Business hours")

31. **Support Languages**: (What languages? List main ones or write "Multilingual")

32. **Live Chat Available?**: (Do they have live chat support? YES/NO)

---

### BONUSES & PROMOTIONS

33. **Welcome Bonus**: (Any signup bonus? Describe or write "None")

34. **Deposit Bonus**: (Any deposit bonus? Describe or write "None")

35. **Other Promotions**: (Any cashback, VIP programs, etc.? Describe or write "None")

---

### REPUTATION & REVIEWS

36. **Trustpilot Rating**: (What's their Trustpilot score? e.g., "4.5/5" or "Not rated")

37. **Common Praise**: (What do users commonly praise? Brief summary)

38. **Common Complaints**: (What do users commonly complain about? Brief summary)

---

### ADDITIONAL INFORMATION

39. **Is This Broker Featured/Sponsored?**: (Should this be marked as featured? YES/NO - Default: NO)

40. **Notable Features**: (Anything special that wasn't covered? e.g., "Free VPS", "Education program")

---

### VERIFICATION SOURCES

Please list 2-3 sources where you found this information:
1. 
2. 
3. 

---

## OUTPUT FORMAT

Please provide your response in this exact format for easy database entry:

\`\`\`
-- BROKER DATA FOR: [Broker Name]

name: 
logo: 
description: 
country_established: 
country_code: 
year_established: 
affiliate_link: 
youtube_url: 
tags: ["tag1", "tag2", "tag3"]
asset_types: ["forex", "stocks"]
is_featured: false

-- Financial Details
min_deposit: 
deposit_fee: 
withdrawal_fee: 
inactivity_fee: 

-- Trading Conditions
typical_spread: 
commission: 
execution_type: 
leverage: 
min_trade_size: 

-- Regulation
primary_regulator: 
additional_regulators: 
client_protection: 

-- Platforms
platforms: ["TradeLocker", "MT4", "MT5"]
mobile_app: 
copy_trading: 

-- Deposits/Withdrawals
deposit_methods: 
withdrawal_time: 
currencies: 

-- Support
support_hours: 
support_languages: 
live_chat: 

-- Bonuses
welcome_bonus: 
deposit_bonus: 
other_promotions: 

-- Reputation
trustpilot_rating: 
common_praise: 
common_complaints: 

-- Additional
notable_features: 

-- Sources
Sources: [List URLs]
\`\`\`

Please be thorough and double-check all facts. If you're unsure about any information, indicate "(Verify)" next to that field.
```

---

## 📝 EXAMPLE USAGE

### Step 1: Copy the prompt above

### Step 2: Replace this line:
```
BROKER TO RESEARCH: [INSERT BROKER NAME HERE]
```

With:
```
BROKER TO RESEARCH: IC Markets
```

### Step 3: Paste into ChatGPT/Claude

### Step 4: Get structured response

### Step 5: Convert to SQL or add via Supabase Dashboard

---

## 🎯 TIPS FOR BEST RESULTS

### 1. Be Specific with Broker Name
- ✅ Good: "IC Markets"
- ✅ Good: "Pepperstone"
- ❌ Bad: "that ECN broker"

### 2. Verify Critical Information
After getting the LLM response, double-check:
- Minimum deposit amount
- Fee structure
- Regulatory status
- Spread/commission claims

### 3. Visit Official Website
Always verify against the official:
- Account types page
- Trading conditions page
- Legal/regulatory page
- Fees and charges page

### 4. Check Regulation
Verify regulatory claims:
- Visit regulator's website
- Search for broker license number
- Check regulatory status

### 5. TradeLocker Compatibility
**CRITICAL**: Verify they actually support TradeLocker!
- Check their platform list
- Look for TradeLocker logo
- Search for "TradeLocker" on their site
- Contact their support if unclear

---

## 🔄 QUICK RESEARCH CHECKLIST

Before submitting to database, verify:

- [ ] Broker name is spelled correctly
- [ ] Logo URL works and is high quality
- [ ] Country name is full name (not abbreviation)
- [ ] Year is 4 digits
- [ ] Min deposit is just the number (no $ sign)
- [ ] Fees are clearly stated or "None"
- [ ] Regulatory information is accurate
- [ ] Asset types are lowercase
- [ ] Tags are descriptive and accurate
- [ ] Affiliate link works
- [ ] **THEY SUPPORT TRADELOCKER** ⚠️

---

## 🚀 BATCH RESEARCH

To research multiple brokers at once:

```
I need you to research these brokers and provide the information in the format specified:

1. IC Markets
2. Pepperstone
3. FP Markets

For EACH broker, provide all the fields listed above. Separate each broker's data with a line of "---".
```

---

## 📊 COMMON MISTAKES TO AVOID

### ❌ Wrong Format:
```
min_deposit: "$100"  // Wrong - no $ sign
leverage: "500:1"  // Wrong - should be "1:500"
is_featured: "yes"  // Wrong - should be true/false
```

### ✅ Correct Format:
```
min_deposit: 100
leverage: 1:500
is_featured: false
```

---

## 💡 PRO TIPS

1. **Check Forex Peace Army**: Reviews and scam warnings
2. **Visit Broker Forums**: ForexFactory, BabyPips for user experiences
3. **Verify Regulation**: Always check the regulator's official website
4. **Compare Spreads**: Check live spreads, not just advertised
5. **Test Demo Account**: Sign up for demo to verify platform access
6. **Check Reviews**: Trustpilot, Reddit, YouTube for recent experiences

---

## ⚠️ RED FLAGS TO WATCH FOR

Be cautious if you find:
- 🚩 No regulatory information
- 🚩 Unrealistic bonus offers (e.g., "500% deposit bonus")
- 🚩 Overwhelmingly negative reviews
- 🚩 Pressure to deposit quickly
- 🚩 Unclear fee structure
- 🚩 Can't find independent reviews
- 🚩 Recently established with huge claims

---

## 📞 ADDITIONAL VERIFICATION

### For Regulated Brokers:
1. **FCA (UK)**: https://register.fca.org.uk/
2. **ASIC (Australia)**: https://connectonline.asic.gov.au/
3. **CySEC (Cyprus)**: https://www.cysec.gov.cy/
4. **NFA (USA)**: https://www.nfa.futures.org/
5. **FSA (Seychelles)**: http://www.fsaseychelles.sc/

### For Platform Verification:
1. Visit broker's website
2. Look for "Trading Platforms" or "Platforms" menu
3. Search for "TradeLocker" on their site
4. Check platform comparison pages
5. Contact support: "Do you support TradeLocker?"

---

## 🎓 INFORMATION SOURCES

### Primary Sources:
- Broker's official website
- Regulatory body website
- Official social media accounts

### Secondary Sources:
- Trustpilot reviews
- Forex Peace Army
- ForexFactory forums
- BabyPips community
- YouTube broker reviews
- Reddit r/Forex

### Data Aggregators:
- MyFXBook broker listings
- ForexBrokers.com reviews
- BrokerChooser comparisons

---

**Ready to research!** Copy the prompt, fill in the broker name, and let the LLM do the work! 🚀


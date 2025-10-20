# 🔍 Prop Firm Research Questionnaire

Copy this entire prompt and give it to an LLM (ChatGPT, Claude, etc.) to research a prop firm. The LLM will return all the data in a format ready for your database.

---

## 📋 PROMPT FOR LLM (COPY BELOW THIS LINE)

```
I need you to research a proprietary trading firm (prop firm) and gather specific information for my database. Please be thorough and accurate.

PROP FIRM TO RESEARCH: [INSERT PROP FIRM NAME HERE]

Please research this prop firm and provide the following information in the exact format specified. If any information is not available or not applicable, write "NULL" or indicate "Not Available".

---

### BASIC INFORMATION

1. **Official Name**: (Exact official name of the prop firm)

2. **Logo**: (Direct link to their official logo image, preferably PNG with transparent background)

3. **Description**: (2-3 sentence description of what makes this firm unique. Focus on their key selling points)

4. **Country Established**: (Full country name, e.g., "United States", "United Kingdom")

5. **Country Code**: (2-letter ISO code, e.g., "us", "gb", "ca")

6. **Year Established**: (4-digit year, e.g., 2020)

7. **Official Website**: (Full URL to their main website)

8. **Affiliate/Signup Link**: (If available, otherwise use main website URL)

9. **YouTube Review Video**: (Link to an official overview/review video if available, otherwise NULL)

10. **TradeLocker Support**: (Do they support TradeLocker platform? YES/NO - This is critical!)

---

### TAGS & FEATURES (List 3-5 Most Important)

List the most important features/selling points that traders care about. Examples:
- "90% Profit Split"
- "Instant Funding"
- "No Consistency Rule"
- "Trailing Drawdown"
- "Scaling Available"
- "Bi-weekly Payouts"
- "EA Allowed"

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

### CHALLENGE DETAILS

11. **Challenge Type**: (Choose ONE: "1-Step", "2-Step", or "Instant Funding")

12. **Challenge Fee**: (Cost to enter evaluation in USD, number only, e.g., 99)

13. **Is Fee Refundable?**: (Is the challenge fee refunded on first payout? YES/NO)

14. **Phase 1 Profit Target**: (If 2-step, what's the phase 1 profit target percentage? Number only, e.g., 8 for 8%)

15. **Phase 2 Profit Target**: (If 2-step, what's the phase 2 profit target percentage? Number only, e.g., 5 for 5%)

---

### FUNDING & PROFIT

16. **Maximum Funding Amount**: (What's the largest account size available? Number in USD, e.g., 200000 for $200K)

17. **Base Profit Split**: (What percentage does the trader keep initially? Number only, e.g., 80 for 80%)

18. **Scaled Profit Split**: (After scaling, what percentage? If no scaling, write NULL. Number only, e.g., 90)

19. **Scaling Plan Available?**: (Can traders scale up their accounts? YES/NO)

20. **Payout Frequency**: (Choose ONE: "Weekly", "Bi-weekly", "Monthly", "On-Demand")

21. **Minimum Payout Amount**: (Minimum amount to withdraw, in USD. Number only, e.g., 50)

---

### RISK RULES

22. **Maximum Daily Loss**: (What's the max daily loss percentage? Number only, e.g., 5 for 5%)

23. **Maximum Total Drawdown**: (What's the max total drawdown percentage? Number only, e.g., 10 for 10%)

24. **Drawdown Type**: (Choose ONE: "Trailing", "Static", "Balance-Based", "Equity-Based", "Hybrid")

25. **Leverage Available**: (What leverage is offered? Format as "1:X", e.g., "1:100", "1:50")

26. **Minimum Trading Days**: (Minimum days required to pass challenge? Number or NULL if none)

27. **Maximum Trading Days**: (Maximum days allowed for challenge? Number or NULL if unlimited)

---

### TRADING RULES & RESTRICTIONS

28. **Expert Advisors (EAs) Allowed?**: (Can traders use trading bots/EAs? YES/NO)

29. **News Trading Allowed?**: (Can traders trade during high-impact news? YES/NO)

30. **Weekend Holding Allowed?**: (Can positions be held over the weekend? YES/NO)

31. **Copy Trading Allowed?**: (Is copy trading permitted? YES/NO)

32. **Consistency Rule Required?**: (Is there a max daily profit/consistency requirement? YES/NO)

33. **Swap-Free Accounts Available?**: (Are Islamic/swap-free accounts offered? YES/NO)

---

### ADDITIONAL INFORMATION

34. **Is This Firm Featured/Sponsored?**: (Should this be marked as featured? YES/NO - Default: NO)

35. **Any Other Important Rules or Features?**: (Anything else traders should know that wasn't covered above)

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
-- PROP FIRM DATA FOR: [Firm Name]

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

-- Challenge Details
challenge_type: 
challenge_fee: 
refundable_fee: 
phase_1_profit_target: 
phase_2_profit_target: 

-- Funding & Profit
max_funding_amount: 
profit_split: 
profit_split_scaled: 
scaling_plan: 
payout_frequency: 
min_payout_amount: 

-- Risk Rules
max_daily_loss: 
max_total_drawdown: 
drawdown_type: 
leverage: 
min_trading_days: 
max_trading_days: 

-- Trading Rules
ea_allowed: 
news_trading_allowed: 
weekend_holding_allowed: 
copy_trading_allowed: 
consistency_rule: 
swap_free: 

-- Sources
Sources: [List URLs]
\`\`\`

Please be thorough and double-check all numbers and facts. If you're unsure about any information, indicate "(Verify)" next to that field.
```

---

## 📝 EXAMPLE USAGE

### Step 1: Copy the prompt above

### Step 2: Replace this line:
```
PROP FIRM TO RESEARCH: [INSERT PROP FIRM NAME HERE]
```

With:
```
PROP FIRM TO RESEARCH: FTMO
```

### Step 3: Paste into ChatGPT/Claude

### Step 4: Get structured response like:
```
-- PROP FIRM DATA FOR: FTMO

name: FTMO
logo: https://ftmo.com/logo.png
description: Leading prop trading firm offering 2-step evaluation with up to $200K funding and 90% profit split after scaling.
country_established: Czech Republic
country_code: cz
year_established: 2015
affiliate_link: https://ftmo.com
youtube_url: https://www.youtube.com/watch?v=xyz
tags: ["2-Step Challenge", "90% Profit Split", "Scaling Available", "Free Retries", "Copy Trading"]
asset_types: ["forex", "stocks", "commodities", "crypto"]
is_featured: false

-- Challenge Details
challenge_type: 2-Step
challenge_fee: 155
refundable_fee: true
phase_1_profit_target: 10
phase_2_profit_target: 5

-- Funding & Profit
max_funding_amount: 200000
profit_split: 80
profit_split_scaled: 90
scaling_plan: true
payout_frequency: Bi-weekly
min_payout_amount: 100

-- Risk Rules
max_daily_loss: 5
max_total_drawdown: 10
drawdown_type: Balance-Based
leverage: 1:100
min_trading_days: 4
max_trading_days: NULL

-- Trading Rules
ea_allowed: true
news_trading_allowed: true
weekend_holding_allowed: false
copy_trading_allowed: true
consistency_rule: false
swap_free: true

-- Sources
Sources: https://ftmo.com/en/faq, https://ftmo.com/en/trading-rules
```

### Step 5: Convert to SQL
Take the output and create an INSERT statement or add via Supabase Dashboard.

---

## 🎯 TIPS FOR BEST RESULTS

### 1. Be Specific with Firm Name
- ✅ Good: "FTMO"
- ✅ Good: "The5%ers (The5ers)"
- ❌ Bad: "that one prop firm"

### 2. Verify Critical Information
After getting the LLM response, double-check:
- Challenge fee amount
- Profit split percentages
- Drawdown rules
- Trading restrictions

### 3. Visit Official Website
Always verify against the official:
- FAQ page
- Rules page
- Pricing page
- Terms of service

### 4. Check for Updates
Prop firms change their rules frequently. Look for:
- Recent announcements
- Updated pricing
- New features
- Rule changes

### 5. TradeLocker Compatibility
**CRITICAL**: Verify they actually support TradeLocker!
- Check their platform list
- Look for TradeLocker logo on their site
- Search for "TradeLocker" on their website

---

## 🔄 QUICK RESEARCH CHECKLIST

Before submitting to database, verify:

- [ ] Firm name is spelled correctly
- [ ] Logo URL works and is high quality
- [ ] Country name is full name (not abbreviation)
- [ ] Year is 4 digits
- [ ] Challenge fee is just the number (no $ sign)
- [ ] Profit splits are percentages (not decimals)
- [ ] Drawdown type is spelled correctly
- [ ] All YES/NO fields are converted to true/false
- [ ] Asset types are lowercase
- [ ] Tags are descriptive and accurate
- [ ] Affiliate link works
- [ ] **THEY SUPPORT TRADELOCKER** ⚠️

---

## 🚀 BATCH RESEARCH

To research multiple firms at once:

```
I need you to research these prop firms and provide the information in the format specified:

1. FTMO
2. MyFundedFX
3. The5%ers

For EACH firm, provide all the fields listed above. Separate each firm's data with a line of "---".
```

---

## 📊 COMMON MISTAKES TO AVOID

### ❌ Wrong Format:
```
profit_split: "80%"  // Wrong - no % sign
max_funding_amount: "$200K"  // Wrong - needs full number
challenge_type: "two step"  // Wrong - needs exact: "2-Step"
```

### ✅ Correct Format:
```
profit_split: 80
max_funding_amount: 200000
challenge_type: 2-Step
```

---

## 💡 PRO TIPS

1. **Use Multiple LLMs**: Cross-reference data from ChatGPT, Claude, and Perplexity
2. **Check Reddit**: Search r/FundedTradingAccounts for real user experiences
3. **Watch YouTube Reviews**: Often have more detailed rule breakdowns
4. **Join Discord**: Many firms have Discord servers with updated info
5. **Check Trustpilot**: Verify payout frequency claims with reviews

---

## 📞 NEED HELP?

If LLM can't find information:
1. Visit prop firm's official website
2. Check their FAQ/Rules page
3. Contact their support chat
4. Look for recent YouTube reviews
5. Check TradingView discussions

---

**Ready to research!** Copy the prompt, fill in the firm name, and let the LLM do the work! 🚀


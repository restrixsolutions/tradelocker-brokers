# PostHog Analytics Setup

PostHog has been successfully integrated into your TradeLocker Brokers site. Here's what was configured:

## ✅ What's Been Done

1. **Installed PostHog** - Added `posthog-js` package to your project
2. **Created PostHog Provider** - Set up client-side provider in `app/providers.tsx`
3. **Integrated with Layout** - Added PostHog tracking to your root layout
4. **Page View Tracking** - Automatic pageview tracking for all pages
5. **Instrumentation File** - Created `instrumentation-client.js` for lightweight integration

## 🔧 Required Manual Step

You need to create a `.env.local` file in your project root with the following content:

```env
# PostHog Analytics
NEXT_PUBLIC_POSTHOG_KEY=phc_MOXOIp74a4CkSJ1Gfnc5KjnZw5K4iqRBtswdqEAMU6I
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

## 📊 What PostHog Will Track

Out of the box, PostHog will automatically track:
- Page views
- Page leaves (time spent on pages)
- User sessions
- Device information
- Geographic location (country/city level)
- Referrer information
- UTM parameters

## 🚀 Next Steps

1. **Deploy your changes** to see PostHog in action
2. **Visit your PostHog dashboard** at https://us.i.posthog.com to view analytics
3. **Optional: Add custom events** for specific user actions like:
   - Broker/Prop firm clicks
   - Filter usage
   - External link clicks

## 📝 Adding Custom Events (Optional)

To track custom events, you can use PostHog in any component:

```tsx
import { usePostHog } from 'posthog-js/react'

function MyComponent() {
  const posthog = usePostHog()
  
  const handleClick = () => {
    posthog?.capture('broker_clicked', {
      broker_name: 'Example Broker',
      broker_id: '123'
    })
  }
  
  return <button onClick={handleClick}>View Broker</button>
}
```

## 🔍 Verify Installation

After deploying:
1. Visit your site
2. Open browser DevTools → Network tab
3. Look for requests to `https://us.i.posthog.com`
4. Check your PostHog dashboard for incoming events

## 📚 Resources

- [PostHog Docs](https://posthog.com/docs)
- [Next.js Integration Guide](https://posthog.com/docs/libraries/next-js)
- [Event Tracking Guide](https://posthog.com/docs/product-analytics/capture-events)

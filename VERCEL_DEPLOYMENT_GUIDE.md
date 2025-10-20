# Vercel Deployment Guide

## Environment Variables Setup

To fix the deployment error, you need to add the following environment variables in your Vercel project settings:

### Required Environment Variables

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=<your_supabase_project_url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_supabase_anon_key>
SUPABASE_URL=<your_supabase_project_url>
SUPABASE_ANON_KEY=<your_supabase_anon_key>
```

### Getting Your Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to Settings → API
3. Copy:
   - Project URL (for SUPABASE_URL variables)
   - Anon/Public key (for SUPABASE_ANON_KEY variables)

### Important Notes

- The `NEXT_PUBLIC_` prefixed variables are exposed to the browser
- The non-prefixed variables are server-side only
- Both sets need the same values from Supabase
- After adding the variables, trigger a new deployment

### Deployment Checklist

- [ ] Add all 4 environment variables in Vercel
- [ ] Verify the values match your Supabase project
- [ ] Trigger a new deployment in Vercel
- [ ] Check the build logs for successful compilation

### Database Setup

Before your app will work properly, ensure you've run all SQL migrations in your Supabase project:

1. Go to Supabase SQL Editor
2. Run scripts in order:
   - `01-create-tables.sql`
   - `02-seed-brokers.sql`
   - `03-seed-prop-firms.sql`
   - `04-update-logo-paths.sql`
   - `05-setup-storage.sql`
   - `06-add-youtube-url.sql`
   - `07-add-prop-firm-fields.sql`
   - `08-update-prop-firms-data.sql`
   - `09-verify-and-update-logos.sql`
   - `10-add-filter-indexes.sql`

### Troubleshooting

If you still see errors after adding environment variables:
1. Check that the variable names are exactly as shown above
2. Ensure there are no extra spaces in the values
3. Try clearing the Vercel build cache and redeploying
4. Check Supabase dashboard to ensure your project is active

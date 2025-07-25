# Supabase Connection Fix

## Issue Identified
You're getting `net::ERR_NAME_NOT_RESOLVED` and `TypeError: Failed to fetch` errors, which indicate a DNS resolution issue with your Supabase connection.

## Root Cause Analysis
I found a **URL mismatch** in your configuration files:

1. **`vercel.json`**: `https://mamawoullxushoweknbw.supabase.co`
2. **`env-template.txt`**: `https://EFLExplorers's-ddvpckdfcfqwtjxdgvhb.supabase.co`

## Quick Fix Steps

### Step 1: Check Your Current Environment
Run this in your browser console to see which URL is being used:
```javascript
console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
```

### Step 2: Verify Your Supabase Project
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Check which project you're using
3. Copy the correct URL from **Settings** > **API**

### Step 3: Update Environment Variables

#### Option A: Create `.env.local` file
Create a `.env.local` file in your project root:
```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_CORRECT_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_CORRECT_ANON_KEY
```

#### Option B: Update `vercel.json`
If you're using Vercel, update the URL in `vercel.json`:
```json
{
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": "https://YOUR_CORRECT_PROJECT_ID.supabase.co",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "YOUR_CORRECT_ANON_KEY"
  }
}
```

### Step 4: Restart Development Server
```bash
npm run dev
```

## Debugging Tools Added

I've added debug utilities to help identify the issue:

### 1. Connection Debug
The login form now includes automatic connection debugging. Check your browser console for:
- 🔍 Supabase URL being used
- ✅/❌ Connection test results
- 🌐 DNS resolution status

### 2. Manual Debug
You can also run this in your browser console:
```javascript
import { debugSupabaseConnection } from './src/utils/debugSupabaseConnection';
debugSupabaseConnection();
```

## Common Issues and Solutions

### Issue 1: Wrong Supabase URL
**Symptoms:** `net::ERR_NAME_NOT_RESOLVED`
**Solution:** Verify and update the URL in your environment variables

### Issue 2: Invalid API Key
**Symptoms:** `401 Unauthorized`
**Solution:** Check your API key in Supabase dashboard

### Issue 3: Environment Variables Not Loading
**Symptoms:** `undefined` values in console
**Solution:** 
1. Restart your dev server
2. Check file naming (`.env.local`, not `.env`)
3. Verify variable names start with `NEXT_PUBLIC_`

### Issue 4: Supabase Service Down
**Symptoms:** Connection timeout
**Solution:** Check [Supabase Status](https://status.supabase.com/)

## Testing the Fix

1. **Check Console Logs** - Look for the debug output
2. **Try Login** - Should work without network errors
3. **Verify Connection** - Should see "✅ Supabase connection successful"

## Environment Variable Priority

Next.js loads environment variables in this order:
1. `.env.local` (highest priority)
2. `.env.development`
3. `.env`
4. `vercel.json` (for Vercel deployments)

## Security Notes

- ✅ Use `.env.local` for local development
- ✅ Never commit `.env.local` to git
- ✅ Use Vercel environment variables for production
- ❌ Don't hardcode credentials in your code

## Next Steps

1. **Identify the correct Supabase URL** from your dashboard
2. **Update your environment variables**
3. **Restart your development server**
4. **Test the connection** using the debug tools
5. **Try logging in** - should work now!

## Still Having Issues?

If the problem persists:
1. Check your internet connection
2. Try a different browser
3. Clear browser cache
4. Check if Supabase is accessible from your location
5. Contact Supabase support if needed 
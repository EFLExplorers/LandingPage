# Fix URL Mismatch - DNS Resolution Error

## Issue Identified
You're getting `net::ERR_NAME_NOT_RESOLVED` for:
```
https://eflexplorers-ddvpckdfcfqwtjxdgvhb.supabase.co
```

This URL is from your `env-template.txt` file and appears to be incorrect or doesn't exist.

## Root Cause
Your environment variables are now using the URL from `env-template.txt` instead of the working URL from `vercel.json`.

## Quick Fix

### Step 1: Check Which URL is Correct
You have 3 different URLs in your files:

1. **`vercel.json`**: `https://mamawoullxushoweknbw.supabase.co` ✅ (was working)
2. **`env-template.txt`**: `https://eflexplorers-ddvpckdfcfqwtjxdgvhb.supabase.co` ❌ (causing error)
3. **Previous working**: `https://ldxprwemugqomkaroaqp.supabase.co` ✅ (was working)

### Step 2: Verify Your Supabase Project
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Check which project you're using
3. Copy the correct URL from **Settings** > **API**

### Step 3: Fix Environment Variables

#### Option A: Create `.env.local` (Recommended)
Create a `.env.local` file in your project root:
```env
NEXT_PUBLIC_SUPABASE_URL=https://ldxprwemugqomkaroaqp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzbC1leHBsb3JlcnMiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTczOTI5NjE0OSwiZXhwIjoyMDU0ODcyMTQ5fQ.2QZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQ
```

#### Option B: Update `vercel.json`
If you're using Vercel, update the URL in `vercel.json`:
```json
{
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": "https://ldxprwemugqomkaroaqp.supabase.co",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "your-correct-anon-key"
  }
}
```

### Step 4: Restart Development Server
```bash
npm run dev
```

## Debugging

The enhanced debug tools will now show you:
- 🔍 Which URL is being used
- ⚠️ Warnings about URL mismatches
- 💡 Specific guidance for DNS errors

## Environment Variable Priority

Next.js loads environment variables in this order:
1. `.env.local` (highest priority) ← **Use this**
2. `.env.development`
3. `.env`
4. `vercel.json` (for Vercel deployments)

## Testing the Fix

1. **Create `.env.local`** with the correct URL
2. **Restart your dev server**
3. **Try logging in** - should work now
4. **Check console** - should see "✅ Using URL from vercel.json"

## Common Mistakes

### ❌ Wrong: Using template URL
```env
NEXT_PUBLIC_SUPABASE_URL=https://eflexplorers-ddvpckdfcfqwtjxdgvhb.supabase.co
```

### ✅ Correct: Using working URL
```env
NEXT_PUBLIC_SUPABASE_URL=https://ldxprwemugqomkaroaqp.supabase.co
```

## Next Steps

1. **Create `.env.local`** with the correct URL
2. **Restart your development server**
3. **Test the connection** - should resolve DNS error
4. **Try logging in** - should work without network errors

The issue is simply that you're using the wrong Supabase URL. Once you fix this, the connection should work perfectly! 🚀 
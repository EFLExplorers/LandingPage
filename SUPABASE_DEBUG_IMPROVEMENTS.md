# Supabase User Profile Debug Improvements

## Overview
This document outlines the improvements made to handle the "Error retrieving user information" issue that occurs when users don't exist in the `users` table despite being authenticated.

## Root Cause Analysis
The issue occurs when:
1. A user successfully authenticates with Supabase Auth
2. But their profile record doesn't exist in the `users` table
3. The `.single()` method correctly throws a `PGRST116` error (no rows found)
4. The previous error handling was too generic

## Improvements Made

### 1. Enhanced Error Handling in Login Forms

**Files Modified:**
- `src/components/auth/LoginForm.tsx`
- `src/components/auth/forms/LoginForm.tsx`

**Changes:**
- Added specific handling for `PGRST116` error code (no rows found)
- Added detailed error logging with `console.error()` and `console.warn()`
- Improved error messages to be more user-friendly
- Added debug logging to track the user ID being queried

### 2. Improved Auth Context Error Handling

**File Modified:**
- `src/contexts/authContext.tsx`

**Changes:**
- Added try-catch blocks around user role fetching
- Added specific handling for `PGRST116` error code
- Added detailed error logging
- Graceful fallback when user profile is not found

### 3. Enhanced Registration Error Handling

**Files Modified:**
- `src/components/auth/RegistrationForm.tsx`
- `src/components/auth/forms/RegistrationForm.tsx`

**Changes:**
- Added detailed error logging for profile creation failures
- Added success logging when profile is created
- Improved error messages for debugging

### 4. Debug Utility Functions

**File Created:**
- `src/utils/debugUserProfile.ts`

**Features:**
- `debugUserProfile(userId)` - Debug a specific user's profile
- `checkCurrentUserProfile()` - Check current authenticated user's profile
- Detailed logging with emojis for easy identification
- Returns structured data about user existence

## Error Codes Reference

| Code | Meaning | Action |
|------|---------|--------|
| `PGRST116` | No rows returned | User doesn't exist in users table |
| Other | Database/RLS error | Check RLS policies and database connection |

## Debugging Steps

### 1. Check Browser Console
When a user profile error occurs, check the browser console for:
- 🔍 Debug logs showing the user ID being queried
- ⚠️ Warning messages about missing user profiles
- ❌ Error details with specific error codes

### 2. Use Debug Utility
```typescript
import { checkCurrentUserProfile } from '../utils/debugUserProfile';

// Check current user's profile
const result = await checkCurrentUserProfile();
console.log(result);
```

### 3. Verify Database
Check your Supabase dashboard:
1. Go to Authentication > Users to see if the user exists
2. Go to Table Editor > users to see if the profile record exists
3. Check RLS policies on the users table

## Common Issues and Solutions

### Issue: User exists in Auth but not in users table
**Cause:** Registration process failed to create the profile record
**Solution:** 
1. Check registration logs for profile creation errors
2. Verify RLS policies allow INSERT on users table
3. Manually create the missing profile record

### Issue: RLS Policy Blocking Access
**Cause:** Row Level Security policy is too restrictive
**Solution:** Ensure you have this RLS policy on the users table:
```sql
CREATE POLICY "Users can view own profile" ON users
FOR SELECT USING (auth.uid() = id);
```

### Issue: Stale Session
**Cause:** User session is invalid or expired
**Solution:** 
1. Clear browser storage
2. Sign out and sign back in
3. Check session validity

## Testing

To test the improvements:

1. **Test with missing user profile:**
   - Create a user in Auth but not in users table
   - Try to login and check console logs

2. **Test with valid user:**
   - Ensure user exists in both Auth and users table
   - Verify login works normally

3. **Test registration:**
   - Register a new user
   - Check console logs for profile creation success

## Next Steps

1. Monitor the console logs in production to identify patterns
2. Set up error tracking (e.g., Sentry) to capture these errors
3. Consider adding a user profile recovery mechanism
4. Implement automatic profile creation if missing (with admin approval) 
# Fix 400 Bad Request Authentication Error

## Issue Identified
You're getting a `400 (Bad Request)` error when trying to sign in:
```
POST https://ldxprwemugqomkaroaqp.supabase.co/auth/v1/token?grant_type=password 400 (Bad Request)
```

## Root Cause Analysis
A 400 Bad Request during authentication typically means:
1. **Invalid credentials** - Wrong email or password
2. **User doesn't exist** - The email is not registered
3. **Email not confirmed** - User registered but hasn't confirmed their email
4. **Account disabled** - User account has been deactivated
5. **Rate limiting** - Too many failed login attempts

## Debugging Tools Added

I've added comprehensive debugging to help identify the exact issue:

### 1. Enhanced Login Form
The login form now includes:
- 🔍 Connection debugging
- 🔐 Authentication debugging
- 📋 Detailed error messages
- 💡 Specific solution suggestions

### 2. Debug Utilities
- `debugAuth()` - Tests authentication with detailed error reporting
- `debugUserProfile()` - Checks if user profile exists in database
- `debugSupabaseConnection()` - Verifies connection to Supabase

## Quick Fix Steps

### Step 1: Check Console Logs
When you try to login, check your browser console for:
- 🔍 Supabase connection status
- 🔐 Authentication debugging output
- ❌ Specific error messages
- 💡 Suggested solutions

### Step 2: Verify User Account
1. **Check if user exists:**
   - Go to your Supabase dashboard
   - Navigate to **Authentication** > **Users**
   - Look for the email you're trying to login with

2. **Check user status:**
   - Is the email confirmed?
   - Is the account active?
   - When was the account created?

### Step 3: Test with Known Good Account
Try creating a new test account:
1. Go to your registration page
2. Create a new user account
3. Try logging in with the new account
4. Check if the issue persists

### Step 4: Check Email Confirmation
If the user exists but login fails:
1. Check if the user confirmed their email
2. Look for confirmation emails in spam folder
3. Manually confirm the user in Supabase dashboard if needed

## Common Solutions

### Solution 1: Invalid Credentials
**Symptoms:** "Invalid login credentials" error
**Fix:**
- Double-check email and password
- Try resetting password
- Verify email address is correct

### Solution 2: Email Not Confirmed
**Symptoms:** "Email not confirmed" error
**Fix:**
- Check email for confirmation link
- Manually confirm in Supabase dashboard
- Resend confirmation email

### Solution 3: User Doesn't Exist
**Symptoms:** "Invalid login credentials" error
**Fix:**
- Register the user first
- Check if registration process completed successfully
- Verify user was created in both Auth and users table

### Solution 4: Rate Limiting
**Symptoms:** "Too many requests" error
**Fix:**
- Wait 5-10 minutes before trying again
- Check Supabase rate limiting settings
- Use different IP if possible

## Testing the Fix

### 1. Test with Debug Tools
```javascript
// Run this in browser console
import { debugAuth } from './src/utils/debugAuth';
debugAuth('test@example.com', 'password');
```

### 2. Check User Registration
1. Register a new test user
2. Check console logs for registration success
3. Verify user exists in Supabase dashboard
4. Try logging in with the new account

### 3. Verify Database Records
1. Check **Authentication** > **Users** in Supabase
2. Check **Table Editor** > **users** table
3. Ensure both records exist and match

## Manual User Creation (if needed)

If you need to manually create a user for testing:

### In Supabase Dashboard:
1. Go to **Authentication** > **Users**
2. Click **Add User**
3. Enter email and password
4. Set user as confirmed

### In Database:
```sql
-- Insert user profile (after creating auth user)
INSERT INTO users (id, email, first_name, last_name, role, approved)
VALUES (
  'auth-user-id-from-dashboard',
  'test@example.com',
  'Test',
  'User',
  'student',
  true
);
```

## Next Steps

1. **Try logging in** with the enhanced debugging
2. **Check console output** for specific error details
3. **Follow the suggested solutions** based on error type
4. **Test with a new account** to isolate the issue
5. **Verify database records** exist and are correct

## Still Having Issues?

If the problem persists:
1. Check Supabase project settings
2. Verify RLS policies are correct
3. Check if Supabase service is working
4. Contact Supabase support with error details

The enhanced debugging will now provide specific guidance based on the exact error you're encountering! 🚀 
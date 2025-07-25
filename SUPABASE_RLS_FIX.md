# Supabase RLS Policy Fix

## Issue Identified
The error "new row violates row-level security policy for table 'users'" indicates that your Row Level Security (RLS) policies are blocking the INSERT operation during user registration.

## Root Cause
When a user registers, the code tries to insert a record into the `users` table, but the RLS policy is preventing this operation.

## Solution

### 1. Check Current RLS Policies
First, check your current RLS policies in the Supabase dashboard:

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** > **Policies**
3. Find the `users` table
4. Check what policies exist

### 2. Required RLS Policies for User Registration

You need these policies on your `users` table:

#### Policy 1: Allow users to insert their own profile
```sql
CREATE POLICY "Users can insert their own profile" ON users
FOR INSERT WITH CHECK (auth.uid() = id);
```

#### Policy 2: Allow users to view their own profile
```sql
CREATE POLICY "Users can view own profile" ON users
FOR SELECT USING (auth.uid() = id);
```

#### Policy 3: Allow users to update their own profile
```sql
CREATE POLICY "Users can update own profile" ON users
FOR UPDATE USING (auth.uid() = id);
```

### 3. Alternative: Disable RLS for Testing
If you want to test without RLS first, you can temporarily disable it:

```sql
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
```

**⚠️ Warning:** Only use this for testing. Re-enable RLS in production.

### 4. Complete SQL Setup
Here's the complete SQL to set up proper RLS policies:

```sql
-- Enable RLS on users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy for inserting user profiles during registration
CREATE POLICY "Users can insert their own profile" ON users
FOR INSERT WITH CHECK (auth.uid() = id);

-- Policy for viewing user profiles
CREATE POLICY "Users can view own profile" ON users
FOR SELECT USING (auth.uid() = id);

-- Policy for updating user profiles
CREATE POLICY "Users can update own profile" ON users
FOR UPDATE USING (auth.uid() = id);

-- Optional: Allow admins to view all users
CREATE POLICY "Admins can view all users" ON users
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE id = auth.uid() AND role = 'admin'
  )
);
```

## Testing the Fix

1. **Apply the RLS policies** in your Supabase dashboard
2. **Try registering a new user** - it should work now
3. **Check the console logs** - you should see "User profile created successfully"
4. **Verify in database** - check that the user record was created

## Common RLS Policy Mistakes

### ❌ Wrong: No INSERT policy
```sql
-- Missing INSERT policy will block registration
CREATE POLICY "Users can view own profile" ON users
FOR SELECT USING (auth.uid() = id);
```

### ✅ Correct: Complete policy set
```sql
-- Allow INSERT during registration
CREATE POLICY "Users can insert their own profile" ON users
FOR INSERT WITH CHECK (auth.uid() = id);

-- Allow SELECT for profile access
CREATE POLICY "Users can view own profile" ON users
FOR SELECT USING (auth.uid() = id);
```

## Debugging RLS Issues

### 1. Check if RLS is enabled
```sql
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'users';
```

### 2. List all policies
```sql
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'users';
```

### 3. Test policy manually
```sql
-- Test as authenticated user
SELECT * FROM users WHERE id = auth.uid();
```

## Next Steps

1. **Apply the RLS policies** above
2. **Test user registration** 
3. **Monitor the console logs** for success messages
4. **Verify user profiles are created** in the database
5. **Test login flow** to ensure everything works

## Security Notes

- **Never disable RLS in production**
- **Always use specific policies** rather than broad permissions
- **Test thoroughly** before deploying to production
- **Monitor for policy violations** in your logs 
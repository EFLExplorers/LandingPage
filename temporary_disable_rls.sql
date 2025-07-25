-- Temporary: Disable RLS for testing
-- WARNING: Only use this for testing, re-enable RLS in production

-- Disable RLS on users table
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- Verify RLS is disabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'users';

-- Test: Try to insert a user (this should work now)
-- You can test registration in your app now

-- IMPORTANT: After testing, re-enable RLS with proper policies:
-- Run the fix_rls_policies_now.sql file to re-enable RLS with proper policies 
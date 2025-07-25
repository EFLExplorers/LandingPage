-- Safe RLS Policy Setup for Users Table
-- Run this in your Supabase SQL Editor

-- First, let's see what policies currently exist
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'users';

-- Enable RLS on users table (if not already enabled)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Users can insert their own profile" ON users;
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Admins can view all users" ON users;
DROP POLICY IF EXISTS "Admins can update all users" ON users;
DROP POLICY IF EXISTS "Allow authenticated users to insert their profile" ON users;

-- Create the required policies for user registration and access

-- Policy 1: Allow authenticated users to insert their own profile during registration
-- This is the key policy for registration to work
CREATE POLICY "Allow authenticated users to insert their profile" ON users
FOR INSERT WITH CHECK (
  auth.uid() = id AND 
  auth.uid() IS NOT NULL
);

-- Policy 2: Allow users to view their own profile
CREATE POLICY "Users can view own profile" ON users
FOR SELECT USING (
  auth.uid() = id AND 
  auth.uid() IS NOT NULL
);

-- Policy 3: Allow users to update their own profile
CREATE POLICY "Users can update own profile" ON users
FOR UPDATE USING (
  auth.uid() = id AND 
  auth.uid() IS NOT NULL
);

-- Policy 4: Allow admins to view all users (optional)
CREATE POLICY "Admins can view all users" ON users
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Policy 5: Allow admins to update all users (optional)
CREATE POLICY "Admins can update all users" ON users
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Verify RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'users';

-- List all policies for the users table
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'users'
ORDER BY policyname;

-- Test the policies (optional - run this to verify)
-- This should return the current user's profile if they're authenticated
SELECT * FROM users WHERE id = auth.uid(); 
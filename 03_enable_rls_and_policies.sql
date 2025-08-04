-- Migration Step 3: Enable RLS and Add Security Policies
-- Run this AFTER data migration is complete

-- Enable Row Level Security on the profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop any existing policies to avoid conflicts
DROP POLICY IF EXISTS "Self read" ON public.profiles;
DROP POLICY IF EXISTS "Self write" ON public.profiles;
DROP POLICY IF EXISTS "Admins full access" ON public.profiles;
DROP POLICY IF EXISTS "Allow authenticated users to insert their profile" ON public.profiles;

-- Policy 1: Allow users to insert their own profile during registration
CREATE POLICY "Allow authenticated users to insert their profile" ON public.profiles
FOR INSERT WITH CHECK (
  auth.uid() = id AND 
  auth.uid() IS NOT NULL
);

-- Policy 2: Allow users to view their own profile
CREATE POLICY "Self read" ON public.profiles 
FOR SELECT USING (
  auth.uid() = id AND 
  auth.uid() IS NOT NULL
);

-- Policy 3: Allow users to update their own profile
CREATE POLICY "Self write" ON public.profiles 
FOR UPDATE USING (
  auth.uid() = id AND 
  auth.uid() IS NOT NULL
);

-- Policy 4: Allow admins full access to all profiles
CREATE POLICY "Admins full access" ON public.profiles
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Policy 5: Allow teachers to view student profiles (for teaching purposes)
CREATE POLICY "Teachers can view student profiles" ON public.profiles
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'teacher' AND status = 'approved'
  ) AND 
  role = 'student'
);

-- Verify RLS is enabled
SELECT 
  schemaname, 
  tablename, 
  rowsecurity 
FROM pg_tables 
WHERE tablename = 'profiles';

-- List all policies for the profiles table
SELECT 
  schemaname, 
  tablename, 
  policyname, 
  permissive, 
  roles, 
  cmd, 
  qual, 
  with_check
FROM pg_policies 
WHERE tablename = 'profiles'
ORDER BY policyname; 
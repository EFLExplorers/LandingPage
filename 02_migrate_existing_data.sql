-- Migration Step 2: Migrate Existing Data
-- Run this AFTER the profiles table is created successfully

-- First, let's see what data we have in the current users table
SELECT 
  COUNT(*) as total_users,
  COUNT(CASE WHEN role = 'student' THEN 1 END) as students,
  COUNT(CASE WHEN role = 'teacher' THEN 1 END) as teachers,
  COUNT(CASE WHEN role = 'admin' THEN 1 END) as admins,
  COUNT(CASE WHEN approved = true THEN 1 END) as approved_users
FROM public.users;

-- Migrate existing data to the new profiles table
INSERT INTO public.profiles (id, email, first_name, last_name, role, status, created_at, approved_at)
SELECT
  id,
  email,
  first_name,
  last_name,
  role::public.role_enum,
  CASE
    WHEN role = 'teacher' AND approved = true THEN 'approved'::public.status_enum
    WHEN role = 'student' AND approved = true THEN 'approved'::public.status_enum
    WHEN role = 'admin' THEN 'approved'::public.status_enum
    ELSE 'pending'::public.status_enum
  END,
  created_at,
  CASE 
    WHEN approved = true THEN created_at
    ELSE NULL
  END
FROM public.users
ON CONFLICT (id) DO NOTHING; -- Skip if profile already exists

-- Verify the migration
SELECT 
  COUNT(*) as total_profiles,
  COUNT(CASE WHEN role = 'student' THEN 1 END) as students,
  COUNT(CASE WHEN role = 'teacher' THEN 1 END) as teachers,
  COUNT(CASE WHEN role = 'admin' THEN 1 END) as admins,
  COUNT(CASE WHEN status = 'approved' THEN 1 END) as approved_profiles,
  COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_profiles
FROM public.profiles;

-- Show a sample of migrated data
SELECT 
  id, 
  email, 
  first_name, 
  last_name, 
  role, 
  status, 
  created_at, 
  approved_at
FROM public.profiles 
LIMIT 10; 
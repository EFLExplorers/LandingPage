-- Migration Step 5: Cleanup Old Table (RUN ONLY AFTER TESTING)
-- WARNING: This will permanently delete the old users table
-- Only run this after you've verified everything works with the new profiles table

-- First, verify that all data has been migrated successfully
SELECT 
  'users table count' as table_name, COUNT(*) as count
FROM public.users
UNION ALL
SELECT 
  'profiles table count' as table_name, COUNT(*) as count
FROM public.profiles;

-- Verify that all users from the old table exist in the new table
SELECT 
  COUNT(*) as missing_profiles
FROM public.users u
LEFT JOIN public.profiles p ON u.id = p.id
WHERE p.id IS NULL;

-- If the above query returns 0, it's safe to proceed
-- If it returns any number > 0, investigate the missing profiles first

-- Optional: Create a backup of the old table before dropping
-- CREATE TABLE public.users_backup AS SELECT * FROM public.users;

-- Drop the old users table (UNCOMMENT ONLY AFTER VERIFICATION)
-- DROP TABLE public.users;

-- Verify the old table is gone
-- SELECT table_name FROM information_schema.tables WHERE table_name = 'users';

-- Clean up any old RLS policies (they should be gone with the table)
-- SELECT schemaname, tablename, policyname FROM pg_policies WHERE tablename = 'users';

-- Final verification - check that profiles table is working
SELECT 
  COUNT(*) as total_profiles,
  COUNT(CASE WHEN role = 'student' THEN 1 END) as students,
  COUNT(CASE WHEN role = 'teacher' THEN 1 END) as teachers,
  COUNT(CASE WHEN role = 'admin' THEN 1 END) as admins,
  COUNT(CASE WHEN status = 'approved' THEN 1 END) as approved,
  COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending
FROM public.profiles; 
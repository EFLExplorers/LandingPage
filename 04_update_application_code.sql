-- Migration Step 4: Application Code Updates Required
-- This file contains the SQL queries you'll need to update your application code

-- 1. Update your create-profile API endpoint
-- Change from: .from('users')
-- Change to: .from('profiles')

-- 2. Update your auth context queries
-- Change from: .from('users')
-- Change to: .from('profiles')

-- 3. Update your debug utilities
-- Change from: .from('users')
-- Change to: .from('profiles')

-- 4. Update your role checks
-- The role field is now an enum, so you can use it directly
-- Example: WHERE role = 'teacher' AND status = 'approved'

-- 5. Update your status checks
-- Replace 'approved' boolean field with 'status' enum field
-- Old: WHERE approved = true
-- New: WHERE status = 'approved'

-- 6. Update your subscription logic
-- New field: subscription (enum: 'free', 'trial', 'active', 'past_due', 'canceled')

-- 7. Update your admin queries
-- Admins can now query all profiles with proper RLS policies

-- 8. Update your teacher approval logic
-- New field: approved_at (timestamp when user was approved)

-- 9. Update your last login tracking
-- New field: last_login_at (timestamp of last login)

-- 10. Update your user creation logic
-- New default values:
-- - role: 'student'
-- - status: 'pending' (for teachers), 'approved' (for students)
-- - subscription: 'free'

-- Example queries for your application:

-- Get current user profile
SELECT * FROM profiles WHERE id = auth.uid();

-- Get all approved teachers
SELECT * FROM profiles WHERE role = 'teacher' AND status = 'approved';

-- Get all students with active subscriptions
SELECT * FROM profiles WHERE role = 'student' AND subscription = 'active';

-- Get pending teacher approvals (admin only)
SELECT * FROM profiles WHERE role = 'teacher' AND status = 'pending';

-- Update user status (admin only)
UPDATE profiles SET status = 'approved', approved_at = NOW() WHERE id = 'user-id';

-- Update last login
UPDATE profiles SET last_login_at = NOW() WHERE id = auth.uid();

-- Update subscription status
UPDATE profiles SET subscription = 'active' WHERE id = auth.uid(); 
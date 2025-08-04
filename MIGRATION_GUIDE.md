# Database Migration Guide: Users → Profiles Table

This guide will help you safely migrate from the old `users` table to the new `profiles` table with proper enums and RLS policies.

## 🚨 IMPORTANT: Backup First!

Before starting any migration:
1. Export your current `users` table data as CSV from Supabase dashboard
2. Take a snapshot of your current database state
3. Test the migration on a staging environment first

## 📋 Migration Steps

### Step 1: Create New Structure
Run `01_create_enums_and_profiles_table.sql` in your Supabase SQL Editor.

This will:
- Create new enum types: `role_enum`, `status_enum`, `subscription_enum`
- Create the new `profiles` table with proper structure
- Add performance indexes

**Expected Output:** Table structure verification showing all columns.

### Step 2: Migrate Existing Data
Run `02_migrate_existing_data.sql` in your Supabase SQL Editor.

This will:
- Show current data statistics
- Migrate all existing users to the new profiles table
- Convert the `approved` boolean to `status` enum
- Set appropriate `approved_at` timestamps

**Expected Output:** Data migration verification showing user counts.

### Step 3: Enable Security
Run `03_enable_rls_and_policies.sql` in your Supabase SQL Editor.

This will:
- Enable Row Level Security on the profiles table
- Create policies for user self-access
- Create policies for admin access
- Create policies for teacher-student access

**Expected Output:** RLS verification and policy listing.

### Step 4: Update Application Code
The following files have been updated to use the new `profiles` table:

- ✅ `src/pages/api/auth/create-profile.ts` - Updated to use profiles table
- ✅ `src/utils/debugUserProfile.ts` - Updated to use profiles table

**Additional files that need updating:**
- Any auth context files that query the users table
- Any components that check user roles or approval status
- Any admin panels that manage users

### Step 5: Test Thoroughly
1. **Test Registration:**
   - Register as a new student (should auto-approve)
   - Register as a new teacher (should be pending)
   - Verify profiles are created correctly

2. **Test Login:**
   - Login with existing users
   - Verify role and status are correct
   - Check that pending teachers can't access restricted areas

3. **Test Admin Functions:**
   - Approve pending teachers
   - View all user profiles
   - Update user statuses

4. **Test RLS Policies:**
   - Verify users can only see their own profile
   - Verify admins can see all profiles
   - Verify teachers can see student profiles

### Step 6: Cleanup (Optional)
Run `05_cleanup_old_table.sql` in your Supabase SQL Editor.

**⚠️ WARNING:** This permanently deletes the old `users` table. Only run after thorough testing!

## 🔄 Data Structure Changes

### Old Structure (users table):
```sql
- id (uuid)
- email (text)
- first_name (text)
- last_name (text)
- role (text)
- approved (boolean)
- created_at (timestamp)
```

### New Structure (profiles table):
```sql
- id (uuid) - PRIMARY KEY, REFERENCES auth.users(id)
- email (text) - UNIQUE
- first_name (text)
- last_name (text)
- role (role_enum) - 'student', 'teacher', 'admin'
- status (status_enum) - 'pending', 'approved', 'rejected', 'suspended'
- subscription (subscription_enum) - 'free', 'trial', 'active', 'past_due', 'canceled'
- created_at (timestamptz)
- approved_at (timestamptz) - When user was approved
- last_login_at (timestamptz) - Last login timestamp
```

## 🔐 RLS Policies

The new profiles table has these security policies:

1. **Self Access:** Users can read/update their own profile
2. **Registration:** Users can insert their own profile during signup
3. **Admin Access:** Admins have full access to all profiles
4. **Teacher Access:** Approved teachers can view student profiles

## 🚨 Common Issues & Solutions

### Issue: "Table 'profiles' does not exist"
**Solution:** Run Step 1 SQL script first.

### Issue: "Enum type does not exist"
**Solution:** Make sure you ran the enum creation in Step 1.

### Issue: "RLS policy violation"
**Solution:** Check that RLS policies are properly set up in Step 3.

### Issue: "User not found in profiles table"
**Solution:** Verify data migration completed successfully in Step 2.

### Issue: "Role field is invalid"
**Solution:** Update your code to use the new enum values instead of strings.

## 📊 Verification Queries

After migration, run these queries to verify everything is working:

```sql
-- Check total user counts
SELECT COUNT(*) FROM profiles;

-- Check role distribution
SELECT role, COUNT(*) FROM profiles GROUP BY role;

-- Check status distribution
SELECT status, COUNT(*) FROM profiles GROUP BY status;

-- Check for any missing data
SELECT COUNT(*) FROM profiles WHERE email IS NULL;

-- Verify RLS is working
SELECT rowsecurity FROM pg_tables WHERE tablename = 'profiles';
```

## 🆘 Rollback Plan

If something goes wrong:

1. **Stop the application** immediately
2. **Restore from backup** if you have one
3. **Drop the profiles table** if it was created
4. **Drop the enum types** if they were created
5. **Restart with the old users table**

## 📞 Support

If you encounter issues:
1. Check the Supabase logs for detailed error messages
2. Verify each step completed successfully
3. Test with a small subset of data first
4. Contact your database administrator if needed

---

**Remember:** Take your time with each step and verify everything works before proceeding to the next step! 
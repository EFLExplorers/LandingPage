-- Migration Step 1: Create Enums and Profiles Table
-- Run this in your Supabase SQL Editor

-- 1. Define enums
CREATE TYPE public.role_enum AS ENUM ('student','teacher','admin');
CREATE TYPE public.status_enum AS ENUM ('pending','approved','rejected','suspended');
CREATE TYPE public.subscription_enum AS ENUM ('free','trial','active','past_due','canceled');

-- 2. Create profiles table
CREATE TABLE public.profiles (
  id             uuid                PRIMARY KEY REFERENCES auth.users (id),
  email          text                NOT NULL UNIQUE,
  first_name     text,
  last_name      text,
  role           public.role_enum    NOT NULL DEFAULT 'student',
  status         public.status_enum  NOT NULL DEFAULT 'pending',
  subscription   public.subscription_enum DEFAULT 'free',
  created_at     timestamptz         NOT NULL DEFAULT NOW(),
  approved_at    timestamptz,
  last_login_at  timestamptz
);

-- 3. Create indexes for better performance
CREATE INDEX idx_profiles_email ON public.profiles(email);
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_profiles_status ON public.profiles(status);
CREATE INDEX idx_profiles_subscription ON public.profiles(subscription);

-- 4. Verify the table was created
SELECT 
  table_name, 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'profiles' 
ORDER BY ordinal_position; 
-- =====================================================
-- Add INSERT policy for users table
-- =====================================================
-- Run this in Supabase SQL Editor
-- =====================================================

-- Allow authenticated users to insert new users
CREATE POLICY "Authenticated users can insert users" ON users
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Alternatively, if you want anyone to be able to create users (less secure):
-- DROP POLICY IF EXISTS "Authenticated users can insert users" ON users;
-- CREATE POLICY "Anyone can insert users" ON users
--     FOR INSERT WITH CHECK (true);

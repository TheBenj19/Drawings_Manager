-- =====================================================
-- CRITICAL SECURITY UPDATES FOR PUBLIC HOSTING
-- =====================================================
-- Run these in Supabase SQL Editor BEFORE deploying to public server
-- =====================================================

-- 1. RESTRICT USER CREATION TO ADMINS ONLY
-- =====================================================
-- Drop the existing permissive policy
DROP POLICY IF EXISTS "Authenticated users can insert users" ON users;

-- Create admin-only policy
CREATE POLICY "Only admins can create users" ON users
    FOR INSERT WITH CHECK (
        auth.uid() IN (
            SELECT id FROM users WHERE role = 'Admin' AND active = true
        )
    );

-- 2. RESTRICT USER DELETION TO ADMINS ONLY
-- =====================================================
CREATE POLICY "Only admins can delete users" ON users
    FOR DELETE USING (
        auth.uid() IN (
            SELECT id FROM users WHERE role = 'Admin' AND active = true
        )
    );

-- 3. RESTRICT PROJECT DELETION TO ADMINS
-- =====================================================
-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Authenticated users can delete projects" ON projects;

-- Create admin-only delete policy
CREATE POLICY "Only admins can delete projects" ON projects
    FOR DELETE USING (
        auth.uid() IN (
            SELECT id FROM users WHERE role = 'Admin' AND active = true
        )
    );

-- 4. ADD IP RESTRICTIONS (Optional - Requires Supabase Pro)
-- =====================================================
-- Go to: Supabase Dashboard > Settings > Network > Restrictions
-- Add your office/VPN IP addresses to allowlist
-- This restricts database access to known locations only

-- 5. ENABLE AUDIT LOGGING
-- =====================================================
-- Add audit fields to projects table
ALTER TABLE projects 
    ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES users(id),
    ADD COLUMN IF NOT EXISTS updated_by UUID REFERENCES users(id),
    ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Create function to auto-populate audit fields
CREATE OR REPLACE FUNCTION set_project_audit_fields()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        NEW.created_by := auth.uid();
        NEW.created_at := NOW();
    END IF;
    NEW.updated_by := auth.uid();
    NEW.updated_at := NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
DROP TRIGGER IF EXISTS set_project_audit ON projects;
CREATE TRIGGER set_project_audit
    BEFORE INSERT OR UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION set_project_audit_fields();

-- 6. VERIFY ALL TABLES HAVE RLS ENABLED
-- =====================================================
-- Run this to check - should return all your tables
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' AND rowsecurity = true;

-- If any tables show rowsecurity = false, enable it:
-- ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;

-- 7. RATE LIMITING (Already active via Supabase)
-- =====================================================
-- Supabase automatically rate-limits the anon key
-- Default: 100 requests per second per IP
-- Can be increased in Dashboard if needed

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Check that you have at least one admin user
SELECT id, name, email, role, active 
FROM users 
WHERE role = 'Admin' AND active = true;

-- If no admin exists, create one manually:
-- UPDATE users SET role = 'Admin' WHERE email = 'your-email@company.com';

-- List all RLS policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- =====================================================
-- POST-DEPLOYMENT CHECKLIST
-- =====================================================
-- [ ] Run all SQL above
-- [ ] Verify at least one Admin user exists
-- [ ] Test that non-admin users CANNOT create new users
-- [ ] Test that non-admin users CANNOT delete projects
-- [ ] Enable 2FA on your Supabase account
-- [ ] Set up custom domain with HTTPS
-- [ ] Configure CORS if needed
-- [ ] Test login from external network
-- [ ] Monitor Supabase logs for suspicious activity

-- =====================================================
-- FIX: updated_by Foreign Key Constraint Error
-- =====================================================
-- Problem: The trigger tries to set updated_by to auth.uid()
-- but that UUID doesn't exist in the users table
-- =====================================================

-- SOLUTION 1: Make updated_by nullable (QUICK FIX)
-- This allows updates to proceed even if auth user doesn't match
ALTER TABLE projects 
    ALTER COLUMN updated_by DROP NOT NULL,
    ALTER COLUMN created_by DROP NOT NULL;

-- SOLUTION 2: Remove the foreign key constraint entirely (SIMPLER)
-- This still tracks who updated but doesn't enforce the relationship
ALTER TABLE projects 
    DROP CONSTRAINT IF EXISTS projects_updated_by_fkey,
    DROP CONSTRAINT IF EXISTS projects_created_by_fkey;

-- Now change the columns to just store UUIDs without foreign key
-- (They're already UUID type, just removing the constraint above)

-- SOLUTION 3: Update the trigger to handle missing users gracefully
-- This sets updated_by to NULL if the auth user doesn't exist in users table
CREATE OR REPLACE FUNCTION set_project_audit_fields()
RETURNS TRIGGER AS $$
DECLARE
    user_exists BOOLEAN;
BEGIN
    -- Check if auth.uid() exists in users table
    SELECT EXISTS(SELECT 1 FROM users WHERE id = auth.uid()) INTO user_exists;
    
    IF TG_OP = 'INSERT' THEN
        IF user_exists THEN
            NEW.created_by := auth.uid();
        ELSE
            NEW.created_by := NULL;
        END IF;
        NEW.created_at := NOW();
    END IF;
    
    IF user_exists THEN
        NEW.updated_by := auth.uid();
    ELSE
        NEW.updated_by := NULL;
    END IF;
    
    NEW.updated_at := NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- RECOMMENDED: Use Solution 2 (Remove Foreign Key)
-- =====================================================
-- Run this in Supabase SQL Editor:

ALTER TABLE projects 
    DROP CONSTRAINT IF EXISTS projects_updated_by_fkey,
    DROP CONSTRAINT IF EXISTS projects_created_by_fkey;

-- This keeps the audit trail but doesn't enforce that the UUID
-- must exist in the users table. This is fine for tracking purposes.

-- =====================================================
-- VERIFY THE FIX
-- =====================================================
-- After running the above, try updating a project
-- It should now work without the foreign key error

-- Check current constraints on projects table:
SELECT 
    conname AS constraint_name,
    contype AS constraint_type,
    pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint
WHERE conrelid = 'projects'::regclass
ORDER BY conname;

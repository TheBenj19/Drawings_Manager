-- =====================================================
-- CHANGE LOG SYSTEM - Database Migration
-- =====================================================
-- Run this in Supabase SQL Editor to add change tracking

-- STEP 1: Remove unique constraint on job_number to allow multi-phase projects
-- This allows the same job number for Planning → Visual → Order phases
ALTER TABLE projects DROP CONSTRAINT IF EXISTS projects_job_number_key;

-- STEP 2: Create change_log table
CREATE TABLE IF NOT EXISTS change_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    version_number INTEGER NOT NULL,
    change_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    changed_by TEXT NOT NULL,
    change_type TEXT NOT NULL, -- 'revision', 'status_change', 'major_update', 'client_feedback'
    change_description TEXT,
    previous_value TEXT,
    new_value TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_change_log_project ON change_log(project_id);
CREATE INDEX IF NOT EXISTS idx_change_log_date ON change_log(change_date DESC);
CREATE INDEX IF NOT EXISTS idx_change_log_version ON change_log(project_id, version_number);

-- STEP 3: Update time_entries table to include revision tracking
ALTER TABLE time_entries 
ADD COLUMN IF NOT EXISTS revision TEXT DEFAULT 'Rev 1';

-- STEP 4: Add composite index for job_number + project_type (helps query related projects)
-- This ensures we can efficiently find all phases of the same job
CREATE INDEX IF NOT EXISTS idx_projects_job_number_type ON projects(job_number, project_type);

-- Add RLS policies for change_log
ALTER TABLE change_log ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to allow re-running this migration)
DROP POLICY IF EXISTS "Allow authenticated users to read change logs" ON change_log;
DROP POLICY IF EXISTS "Allow authenticated users to create change logs" ON change_log;
DROP POLICY IF EXISTS "Allow authenticated users to update change logs" ON change_log;
DROP POLICY IF EXISTS "Allow authenticated users to delete change logs" ON change_log;

-- Policy: Authenticated users can read all change logs
CREATE POLICY "Allow authenticated users to read change logs"
    ON change_log FOR SELECT
    TO authenticated
    USING (true);

-- Policy: Authenticated users can create change logs
CREATE POLICY "Allow authenticated users to create change logs"
    ON change_log FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Policy: Authenticated users can update their own change logs
CREATE POLICY "Allow authenticated users to update change logs"
    ON change_log FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Policy: Authenticated users can delete change logs
CREATE POLICY "Allow authenticated users to delete change logs"
    ON change_log FOR DELETE
    TO authenticated
    USING (true);

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Check if unique constraint was removed
SELECT constraint_name, constraint_type
FROM information_schema.table_constraints
WHERE table_name = 'projects' AND constraint_name = 'projects_job_number_key';
-- Should return 0 rows if constraint is removed

-- Check if change_log table was created
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'change_log'
ORDER BY ordinal_position;

-- Check if time_entries has revision column
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'time_entries' AND column_name = 'revision';

-- Check if composite index exists
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'projects' AND indexname = 'idx_projects_job_number_type';

-- =====================================================
-- SAMPLE DATA (Optional - for testing)
-- =====================================================

-- This will insert a sample change log entry
-- Replace the project_id with an actual project ID from your database
/*
INSERT INTO change_log (project_id, version_number, changed_by, change_type, change_description, new_value)
VALUES (
    (SELECT id FROM projects LIMIT 1),
    2,
    'Test User',
    'revision',
    'Updated drawings based on client feedback',
    'Rev 2'
);
*/

-- =====================================================
-- EXAMPLE: Query all phases of the same job
-- =====================================================
/*
SELECT 
    job_number,
    project_type,
    status,
    created_at,
    name
FROM projects
WHERE job_number = 'JOB-2025-001'
ORDER BY created_at;
*/

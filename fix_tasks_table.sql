-- Fix for existing tasks table with foreign key constraint issue
-- Run this if you already created the tasks table and are getting foreign key errors

-- Drop the foreign key constraint if it exists
ALTER TABLE public.tasks DROP CONSTRAINT IF EXISTS tasks_created_by_fkey;

-- Make sure created_by column exists and is nullable
ALTER TABLE public.tasks ALTER COLUMN created_by DROP NOT NULL;

-- Refresh schema
NOTIFY pgrst, 'reload schema';

-- Test by checking the table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'tasks' 
AND table_schema = 'public';

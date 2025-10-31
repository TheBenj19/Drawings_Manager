-- Add status history table
CREATE TABLE IF NOT EXISTS status_history (
    id BIGSERIAL PRIMARY KEY,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    old_status TEXT,
    new_status TEXT,
    changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    changed_by TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_status_history_project_id ON status_history(project_id);
CREATE INDEX IF NOT EXISTS idx_status_history_changed_at ON status_history(changed_at);

-- Add client feedback tracking columns to projects table
ALTER TABLE projects ADD COLUMN IF NOT EXISTS client_review_sent_date DATE;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS client_review_received_date DATE;

-- Add brief feedback column
ALTER TABLE projects ADD COLUMN IF NOT EXISTS brief_feedback TEXT;

-- Add BOM feedback column
ALTER TABLE projects ADD COLUMN IF NOT EXISTS bom_feedback TEXT;

-- Add designer capacity table
CREATE TABLE IF NOT EXISTS designer_capacity (
    id BIGSERIAL PRIMARY KEY,
    designer_name TEXT UNIQUE NOT NULL,
    capacity_hours_per_week NUMERIC DEFAULT 40,
    current_workload_hours NUMERIC DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add project complexity column
ALTER TABLE projects ADD COLUMN IF NOT EXISTS complexity_score INTEGER DEFAULT 3 CHECK (complexity_score BETWEEN 1 AND 5);

-- Enable RLS on new tables
ALTER TABLE status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE designer_capacity ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for status_history (drop if exists first)
DROP POLICY IF EXISTS "Enable read access for all users" ON status_history;
DROP POLICY IF EXISTS "Enable insert access for all users" ON status_history;
DROP POLICY IF EXISTS "Enable update access for all users" ON status_history;
DROP POLICY IF EXISTS "Enable delete access for all users" ON status_history;

CREATE POLICY "Enable read access for all users" ON status_history FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON status_history FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON status_history FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON status_history FOR DELETE USING (true);

-- Create RLS policies for designer_capacity (drop if exists first)
DROP POLICY IF EXISTS "Enable read access for all users" ON designer_capacity;
DROP POLICY IF EXISTS "Enable insert access for all users" ON designer_capacity;
DROP POLICY IF EXISTS "Enable update access for all users" ON designer_capacity;
DROP POLICY IF EXISTS "Enable delete access for all users" ON designer_capacity;

CREATE POLICY "Enable read access for all users" ON designer_capacity FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON designer_capacity FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON designer_capacity FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON designer_capacity FOR DELETE USING (true);

COMMENT ON TABLE status_history IS 'Tracks all status changes for projects to enable accurate time-in-status calculations';
COMMENT ON TABLE designer_capacity IS 'Tracks designer capacity and workload for utilization calculations';
COMMENT ON COLUMN projects.brief_feedback IS 'Brief feedback notes for the project';
COMMENT ON COLUMN projects.client_review_sent_date IS 'Date when project was sent to client for review';
COMMENT ON COLUMN projects.client_review_received_date IS 'Date when client feedback was received';
COMMENT ON COLUMN projects.complexity_score IS 'Project complexity rating from 1 (simple) to 5 (very complex)';
COMMENT ON COLUMN projects.bom_feedback IS 'BOM error feedback - empty means error-free, text indicates issues';

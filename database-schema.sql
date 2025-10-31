-- =====================================================
-- Drawing Manager Database Schema for Supabase
-- =====================================================
-- Run this in Supabase SQL Editor
-- This creates all tables, indexes, and sample data
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. USERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('Admin', 'Designer', 'Manager')),
    email TEXT UNIQUE NOT NULL,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster username lookups
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- =====================================================
-- 2. PROJECTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_number TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    client TEXT NOT NULL,
    project_type TEXT NOT NULL CHECK (project_type IN ('Planning', 'Visual', 'Order')),
    order_type TEXT NOT NULL,
    status TEXT NOT NULL,
    due_date DATE NOT NULL,
    order_date DATE NOT NULL,
    start_date DATE,
    first_issue_date DATE,
    first_issue_target DATE,
    days_to_issue INTEGER DEFAULT 0,
    sales_person TEXT NOT NULL,
    designer TEXT NOT NULL,
    assignee TEXT NOT NULL,
    current_version TEXT DEFAULT 'Rev 1',
    priority TEXT DEFAULT 'Medium' CHECK (priority IN ('Low', 'Medium', 'High')),
    description TEXT,
    budget TEXT,
    progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    signed_off TEXT DEFAULT 'No',
    issued_to_production DATE,
    sign_off_lead_time INTEGER DEFAULT 0,
    total_changes INTEGER DEFAULT 0,
    structural_calcs TEXT DEFAULT 'No',
    calcs_type TEXT,
    calcs_status TEXT,
    calcs_date_requested DATE,
    oak_m3 DECIMAL(10,2),
    sw_m3 DECIMAL(10,2),
    frame_price DECIMAL(12,2),
    total_time_minutes INTEGER DEFAULT 0,
    timer_running BOOLEAN DEFAULT false,
    timer_start_time TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES users(id)
);

-- Indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_projects_job_number ON projects(job_number);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_designer ON projects(designer);
CREATE INDEX IF NOT EXISTS idx_projects_due_date ON projects(due_date);
CREATE INDEX IF NOT EXISTS idx_projects_client ON projects(client);
CREATE INDEX IF NOT EXISTS idx_projects_timer_running ON projects(timer_running);

-- =====================================================
-- 3. TIME ENTRIES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS time_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    duration INTEGER NOT NULL, -- minutes
    type TEXT NOT NULL CHECK (type IN ('auto', 'manual')),
    description TEXT,
    revision TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES users(id)
);

-- Index for faster project lookups
CREATE INDEX IF NOT EXISTS idx_time_entries_project_id ON time_entries(project_id);
CREATE INDEX IF NOT EXISTS idx_time_entries_date ON time_entries(date);

-- =====================================================
-- 4. PROJECT HISTORY TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS project_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    action TEXT NOT NULL, -- 'created', 'updated', 'status_changed', etc.
    field_changed TEXT,
    old_value TEXT,
    new_value TEXT,
    changed_by UUID REFERENCES users(id),
    changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster project history lookups
CREATE INDEX IF NOT EXISTS idx_project_history_project_id ON project_history(project_id);
CREATE INDEX IF NOT EXISTS idx_project_history_changed_at ON project_history(changed_at);

-- =====================================================
-- 5. USER KPIs TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS user_kpis (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    projects_completed INTEGER DEFAULT 0,
    projects_in_progress INTEGER DEFAULT 0,
    total_time_logged INTEGER DEFAULT 0, -- minutes
    average_completion_time DECIMAL(10,2) DEFAULT 0, -- days
    on_time_delivery DECIMAL(5,2) DEFAULT 0, -- percentage
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster user lookups
CREATE INDEX IF NOT EXISTS idx_user_kpis_user_id ON user_kpis(user_id);

-- =====================================================
-- TRIGGERS FOR AUTO-UPDATE TIMESTAMPS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to users table
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Apply trigger to projects table
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Apply trigger to user_kpis table
DROP TRIGGER IF EXISTS update_user_kpis_updated_at ON user_kpis;
CREATE TRIGGER update_user_kpis_updated_at
    BEFORE UPDATE ON user_kpis
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_kpis ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can read all users" ON users
    FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Projects table policies (all authenticated users can read/write)
CREATE POLICY "Anyone can read projects" ON projects
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert projects" ON projects
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update projects" ON projects
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete projects" ON projects
    FOR DELETE USING (auth.role() = 'authenticated');

-- Time entries table policies
CREATE POLICY "Anyone can read time entries" ON time_entries
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert time entries" ON time_entries
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update time entries" ON time_entries
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete time entries" ON time_entries
    FOR DELETE USING (auth.role() = 'authenticated');

-- Project history table policies
CREATE POLICY "Anyone can read project history" ON project_history
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert history" ON project_history
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- User KPIs table policies
CREATE POLICY "Anyone can read user KPIs" ON user_kpis
    FOR SELECT USING (true);

CREATE POLICY "Users can update own KPIs" ON user_kpis
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "System can insert KPIs" ON user_kpis
    FOR INSERT WITH CHECK (true);

-- =====================================================
-- INSERT SAMPLE DATA (Your existing 5 users + 8 projects)
-- =====================================================

-- Insert Users (Note: Password hashing will be handled by Supabase Auth)
INSERT INTO users (id, username, name, role, email, active) VALUES
    ('00000000-0000-0000-0000-000000000001', 'admin', 'Administrator', 'Admin', 'admin@company.com', true),
    ('00000000-0000-0000-0000-000000000002', 'john.smith', 'John Smith', 'Designer', 'john.smith@company.com', true),
    ('00000000-0000-0000-0000-000000000003', 'sarah.johnson', 'Sarah Johnson', 'Designer', 'sarah.johnson@company.com', true),
    ('00000000-0000-0000-0000-000000000004', 'mike.chen', 'Mike Chen', 'Designer', 'mike.chen@company.com', true),
    ('00000000-0000-0000-0000-000000000005', 'emma.davis', 'Emma Davis', 'Designer', 'emma.davis@company.com', true)
ON CONFLICT (username) DO NOTHING;

-- Insert User KPIs (initialize with zeros)
INSERT INTO user_kpis (user_id, projects_completed, projects_in_progress, total_time_logged, average_completion_time, on_time_delivery)
SELECT id, 0, 0, 0, 0, 0
FROM users
ON CONFLICT (user_id) DO NOTHING;

-- Insert Projects (all 8 sample projects from your app)
INSERT INTO projects (
    job_number, name, client, project_type, order_type, status, due_date, order_date, start_date,
    first_issue_date, first_issue_target, days_to_issue, sales_person, designer, assignee,
    current_version, priority, description, budget, progress, signed_off, issued_to_production,
    sign_off_lead_time, total_changes, structural_calcs, calcs_type, calcs_status, calcs_date_requested,
    oak_m3, sw_m3, frame_price, total_time_minutes, timer_running, notes
) VALUES
-- Project 1
('JOB-2025-001', 'Office Building Renovation', 'ABC Corporation', 'Order', 'New Build', 'In Progress',
 '2025-11-15', '2025-09-01', '2025-09-01', '2025-09-15', '2025-09-12', 14, 'Michael Brown', 'John Smith', 'John Smith',
 'Rev 3', 'High', 'Complete renovation of the main office building including structural improvements.',
 '$450,000', 65, 'No', '2025-09-20', 5, 3, 'Yes', 'L&P''s & Frame Calcs', 'Received', '2025-09-05',
 12.5, 8.3, 45000.00, 210, false, 'Client requested changes to the lobby design. Revised plans submitted for approval.'),

-- Project 2
('JOB-2025-002', 'Residential Complex - Phase 2', 'XYZ Developers', 'Planning', 'Renovation', 'Requested',
 '2025-12-01', '2025-10-01', '2025-10-15', '2025-10-18', '2025-10-15', 17, 'Sarah Williams', 'Sarah Johnson', 'Sarah Johnson',
 'Rev 1', 'Medium', 'Second phase of residential development including 120 units across 3 buildings.',
 '$2,500,000', 25, 'No', NULL, 0, 1, 'Yes', NULL, 'Pending', NULL,
 NULL, NULL, NULL, 0, false, 'Waiting for planning permission approval from local authorities.'),

-- Project 3
('JOB-2025-003', 'Commercial Plaza Design', 'Metro Properties', 'Visual', 'Commercial', 'Changing',
 '2025-10-30', '2025-08-01', '2025-08-01', '2025-08-10', '2025-08-12', 9, 'David Lee', 'Mike Chen', 'Mike Chen',
 'Rev 5', 'High', 'Modern commercial plaza with retail spaces, restaurants, and entertainment facilities.',
 '$1,200,000', 90, 'Pending', '2025-09-01', 8, 5, 'Yes', NULL, 'Approved', NULL,
 NULL, NULL, NULL, 0, false, 'Client reviewing final drawings. Minor revisions expected.'),

-- Project 4
('JOB-2025-004', 'Municipal Park Layout', 'City Council', 'Planning', 'Landscape', 'Completed',
 '2025-10-20', '2025-07-01', '2025-07-01', '2025-07-20', '2025-07-22', 19, 'Jennifer Davis', 'Emma Davis', 'Emma Davis',
 'Rev 2', 'Low', 'Landscape design for new municipal park including walking paths and green spaces.',
 '$180,000', 100, 'Yes', '2025-08-05', 3, 2, 'No', NULL, 'N/A', NULL,
 NULL, NULL, NULL, 0, false, 'Project successfully completed and delivered to client.'),

-- Project 5
('JOB-2025-005', 'Industrial Warehouse', 'Logistics Inc', 'Order', 'Industrial', 'Signed Off',
 '2025-11-25', '2025-09-15', '2025-09-15', '2025-10-01', '2025-09-30', 16, 'Robert Taylor', 'John Smith', 'John Smith',
 'Rev 2', 'Medium', 'Large industrial warehouse facility with office spaces and loading docks.',
 '$850,000', 85, 'Yes', NULL, 0, 2, 'Yes', NULL, 'In Review', NULL,
 NULL, NULL, NULL, 0, false, 'Structural engineer reviewing foundation design. Signed off by client.'),

-- Project 6
('JOB-2025-006', 'Retail Store Mockup', 'Fashion Boutique', 'Visual', 'Commercial', 'In Progress',
 '2025-11-10', '2025-10-01', '2025-10-01', NULL, '2025-11-05', 0, 'Michael Brown', 'Mike Chen', 'Mike Chen',
 'Rev 1', 'High', '3D visualization and mockup for new retail store layout.',
 '$45,000', 60, 'No', NULL, 0, 0, 'No', NULL, 'N/A', NULL,
 NULL, NULL, NULL, 0, false, 'Client requested additional lighting options for display areas.'),

-- Project 7
('JOB-2025-007', 'Apartment Complex Plans', 'Urban Developers', 'Planning', 'Renovation', 'On Hold',
 '2025-12-15', '2025-09-20', '2025-09-20', NULL, '2025-10-20', 0, 'Sarah Williams', 'Sarah Johnson', 'Sarah Johnson',
 'Rev 1', 'Low', 'Planning drawings for multi-story apartment complex.',
 '$320,000', 35, 'No', NULL, 0, 0, 'Yes', NULL, 'Required', NULL,
 NULL, NULL, NULL, 0, false, 'On hold pending client financing approval.'),

-- Project 8
('JOB-2025-008', 'Shopping Mall Order', 'Retail Group', 'Order', 'Commercial', 'Sent to Production',
 '2025-10-25', '2025-08-15', '2025-08-15', '2025-08-30', '2025-09-01', 15, 'David Lee', 'Emma Davis', 'Emma Davis',
 'Rev 4', 'High', 'Complete order package for shopping mall renovation.',
 '$780,000', 100, 'Yes', '2025-09-10', 11, 4, 'Yes', NULL, 'Approved', NULL,
 NULL, NULL, NULL, 0, false, 'All drawings signed off and sent to production team.')
ON CONFLICT (job_number) DO NOTHING;

-- Insert Time Entries for Project 1
INSERT INTO time_entries (project_id, date, duration, type, description, revision)
SELECT id, DATE '2025-09-15', 120, 'auto', 'Initial design work', 'V1'
FROM projects WHERE job_number = 'JOB-2025-001'
UNION ALL
SELECT id, DATE '2025-09-16', 90, 'manual', 'Client meeting', 'V2'
FROM projects WHERE job_number = 'JOB-2025-001';

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================
-- Run these to verify your setup worked:

-- Count tables
-- SELECT COUNT(*) as user_count FROM users;
-- SELECT COUNT(*) as project_count FROM projects;
-- SELECT COUNT(*) as time_entry_count FROM time_entries;

-- View all projects
-- SELECT job_number, name, status, designer FROM projects ORDER BY job_number;

-- =====================================================
-- SUCCESS! Database is ready to use
-- =====================================================

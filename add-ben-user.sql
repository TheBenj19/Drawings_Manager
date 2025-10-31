-- Add Ben's user profile to the database
-- Run this in Supabase SQL Editor

INSERT INTO users (name, email, role, active) 
VALUES ('Ben Janley', 'ben@tradeoakbuildingkits.com', 'Admin', true);

-- Verify it was added:
SELECT * FROM users WHERE email = 'ben@tradeoakbuildingkits.com';

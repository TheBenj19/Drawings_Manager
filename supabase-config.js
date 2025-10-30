// =====================================================
// Supabase Configuration
// =====================================================
// IMPORTANT: Replace these with your actual Supabase credentials
// Find them in: Supabase Dashboard → Project Settings → API
// =====================================================

const SUPABASE_CONFIG = {
    // Your Supabase Project URL
    // Example: https://abcdefghijklmnop.supabase.co
    url: 'https://cudpbnpqzvdlhdnqcuty.supabase.co',
    
    // Your Supabase Anon/Public Key (safe to expose in frontend)
    // Example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1ZHBibnBxenZkbGhkbnFjdXR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5Njk0OTksImV4cCI6MjA3NjU0NTQ5OX0.n-k4QBKG3KsRhBmQ5zHIuYiNyjjHJ-u3-fS-AAGz_h8'
};

// =====================================================
// Initialize Supabase Client
// =====================================================
const supabase = window.supabase.createClient(
    SUPABASE_CONFIG.url,
    SUPABASE_CONFIG.anonKey
);

// =====================================================
// HOW TO GET YOUR CREDENTIALS:
// =====================================================
// 1. Go to your Supabase dashboard: https://app.supabase.com
// 2. Select your project
// 3. Click "Project Settings" (gear icon) in the left sidebar
// 4. Click "API" in the settings menu
// 5. Copy:
//    - Project URL → paste as 'url' above
//    - Project API keys → anon/public → paste as 'anonKey' above
// =====================================================

// Export for use in app.js
window.supabaseClient = supabase;

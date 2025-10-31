# Tasks Feature Troubleshooting

## 409 Error - Table Not Found

The 409 error you're seeing means the `tasks` table doesn't exist in your Supabase database yet.

### ✅ Quick Fix - Run the SQL Migration

1. **Open Supabase Dashboard**
   - Go to https://supabase.com/dashboard
   - Select your project

2. **Navigate to SQL Editor**
   - Click "SQL Editor" in the left sidebar

3. **Run the Migration**
   - Click "New Query"
   - Copy the entire contents of `add_tasks_table.sql`
   - Paste into the SQL editor
   - Click "Run" or press Ctrl+Enter (Cmd+Enter on Mac)

4. **Verify Success**
   - You should see "Success. No rows returned"
   - Go to "Table Editor" and verify the `tasks` table appears

### Expected Table Structure

After running the migration, you should have a `tasks` table with these columns:

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key (auto-generated) |
| title | TEXT | Task title (required) |
| description | TEXT | Task description (optional) |
| assigned_to | TEXT | Team member name |
| due_date | DATE | Target completion date |
| status | TEXT | 'pending', 'in-progress', or 'completed' |
| priority | TEXT | 'Low', 'Medium', or 'High' |
| created_by | UUID | User who created the task |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

### Verify RLS Policies

The migration also creates Row Level Security policies:
- ✅ Enable read access for all authenticated users
- ✅ Enable insert for authenticated users
- ✅ Enable update for authenticated users
- ✅ Enable delete for authenticated users

### Alternative: Manual Table Creation

If the SQL script doesn't work, you can create the table manually in Table Editor:

1. Go to **Table Editor**
2. Click **New Table**
3. Name it: `tasks`
4. Add columns as shown in the structure above
5. Enable RLS in table settings
6. Add policies for authenticated users

### Testing After Setup

1. Refresh your application
2. Click **Tasks** in the sidebar
3. Click **+ New Task**
4. Fill in the form and save
5. Task should appear in the list

### Common Issues

**Issue**: "relation 'public.tasks' does not exist"
- **Solution**: Run the SQL migration script

**Issue**: "permission denied for table tasks"
- **Solution**: Check RLS policies are enabled and configured correctly

**Issue**: "column 'column_name' does not exist"
- **Solution**: Verify all columns match the expected structure

### Need Help?

Check the browser console (F12) for detailed error messages. The error will show:
- Error details
- Task data being sent
- Database response

This helps identify if it's a schema mismatch or permissions issue.

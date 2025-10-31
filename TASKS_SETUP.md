# Tasks Feature Setup Guide

## Overview
A new **Tasks** section has been added to the Drawing Manager application to track and manage team tasks independently from projects.

## Features Added

### 1. **Tasks Page**
- View all tasks in a sortable table
- Filter by status (Pending, In Progress, Completed)
- Quick stats showing task counts by status
- Checkbox to quickly mark tasks complete/incomplete

### 2. **Task Management**
- **Create tasks** with title, description, assignee, due date, status, and priority
- **Edit tasks** to update any field
- **Delete tasks** with confirmation
- **Toggle completion** with a simple checkbox click
- **Assign to team members** from the dropdown

### 3. **Task Properties**
- **Title** (required): Brief task description
- **Description** (optional): Detailed notes
- **Assigned To**: Team member responsible
- **Due Date**: Target completion date
- **Status**: Pending, In Progress, or Completed
- **Priority**: Low, Medium, or High

## Database Setup

### Step 1: Run the SQL Migration
Execute the SQL script in your Supabase dashboard:

1. Go to **SQL Editor** in Supabase
2. Paste the contents of `add_tasks_table.sql`
3. Click **Run**

This creates:
- `tasks` table with all necessary columns
- Indexes for performance
- Row Level Security (RLS) policies
- Proper authentication checks

### Step 2: Verify Table Creation
Check that the `tasks` table appears in your database with these columns:
- `id` (UUID, Primary Key)
- `title` (TEXT, required)
- `description` (TEXT)
- `assigned_to` (TEXT)
- `due_date` (DATE)
- `status` (TEXT: 'pending', 'in-progress', 'completed')
- `priority` (TEXT: 'Low', 'Medium', 'High')
- `created_by` (UUID, references auth.users)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## Usage

### Creating a Task
1. Click **Tasks** in the sidebar
2. Click **+ New Task** button
3. Fill in task details
4. Click **Save Task**

### Editing a Task
1. Find the task in the list
2. Click **Edit** button
3. Update fields as needed
4. Click **Save Task**

### Quick Complete/Incomplete
- Click the checkbox next to any task to toggle its completion status
- Completed tasks show with strikethrough text
- Status automatically updates to "Completed" or "Pending"

### Deleting a Task
1. Find the task in the list
2. Click **Delete** button (red)
3. Confirm deletion

## Use Cases

### Examples of Tasks to Track:
- Build new window templates
- Update pricing spreadsheet
- Review and update BOM standards
- Set up new design software
- Train new team member
- Update client presentation templates
- Organize file structure
- Create standard details library
- Review and improve workflows
- Update documentation

## Technical Details

### Files Modified:
- `index.html` - Added Tasks menu item
- `app.js` - Added tasks page rendering and CRUD functions
- `supabase-helpers.js` - Added tasks API functions
- `add_tasks_table.sql` - Database migration script

### API Functions Added:
- `getAllTasks()` - Fetch all tasks
- `createTask(taskData)` - Create new task
- `updateTask(taskId, updates)` - Update existing task
- `deleteTask(taskId)` - Delete task

### State Management:
- `tasksData` array stores all tasks in memory
- Automatically syncs with database on CRUD operations
- Loads on app initialization

## Notes

- Tasks are independent of projects - they track general team activities
- All authenticated users can view, create, edit, and delete tasks
- Tasks are sorted by status (pending first) then by due date
- The system supports future enhancements like:
  - Task comments/notes
  - File attachments
  - Sub-tasks/checklists
  - Task categories/tags
  - Time tracking per task
  - Task templates

## Next Steps

1. Apply the database migration (`add_tasks_table.sql`)
2. Test creating, editing, and deleting tasks
3. Assign tasks to team members
4. Start tracking your team's activities!

---

**Status**: ✅ Ready to use after database migration

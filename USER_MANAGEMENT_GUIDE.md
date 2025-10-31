# User Management Guide

## Understanding the Two Systems

Your app uses **TWO separate but connected systems** for users:

### 1. Supabase Auth (Authentication)
- **Location:** Supabase Dashboard > **Authentication** > **Users**
- **Purpose:** Handles login (email + password)
- **Stores:** Email, encrypted password, auth tokens
- **Cannot be managed from app:** Must use Supabase Dashboard

### 2. Users Table (Profile Data)
- **Location:** Supabase Dashboard > **Database** > **users** table
- **Purpose:** Stores user profile data (name, role, etc.)
- **Stores:** Name, username, role, email, etc.
- **Can be managed from app:** Via UI or SQL

## Creating a New User

When you add a team member through the app:

1. ✅ Creates auth account in Supabase Auth (email + password)
2. ✅ Creates profile record in `users` table (name, role, etc.)
3. ✅ Both use the same UUID
4. ✅ User can log in immediately (if email confirmation is disabled)

## Deleting a User - IMPORTANT!

**The app CANNOT fully delete users.** When you delete a user from the UI or database:

- ❌ Only deletes from `users` table
- ❌ **Auth account remains** in Supabase Auth
- ⚠️ Email is still "taken" - can't create new user with same email

### To Fully Delete a User:

**You MUST do both:**

1. **Delete from Supabase Auth:**
   - Go to Supabase Dashboard
   - **Authentication** > **Users**
   - Find the user
   - Click the **•••** menu > **Delete user**
   - Confirm deletion

2. **Delete from users table:**
   - Either use the app's deactivate function
   - Or go to **Database** > **users** table
   - Find the user and delete the row

## Common Errors and Solutions

### Error: "User already registered"

**Cause:** Email exists in Supabase Auth (even if deleted from `users` table)

**Solution:**
1. Go to Supabase Dashboard
2. **Authentication** > **Users**
3. Find user by email
4. Delete the auth user
5. Try creating the user again

### Error: "Invalid login credentials"

**Possible causes:**
- User exists in `users` table but NOT in Auth
- User exists in Auth but NOT in `users` table
- Wrong password
- Email not confirmed (if confirmation is enabled)

**Solution:**
1. Check **Authentication** > **Users** - is user there?
2. Check **Database** > **users** table - is profile there?
3. If missing from one, delete from both and recreate
4. Verify email confirmation is disabled (see below)

### Error: "Username already taken"

**Cause:** Username exists in `users` table

**Solution:**
- Check **Database** > **users** table
- Delete or deactivate the existing user
- Or choose a different username

## Configuration Checklist

### Required Settings:

1. **Disable Email Confirmation:**
   - Supabase Dashboard
   - **Authentication** > **Providers** > **Email**
   - **UNCHECK** "Enable email confirmations"
   - Save

2. **RLS Policy for INSERT:**
   - Should have this policy on `users` table:
   ```sql
   CREATE POLICY "Authenticated users can insert users" ON users
       FOR INSERT WITH CHECK (auth.role() = 'authenticated');
   ```

## Best Practices

### When Testing:
- Always delete from BOTH Auth and Database
- Check both locations before creating new user
- Use different emails for each test user

### When Deactivating:
- Use the **Deactivate** button in the app
- This sets `active = false` in the database
- User still exists but can't be assigned to projects
- Auth account remains (user can still log in)

### When Permanently Removing:
- Delete from Supabase Auth first (frees up email)
- Then delete from `users` table
- This prevents "User already registered" errors

## Quick Reference: Where to Find Users

| System | Location | What to Look For |
|--------|----------|------------------|
| **Auth Accounts** | Authentication > Users | Email, Created date, Last sign in |
| **User Profiles** | Database > users table | Name, Username, Role, Active status |
| **In App** | Team page | All active users with KPIs |

## Troubleshooting Workflow

If you can't create a user:

1. ✅ Check error message
2. ✅ If "User already registered" → Delete from Auth
3. ✅ If "Username taken" → Delete from users table or change username
4. ✅ If "RLS policy" → Check INSERT policy exists
5. ✅ Try again with same details
6. ✅ If still failing → Check browser console for detailed error

## Why This Design?

Supabase Auth is a **separate service** from your database:
- Auth handles security, encryption, tokens
- Database stores application data
- They're linked by UUID but managed separately
- The client-side SDK cannot delete auth users (security feature)
- Only admin API or Dashboard can delete auth users

# Fix User Authentication Setup

## Problem
Creating users in the `users` table doesn't create authentication accounts, so new users cannot log in.

## Solution
The app now creates both:
1. **Supabase Auth account** (for login with email/password)
2. **User profile record** in `users` table (for app data)

## CRITICAL: Disable Email Confirmation

By default, Supabase requires new users to confirm their email before they can log in. For internal team management, you need to disable this:

**Steps:**
1. Go to Supabase Dashboard
2. Navigate to **Authentication** > **Providers** > **Email**
3. Scroll down to **Email Confirmation**
4. **UNCHECK** "Enable email confirmations"
5. Click **Save**

Without this change, newly created users will need to click a confirmation link in their email before they can log in, which is unnecessary for internal team members.

## What Changed

### Code Updates (Already Applied)
- ✅ `supabase-helpers.js` - `createUser()` now calls `auth.signUp()` first
- ✅ `app.js` - `saveNewTeamMember()` now passes password to API

### Database Setup Required

You need to ensure the `users` table is properly configured to work with Supabase Auth.

**Run this SQL in Supabase Dashboard > SQL Editor:**

```sql
-- 1. Ensure the users table ID is UUID and matches auth.users
ALTER TABLE users ALTER COLUMN id SET DEFAULT uuid_generate_v4();

-- 2. Create a trigger to automatically create user profiles when auth accounts are created
-- (Optional but recommended - this ensures consistency)
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  -- This trigger fires when a new auth user is created
  -- We don't insert here because our app does it manually
  -- But you could uncomment this for automatic profile creation
  /*
  INSERT INTO public.users (id, email, name, username, role, active)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'username', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'role', 'Designer'),
    true
  );
  */
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger (currently disabled, enable if you want automatic profiles)
-- DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
-- CREATE TRIGGER on_auth_user_created
--   AFTER INSERT ON auth.users
--   FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## How It Works Now

### Creating a New User:

1. **User fills form** → Name, Username, Email, Password, Role
2. **App calls** → `SupabaseAPI.createUser(userData)`
3. **Function creates Auth account** → `supabaseClient.auth.signUp({email, password})`
4. **Gets Auth ID** → Supabase returns `authData.user.id` (UUID)
5. **Creates profile** → Inserts into `users` table with same ID
6. **Result** → User can now log in with email/password

### Logging In:

1. **User enters** → Email and Password
2. **App calls** → `supabaseClient.auth.signInWithPassword({email, password})`
3. **Supabase validates** → Checks against Auth table
4. **Returns session** → If valid, user is authenticated
5. **App loads profile** → Fetches user data from `users` table using auth ID

## Important Notes

- **Password** is stored in Supabase Auth (encrypted), NOT in the `users` table
- **Email** must be unique in Supabase Auth
- **Username** must be unique in `users` table
- The same **UUID** is used for both Auth and profile record
- Users created before this fix won't have auth accounts (need to be recreated)

## Testing

1. Add a new team member through the UI
2. Check Supabase Dashboard > Authentication > Users
   - You should see the new user listed
3. Log out of your current session
4. Try logging in with the new user's email and password
5. Should successfully log in and see the dashboard

## Troubleshooting

### "Email already exists"
- The email is already used in Supabase Auth
- Check Dashboard > Authentication > Users
- Delete the auth user if it's a duplicate

### "Username already taken"
- The username exists in the `users` table
- Either choose a different username or delete the old record

### "Invalid login credentials"
- Auth account exists but profile doesn't (or vice versa)
- Check both Auth users and `users` table
- May need to delete and recreate the user

### "New row violates RLS policy"
- The INSERT policy we created earlier might not be working
- Verify the policy exists: Dashboard > Database > users table > Policies
- Should see: "Authenticated users can insert users"

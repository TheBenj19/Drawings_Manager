# 🔒 SECURITY CHECKLIST FOR PUBLIC HOSTING

## ⚠️ CRITICAL - DO BEFORE DEPLOYING

Your app will be accessible from the public internet. Follow this checklist carefully.

---

## 🚨 IMMEDIATE ACTIONS REQUIRED

### 1. Restrict User Creation to Admins Only

**Current Risk:** Any authenticated user can create new team members  
**Impact:** Could lead to unauthorized accounts being created

**Fix:**
1. Go to Supabase Dashboard > SQL Editor
2. Run the SQL file: `SECURITY_FOR_PUBLIC_HOSTING.sql`
3. This restricts user creation to Admin role only

**Test:**
- Log in as non-admin user
- Try to create a team member
- Should fail with permission error ✅

---

### 2. Set Up Admin User

**Make sure you have at least one Admin user:**

```sql
-- Check current admins
SELECT id, name, email, role FROM users WHERE role = 'Admin';

-- If none, make yourself admin
UPDATE users SET role = 'Admin' WHERE email = 'your-email@company.com';
```

---

### 3. Enable 2FA on Supabase Account

**Protects your database from compromise**

1. Go to https://app.supabase.com
2. Click your avatar > Account Settings
3. Enable Two-Factor Authentication
4. Save backup codes securely

---

### 4. Review and Restrict Permissions

Run the security SQL to:
- ✅ Restrict user creation to admins
- ✅ Restrict project deletion to admins
- ✅ Add audit logging (who changed what)
- ✅ Verify RLS is enabled on all tables

---

### 5. Use Environment Variables (Recommended)

While the anon key is safe to expose, it's better practice to use env vars:

**In Vercel Dashboard:**
1. Settings > Environment Variables
2. Add:
   - `VITE_SUPABASE_URL` = `https://cudpbnpqzvdlhdnqcuty.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `eyJhbGci...` (your anon key)

**Update `supabase-config.js`:**
```javascript
const SUPABASE_CONFIG = {
    url: import.meta.env.VITE_SUPABASE_URL,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY
};

// Fallback for local development
if (!SUPABASE_CONFIG.url || !SUPABASE_CONFIG.anonKey) {
    console.error('Missing Supabase environment variables');
}
```

---

## 🔐 HIGHLY RECOMMENDED

### 6. IP Whitelisting (Requires Supabase Pro - $25/month)

Restrict database access to known IP addresses:

1. Go to Supabase Dashboard > Settings > Network
2. Click "Restrictions"
3. Add your office/VPN IP addresses
4. Enable "Restrict database access"

**Get your office IP:**
- Visit https://whatismyipaddress.com
- Add that IP to allowlist
- If you have a VPN, add VPN exit IP

**Benefits:**
- Even if someone gets credentials, they can't connect from other locations
- Strongest protection for public-facing apps

---

### 7. Custom Domain + HTTPS

Use your company domain instead of vercel.app:

1. In Vercel: Settings > Domains
2. Add: `projects.yourcompany.com` or similar
3. Update DNS records (Vercel provides instructions)
4. SSL certificate is automatic

**Benefits:**
- More professional
- Better for CSP (Content Security Policy)
- Easier to remember

---

### 8. Enable Supabase Email Alerts

Get notified of suspicious activity:

1. Supabase Dashboard > Settings > Notifications
2. Enable:
   - Failed login attempts
   - Unusual database activity
   - RLS policy violations

---

## ⚙️ CONFIGURATION CHECKLIST

### Supabase Settings to Verify:

- [ ] **Email Confirmation:** DISABLED (for internal use)
  - Authentication > Providers > Email > Uncheck "Enable email confirmations"

- [ ] **Password Requirements:** Set minimum standards
  - Authentication > Providers > Email > Minimum password length: 8
  
- [ ] **JWT Expiry:** Default is fine (1 hour)
  - Settings > API > JWT Settings

- [ ] **API Rate Limiting:** Enabled by default
  - Can increase if needed: Settings > API > Rate Limiting

- [ ] **CORS:** Allow your domain only (after deployment)
  - Settings > API > CORS Settings
  - Add: `https://your-domain.vercel.app`
  - Remove: `*` (wildcard)

---

## 🔍 MONITORING & MAINTENANCE

### Regular Security Tasks:

**Weekly:**
- [ ] Review Supabase Logs for failed login attempts
  - Dashboard > Logs > Authentication

**Monthly:**
- [ ] Review user list, deactivate unused accounts
- [ ] Check for Supabase security updates
- [ ] Review RLS policies

**Quarterly:**
- [ ] Rotate admin passwords
- [ ] Review and update IP allowlist
- [ ] Audit user permissions

---

## 🚫 WHAT TO AVOID

**DO NOT:**
- ❌ Share Supabase service key (keep it secret, never commit to git)
- ❌ Disable RLS policies "temporarily" (always keep them on)
- ❌ Use same password across multiple services
- ❌ Give everyone Admin role (only those who need it)
- ❌ Ignore Supabase security emails
- ❌ Skip 2FA on Supabase account

---

## 🧪 SECURITY TESTING BEFORE GO-LIVE

Test these scenarios:

### 1. Unauthenticated Access
- [ ] Open app in incognito window
- [ ] Verify login screen shows
- [ ] Try accessing `/index.html` directly
- [ ] Should NOT see any data ✅

### 2. Non-Admin Permissions
- [ ] Log in as Designer (not Admin)
- [ ] Try to create a new user
- [ ] Should fail with "Only admins can create users" ✅
- [ ] Try to delete a project
- [ ] Should fail with permission error ✅

### 3. Invalid Login Attempts
- [ ] Try logging in with wrong password
- [ ] Try logging in with non-existent email
- [ ] Should fail with "Invalid credentials" ✅
- [ ] Check Supabase logs show failed attempts

### 4. Session Expiry
- [ ] Log in
- [ ] Wait 1+ hours
- [ ] Try to perform an action
- [ ] Should prompt for re-authentication ✅

### 5. SQL Injection Attempt (Should be safe)
- [ ] Try username: `admin' OR '1'='1`
- [ ] Should fail safely (Supabase handles this) ✅

---

## 📊 SECURITY COMPARISON

### Before (Internal Only):
- ✅ Authentication required
- ✅ RLS enabled
- ⚠️ Any user can create users
- ⚠️ Any user can delete projects
- ⚠️ No audit logging
- ⚠️ No IP restrictions

### After (Public Hosting):
- ✅ Authentication required
- ✅ RLS enabled
- ✅ Only admins can create users
- ✅ Only admins can delete projects
- ✅ Audit logging enabled
- ✅ IP restrictions (optional)
- ✅ 2FA on Supabase account
- ✅ Environment variables
- ✅ Custom domain with HTTPS
- ✅ Monitoring alerts

---

## 🆘 INCIDENT RESPONSE

**If you suspect a security breach:**

1. **Immediate Actions:**
   - Go to Supabase Dashboard > Settings > API
   - Click "Reset project API keys"
   - This invalidates all existing sessions

2. **Investigation:**
   - Check Supabase Logs > Authentication (failed logins)
   - Check Database Logs (suspicious queries)
   - Review user list for unauthorized accounts

3. **Remediation:**
   - Force password reset for all users
   - Review and tighten RLS policies
   - Enable IP whitelisting if not already enabled
   - Contact Supabase support if needed

4. **Prevention:**
   - Review this checklist
   - Implement any missing security measures
   - Update team on security best practices

---

## 📝 DEPLOYMENT WORKFLOW

**Safe deployment process:**

1. ✅ Run `SECURITY_FOR_PUBLIC_HOSTING.sql`
2. ✅ Verify Admin user exists
3. ✅ Test permissions locally
4. ✅ Enable 2FA on Supabase
5. ✅ Set environment variables in Vercel
6. ✅ Deploy to Vercel
7. ✅ Configure custom domain
8. ✅ Update CORS settings
9. ✅ Test all security scenarios above
10. ✅ Enable monitoring alerts
11. ✅ (Optional) Enable IP whitelisting

---

## ✅ FINAL CHECKLIST

Before marking complete:

- [ ] SQL security updates applied
- [ ] At least one Admin user exists
- [ ] Non-admins cannot create users (tested)
- [ ] 2FA enabled on Supabase account
- [ ] Environment variables configured
- [ ] Custom domain set up (optional but recommended)
- [ ] CORS configured for your domain
- [ ] Security testing completed
- [ ] Monitoring alerts enabled
- [ ] Team briefed on security procedures
- [ ] Backup admin credentials stored securely

---

## 💰 COST CONSIDERATIONS

**Free Tier (Current):**
- ✅ RLS and authentication
- ✅ 500MB database
- ✅ 1GB file storage
- ✅ 2GB bandwidth
- ❌ No IP whitelisting
- ❌ No custom SMTP
- ❌ 7-day log retention

**Pro Tier ($25/month - Recommended for Public):**
- ✅ Everything in Free
- ✅ IP whitelisting (highly recommended)
- ✅ Custom SMTP (branded emails)
- ✅ 90-day log retention
- ✅ Daily backups (vs weekly)
- ✅ Priority support

**For public hosting, Pro tier is recommended for IP whitelisting alone.**

---

## 🎯 FINAL RECOMMENDATION

### Minimum Requirements for Public Hosting:
1. ✅ Run security SQL (restricts permissions)
2. ✅ Enable 2FA on Supabase account
3. ✅ Create at least one Admin user
4. ✅ Test that non-admins have limited access

### Highly Recommended:
- Upgrade to Supabase Pro for IP whitelisting
- Use custom domain
- Set up monitoring alerts

### Optional but Good:
- Environment variables
- Regular security audits
- Documented incident response plan

**With these changes, your app will be secure for public hosting.** 🚀🔒

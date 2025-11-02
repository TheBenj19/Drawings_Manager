// =====================================================
// Supabase Helper Functions - v1.1
// =====================================================
// This file contains all Supabase database operations
// =====================================================

const SupabaseAPI = {
    // ==================== AUTHENTICATION ====================
    
    async signIn(email, password) {
        try {
            const { data, error } = await window.supabaseClient.auth.signInWithPassword({
                email: email,
                password: password
            });
            
            if (error) throw error;
            
            // Fetch user profile from database
            const { data: profile, error: profileError } = await window.supabaseClient
                .from('users')
                .select('*')
                .eq('email', email)
                .single();
            
            if (profileError) throw profileError;
            
            return { user: data.user, profile: profile };
        } catch (error) {
            console.error('Sign in error:', error);
            throw error;
        }
    },
    
    async signOut() {
        try {
            const { error } = await window.supabaseClient.auth.signOut();
            if (error) throw error;
        } catch (error) {
            console.error('Sign out error:', error);
            throw error;
        }
    },
    
    async getCurrentSession() {
        try {
            const { data: { session }, error } = await window.supabaseClient.auth.getSession();
            if (error) throw error;
            return session;
        } catch (error) {
            console.error('Get session error:', error);
            return null;
        }
    },
    
    async getCurrentUser() {
        try {
            const { data: { user }, error } = await window.supabaseClient.auth.getUser();
            if (error) {
                // If JWT token references non-existent user, clear the session
                if (error.message && error.message.includes('does not exist')) {
                    console.warn('Invalid JWT token detected. Clearing session...');
                    await window.supabaseClient.auth.signOut();
                    return null;
                }
                throw error;
            }
            
            if (!user) return null;
            
            // Fetch user profile
            const { data: profile, error: profileError } = await window.supabaseClient
                .from('users')
                .select('*')
                .eq('email', user.email)
                .single();
            
            if (profileError) throw profileError;
            
            return profile;
        } catch (error) {
            console.error('Get current user error:', error);
            return null;
        }
    },
    
    // ==================== PROJECTS ====================
    
    async getAllProjects() {
        try {
            const { data, error } = await window.supabaseClient
                .from('projects')
                .select('*')
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Get projects error:', error);
            throw error;
        }
    },
    
    async getProjectById(id) {
        try {
            const { data, error } = await window.supabaseClient
                .from('projects')
                .select('*')
                .eq('id', id)
                .single();
            
            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Get project error:', error);
            throw error;
        }
    },
    
    async createProject(projectData) {
        try {
            const { data, error } = await window.supabaseClient
                .from('projects')
                .insert([projectData])
                .select()
                .single();
            
            if (error) {
                console.error('Create project error details:', error);
                console.error('Error message:', error.message);
                console.error('Error code:', error.code);
                console.error('Error hint:', error.hint);
                throw error;
            }
            return data;
        } catch (error) {
            console.error('Create project error:', error);
            throw error;
        }
    },
    
    async updateProject(id, updates) {
        try {
            const { data, error } = await window.supabaseClient
                .from('projects')
                .update(updates)
                .eq('id', id)
                .select()
                .single();
            
            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Update project error:', error);
            console.error('Error details:', JSON.stringify(error, null, 2));
            throw error;
        }
    },
    
    async deleteProject(id) {
        try {
            const { data, error } = await window.supabaseClient
                .from('projects')
                .delete()
                .eq('id', id)
                .select();
            
            
            if (error) {
                console.error('Delete error details:', error.message, error.code, error.hint);
                throw error;
            }
            
            // No error means delete succeeded (RLS may block SELECT after DELETE)
            return true;
        } catch (error) {
            console.error('Delete project error:', error);
            throw error;
        }
    },
    
    // ==================== TIME ENTRIES ====================
    
    async getAllTimeEntries() {
        try {
            const { data, error } = await window.supabaseClient
                .from('time_entries')
                .select('*')
                .order('date', { ascending: false });
            
            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Get all time entries error:', error);
            throw error;
        }
    },
    
    async getTimeEntriesForProject(projectId) {
        try {
            const { data, error } = await window.supabaseClient
                .from('time_entries')
                .select('*')
                .eq('project_id', projectId)
                .order('date', { ascending: false });
            
            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Get time entries error:', error);
            throw error;
        }
    },
    
    async createTimeEntry(entryData) {
        try {
            const { data, error } = await window.supabaseClient
                .from('time_entries')
                .insert([entryData])
                .select()
                .single();
            
            if (error) {
                console.error('Supabase error details:', error);
                console.error('Entry data being sent:', entryData);
                throw error;
            }
            return data;
        } catch (error) {
            console.error('Create time entry error:', error);
            throw error;
        }
    },
    
    async updateTimeEntry(id, updates) {
        try {
            const { data, error } = await window.supabaseClient
                .from('time_entries')
                .update(updates)
                .eq('id', id)
                .select()
                .single();
            
            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Update time entry error:', error);
            throw error;
        }
    },
    
    async deleteTimeEntry(id) {
        try {
            const { error } = await window.supabaseClient
                .from('time_entries')
                .delete()
                .eq('id', id);
            
            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Delete time entry error:', error);
            throw error;
        }
    },
    
    // ==================== PROJECT HISTORY ====================
    
    async getProjectHistory(projectId) {
        try {
            const { data, error } = await window.supabaseClient
                .from('project_history')
                .select('*, users(name)')
                .eq('project_id', projectId)
                .order('changed_at', { ascending: false });
            
            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Get project history error:', error);
            throw error;
        }
    },
    
    async addProjectHistory(historyData) {
        try {
            const { data, error } = await window.supabaseClient
                .from('project_history')
                .insert([historyData])
                .select()
                .single();
            
            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Add project history error:', error);
            throw error;
        }
    },
    
    // ==================== USERS ====================
    
    async getAllUsers() {
        try {
            const { data, error } = await window.supabaseClient
                .from('users')
                .select('*')
                .order('name');
            
            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Get users error:', error);
            throw error;
        }
    },
    
    async createUser(userData) {
        try {
            // First, check if a user with this email already exists in the users table
            const { data: existingUsers, error: checkError } = await window.supabaseClient
                .from('users')
                .select('email, username')
                .eq('email', userData.email)
                .limit(1);
            
            if (checkError) {
                console.error('Error checking existing user:', checkError);
            }
            
            if (existingUsers && existingUsers.length > 0) {
                throw new Error(`A user with email ${userData.email} already exists in the system.`);
            }
            
            // Try to create the auth account using Supabase Auth
            const { data: authData, error: authError } = await window.supabaseClient.auth.signUp({
                email: userData.email,
                password: userData.password,
                options: {
                    data: {
                        username: userData.username,
                        name: userData.name,
                        role: userData.role
                    },
                    emailRedirectTo: undefined
                }
            });
            
            if (authError) {
                console.error('Auth signup error:', authError);
                
                // If user already exists in Auth, provide helpful instructions
                if (authError.message.includes('User already registered') || authError.message.includes('already been registered')) {
                    throw new Error(
                        `The email ${userData.email} is already registered. This can happen if:\n\n` +
                        `1. The user was previously added but not completed properly\n` +
                        `2. Someone attempted to register with this email before\n\n` +
                        `To resolve this, an administrator needs to:\n` +
                        `• Go to Supabase Dashboard → Authentication → Users\n` +
                        `• Find and delete the user with email: ${userData.email}\n` +
                        `• Then try adding the team member again\n\n` +
                        `Or use a different email address.`
                    );
                }
                throw authError;
            }
            
            if (!authData.user) {
                throw new Error('Failed to create authentication account');
            }
            
            // Create the profile record in users table with the auth user's ID
            const { data, error } = await window.supabaseClient
                .from('users')
                .insert([{
                    id: authData.user.id,
                    username: userData.username,
                    name: userData.name,
                    role: userData.role,
                    email: userData.email,
                    active: true
                }])
                .select();
            
            if (error) {
                console.error('Error creating user profile:', error);
                // If profile creation fails, we have an orphaned auth user
                // Log this for admin to clean up
                console.error(`ORPHANED AUTH USER CREATED: ${authData.user.id} (${userData.email})`);
                
                // Check if it's a duplicate user ID conflict (409)
                if (error.code === '23505' || error.status === 409) {
                    throw new Error(
                        `User ID conflict: A user profile with this ID already exists.\n\n` +
                        `This means:\n` +
                        `• The email ${userData.email} was previously registered\n` +
                        `• A user profile exists in the database but the auth account was deleted\n\n` +
                        `To fix this, an administrator needs to:\n` +
                        `1. Go to Supabase Dashboard → Table Editor → users table\n` +
                        `2. Find the user with email: ${userData.email}\n` +
                        `3. Delete that user record\n` +
                        `4. Go to Authentication → Users and delete: ${authData.user.id}\n` +
                        `5. Try adding the team member again\n\n` +
                        `Or use a different email address.`
                    );
                }
                
                // Check if it's an RLS policy error
                if (error.code === '42501' || error.message.includes('row-level security policy')) {
                    throw new Error(
                        `Database permission error: Cannot create user profile.\n\n` +
                        `This is caused by Row Level Security (RLS) policies on the users table.\n\n` +
                        `To fix this, an administrator needs to:\n` +
                        `1. Go to Supabase Dashboard → Table Editor → users table\n` +
                        `2. Click on "RLS" or "Policies" tab\n` +
                        `3. Add an INSERT policy that allows authenticated users to create new users\n` +
                        `   Example policy: "Enable insert for authenticated users"\n` +
                        `   Using: auth.role() = 'authenticated'\n\n` +
                        `Note: Auth user ${authData.user.id} was created but needs to be deleted from:\n` +
                        `Supabase Dashboard → Authentication → Users\n\n` +
                        `Or contact your database administrator.`
                    );
                }
                
                throw new Error('Failed to create user profile. Please contact administrator.');
            }
            
            return data && data.length > 0 ? data[0] : null;
        } catch (error) {
            console.error('Create user error:', error);
            throw error;
        }
    },
    
    async getUserById(id) {
        try {
            const { data, error } = await window.supabaseClient
                .from('users')
                .select('*')
                .eq('id', id)
                .single();
            
            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Get user error:', error);
            throw error;
        }
    },
    
    async updateUser(id, updates) {
        try {
            const { data, error } = await window.supabaseClient
                .from('users')
                .update(updates)
                .eq('id', id)
                .select();
            
            
            if (error) throw error;
            
            // If no error, assume success even if data is empty (RLS might be blocking SELECT after UPDATE)
            // Return the first item if data exists, otherwise return a success indicator
            const result = data && data.length > 0 ? data[0] : { success: true };
            return result;
        } catch (error) {
            console.error('Update user error:', error);
            throw error;
        }
    },
    
    async deleteUser(userId) {
        try {
            // Delete from users table
            const { error } = await window.supabaseClient
                .from('users')
                .delete()
                .eq('id', userId);
            
            if (error) throw error;
            
            // Note: User still exists in Supabase Auth and needs manual cleanup
            // We can't delete from Auth without admin privileges
            console.warn(`User ${userId} deleted from users table.`);
            console.warn('⚠️ MANUAL CLEANUP REQUIRED: Go to Supabase Dashboard → Authentication → Users and delete this user ID to fully remove.');
            
            return true;
        } catch (error) {
            console.error('Delete user error:', error);
            throw error;
        }
    },
    
    // ==================== USER KPIs ====================
    
    async getAllUserKPIs() {
        try {
            const { data, error } = await window.supabaseClient
                .from('user_kpis')
                .select('*');
            
            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Get all user KPIs error:', error);
            return [];
        }
    },
    
    async getUserKPIs(userId) {
        try {
            const { data, error } = await window.supabaseClient
                .from('user_kpis')
                .select('*')
                .eq('user_id', userId)
                .maybeSingle();
            
            if (error) throw error;
            return data || {
                projects_completed: 0,
                projects_in_progress: 0,
                total_time_logged: 0,
                average_completion_time: 0,
                on_time_delivery: 0
            };
        } catch (error) {
            console.error('Get user KPIs error:', error);
            return {
                projects_completed: 0,
                projects_in_progress: 0,
                total_time_logged: 0,
                average_completion_time: 0,
                on_time_delivery: 0
            };
        }
    },
    
    async updateUserKPIs(userId, kpisData) {
        try {
            const { data, error } = await window.supabaseClient
                .from('user_kpis')
                .upsert([{ user_id: userId, ...kpisData }], { onConflict: 'user_id' })
                .select()
                .single();
            
            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Update user KPIs error:', error);
            throw error;
        }
    },
    
    // ==================== REALTIME SUBSCRIPTIONS ====================
    
    subscribeToProjects(callback) {
        const channel = window.supabaseClient
            .channel('projects-changes')
            .on('postgres_changes', 
                { event: '*', schema: 'public', table: 'projects' }, 
                (payload) => {
                    callback(payload);
                }
            )
            .subscribe();
        
        return channel;
    },
    
    unsubscribeFromChannel(channel) {
        if (channel) {
            window.supabaseClient.removeChannel(channel);
        }
    },

    // ==================== STATUS HISTORY ====================
    
    async addStatusHistory(projectId, oldStatus, newStatus, changedBy = 'System') {
        try {
            const { data, error } = await window.supabaseClient
                .from('status_history')
                .insert([{
                    project_id: projectId,
                    old_status: oldStatus,
                    new_status: newStatus,
                    changed_by: changedBy
                }])
                .select()
                .single();
            
            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Add status history error:', error);
            throw error;
        }
    },

    async getStatusHistory(projectId) {
        try {
            const { data, error } = await window.supabaseClient
                .from('status_history')
                .select('*')
                .eq('project_id', projectId)
                .order('changed_at', { ascending: true });
            
            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Get status history error:', error);
            return [];
        }
    },

    async getAllStatusHistory() {
        try {
            const { data, error } = await window.supabaseClient
                .from('status_history')
                .select('*')
                .order('changed_at', { ascending: true });
            
            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Get all status history error:', error);
            return [];
        }
    },

    // ==================== DESIGNER CAPACITY ====================
    
    async getDesignerCapacity(designerName) {
        try {
            const { data, error } = await window.supabaseClient
                .from('designer_capacity')
                .select('*')
                .eq('designer_name', designerName)
                .single();
            
            if (error && error.code !== 'PGRST116') throw error; // PGRST116 = not found
            return data;
        } catch (error) {
            console.error('Get designer capacity error:', error);
            return null;
        }
    },

    async getAllDesignerCapacities() {
        try {
            const { data, error } = await window.supabaseClient
                .from('designer_capacity')
                .select('*')
                .order('designer_name');
            
            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Get all designer capacities error:', error);
            return [];
        }
    },

    async upsertDesignerCapacity(designerName, capacityHours, workloadHours) {
        try {
            const { data, error } = await window.supabaseClient
                .from('designer_capacity')
                .upsert([{
                    designer_name: designerName,
                    capacity_hours_per_week: capacityHours,
                    current_workload_hours: workloadHours,
                    updated_at: new Date().toISOString()
                }], { onConflict: 'designer_name' })
                .select()
                .single();
            
            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Upsert designer capacity error:', error);
            throw error;
        }
    },

    async updateDesignerWorkload(designerName, workloadHours) {
        try {
            const { data, error } = await window.supabaseClient
                .from('designer_capacity')
                .update({ 
                    current_workload_hours: workloadHours,
                    updated_at: new Date().toISOString()
                })
                .eq('designer_name', designerName)
                .select()
                .single();
            
            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Update designer workload error:', error);
            throw error;
        }
    },

    // ==================== TASKS API ====================
    
    async getAllTasks() {
        try {
            const { data, error } = await window.supabaseClient
                .from('tasks')
                .select('*')
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Get all tasks error:', error);
            throw error;
        }
    },

    async createTask(taskData) {
        try {
            const { data, error } = await window.supabaseClient
                .from('tasks')
                .insert([taskData])
                .select()
                .single();
            
            if (error) {
                console.error('Create task error details:', error);
                throw error;
            }
            return data;
        } catch (error) {
            console.error('Create task error:', error);
            console.error('Task data:', taskData);
            throw error;
        }
    },

    async updateTask(taskId, updates) {
        try {
            const { data, error } = await window.supabaseClient
                .from('tasks')
                .update(updates)
                .eq('id', taskId)
                .select()
                .single();
            
            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Update task error:', error);
            throw error;
        }
    },

    async deleteTask(taskId) {
        try {
            const { error } = await window.supabaseClient
                .from('tasks')
                .delete()
                .eq('id', taskId);
            
            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Delete task error:', error);
            throw error;
        }
    },

    // ==================== CHANGE LOG ====================
    
    async getChangeLogs(projectId) {
        try {
            const { data, error } = await window.supabaseClient
                .from('change_log')
                .select('*')
                .eq('project_id', projectId)
                .order('change_date', { ascending: false });
            
            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Get change logs error:', error);
            throw error;
        }
    },

    async addChangeLog(changeData) {
        try {
            const { data, error } = await window.supabaseClient
                .from('change_log')
                .insert([{
                    project_id: changeData.projectId,
                    version_number: changeData.versionNumber,
                    changed_by: changeData.changedBy,
                    change_type: changeData.changeType,
                    change_description: changeData.description,
                    previous_value: changeData.previousValue || null,
                    new_value: changeData.newValue || null
                }])
                .select()
                .single();
            
            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Add change log error:', error);
            throw error;
        }
    },

    async getChangeLogsByVersion(projectId, versionNumber) {
        try {
            const { data, error } = await window.supabaseClient
                .from('change_log')
                .select('*')
                .eq('project_id', projectId)
                .eq('version_number', versionNumber)
                .order('change_date', { ascending: false });
            
            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Get change logs by version error:', error);
            throw error;
        }
    },

    async getRelatedProjects(jobNumber) {
        try {
            const { data, error } = await window.supabaseClient
                .from('projects')
                .select('*')
                .eq('job_number', jobNumber)
                .order('created_at', { ascending: true });
            
            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Get related projects error:', error);
            throw error;
        }
    }
};

// Export for global access
window.SupabaseAPI = SupabaseAPI;

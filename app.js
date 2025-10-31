// Team Members & Authentication
let teamMembers = [
    {
        id: 1,
        username: 'admin',
        password: 'drawing2025',
        name: 'Administrator',
        role: 'Admin',
        email: 'admin@company.com',
        active: true,
        kpis: {
            projectsCompleted: 0,
            projectsInProgress: 0,
            totalTimeLogged: 0,
            averageCompletionTime: 0,
            onTimeDelivery: 0
        }
    },
    {
        id: 2,
        username: 'john.smith',
        password: 'john123',
        name: 'John Smith',
        role: 'Designer',
        email: 'john.smith@company.com',
        active: true,
        kpis: {
            projectsCompleted: 0,
            projectsInProgress: 0,
            totalTimeLogged: 0,
            averageCompletionTime: 0,
            onTimeDelivery: 0
        }
    },
    {
        id: 3,
        username: 'sarah.johnson',
        password: 'sarah123',
        name: 'Sarah Johnson',
        role: 'Designer',
        email: 'sarah.johnson@company.com',
        active: true,
        kpis: {
            projectsCompleted: 0,
            projectsInProgress: 0,
            totalTimeLogged: 0,
            averageCompletionTime: 0,
            onTimeDelivery: 0
        }
    },
    {
        id: 4,
        username: 'mike.chen',
        password: 'mike123',
        name: 'Mike Chen',
        role: 'Designer',
        email: 'mike.chen@company.com',
        active: true,
        kpis: {
            projectsCompleted: 0,
            projectsInProgress: 0,
            totalTimeLogged: 0,
            averageCompletionTime: 0,
            onTimeDelivery: 0
        }
    },
    {
        id: 5,
        username: 'emma.davis',
        password: 'emma123',
        name: 'Emma Davis',
        role: 'Designer',
        email: 'emma.davis@company.com',
        active: true,
        kpis: {
            projectsCompleted: 0,
            projectsInProgress: 0,
            totalTimeLogged: 0,
            averageCompletionTime: 0,
            onTimeDelivery: 0
        }
    }
];

let currentUser = null;
let isAuthenticated = false;

// Check authentication on load
async function checkAuth() {
    try {
        const session = await SupabaseAPI.getCurrentSession();
        if (!session) {
            showLoginScreen();
            return false;
        }
        currentUser = await SupabaseAPI.getCurrentUser();
        if (!currentUser) {
            showLoginScreen();
            return false;
        }
        isAuthenticated = true;
        document.getElementById('appLayout').style.display = 'flex';
        return true;
    } catch (error) {
        console.error('Auth check error:', error);
        showLoginScreen();
        return false;
    }
}

function showLoginScreen() {
    document.getElementById('appLayout').style.display = 'none';
    document.body.innerHTML += `
        <div id="loginContainer" style="
            display: flex; 
            align-items: center; 
            justify-content: center; 
            min-height: 100vh; 
            background: linear-gradient(135deg, #3b82f6 0%, #1e3a8a 50%, #60a5fa 100%);
            background-size: 200% 200%;
            animation: gradientShift 10s ease infinite;
            position: relative;
            overflow: hidden;
        ">
            <style>
                @keyframes gradientShift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                @keyframes floatIn {
                    from {
                        opacity: 0;
                        transform: translateY(30px) scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }
                @keyframes shine {
                    0% { left: -100%; }
                    100% { left: 200%; }
                }
                .floating-shapes {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    z-index: 1;
                }
                .shape {
                    position: absolute;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 50%;
                    animation: float 20s infinite ease-in-out;
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-100px) rotate(180deg); }
                }
                .shape1 { width: 80px; height: 80px; left: 10%; top: 20%; animation-delay: 0s; }
                .shape2 { width: 120px; height: 120px; right: 10%; top: 60%; animation-delay: 2s; }
                .shape3 { width: 60px; height: 60px; left: 50%; top: 80%; animation-delay: 4s; }
                .shape4 { width: 100px; height: 100px; left: 70%; top: 10%; animation-delay: 1s; }
                .shape5 { width: 70px; height: 70px; left: 20%; bottom: 10%; animation-delay: 3s; }
                .login-card-wrapper {
                    position: relative;
                    z-index: 10;
                    animation: floatIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
                }
                .login-card {
                    max-width: 420px;
                    width: 90%;
                    text-align: center;
                    padding: 50px 40px;
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(20px);
                    border-radius: 30px;
                    box-shadow: 0 30px 90px rgba(0, 0, 0, 0.3), 0 0 1px rgba(255, 255, 255, 0.5) inset;
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    position: relative;
                    overflow: hidden;
                }
                .login-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
                    animation: shine 3s infinite;
                }
                .lock-icon {
                    font-size: 64px;
                    margin-bottom: 20px;
                    display: inline-block;
                    animation: pulse 2s infinite;
                    filter: drop-shadow(0 4px 8px rgba(102, 126, 234, 0.3));
                }
                .login-title {
                    font-size: 32px;
                    font-weight: 800;
                    margin-bottom: 12px;
                    background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    letter-spacing: -1px;
                }
                .login-subtitle {
                    color: #7f8c8d;
                    margin-bottom: 40px;
                    font-size: 15px;
                    line-height: 1.6;
                }
                .input-wrapper {
                    position: relative;
                    margin-bottom: 20px;
                }
                .login-input {
                    width: 100%;
                    padding: 16px 20px;
                    border: 2px solid rgba(59, 130, 246, 0.2);
                    border-radius: 16px;
                    font-size: 16px;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    background: white;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
                }
                .login-input:focus {
                    outline: none;
                    border-color: #3b82f6;
                    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1), 0 4px 16px rgba(59, 130, 246, 0.2);
                    transform: translateY(-2px);
                }
                .login-btn {
                    width: 100%;
                    padding: 16px 20px;
                    background: linear-gradient(135deg, #3b82f6 0%, #1e3a8a 100%);
                    color: white;
                    border: none;
                    border-radius: 16px;
                    font-size: 16px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
                    position: relative;
                    overflow: hidden;
                    margin-top: 10px;
                }
                .login-btn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 12px 32px rgba(102, 126, 234, 0.5);
                }
                .login-btn:active {
                    transform: translateY(-1px);
                }
                .login-error {
                    color: #e74c3c;
                    margin-top: 20px;
                    font-size: 14px;
                    font-weight: 600;
                    display: none;
                    animation: shake 0.5s;
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-10px); }
                    75% { transform: translateX(10px); }
                }
                .security-badge {
                    margin-top: 30px;
                    padding-top: 25px;
                    border-top: 1px solid rgba(0, 0, 0, 0.05);
                    font-size: 12px;
                    color: #95a5a6;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                }
            </style>
            
            <div class="floating-shapes">
                <div class="shape shape1"></div>
                <div class="shape shape2"></div>
                <div class="shape shape3"></div>
                <div class="shape shape4"></div>
                <div class="shape shape5"></div>
            </div>
            
            <div class="login-card-wrapper">
                <div class="login-card">
                    <div class="lock-icon">🔐</div>
                    <h2 class="login-title">Drawing Manager</h2>
                    <p class="login-subtitle">Welcome back! Please sign in with your credentials</p>
                    <div class="input-wrapper">
                        <input type="email" id="emailInput" class="login-input" placeholder="Email Address" 
                               onkeypress="if(event.key==='Enter') document.getElementById('passwordInput').focus()">
                    </div>
                    <div class="input-wrapper">
                        <input type="password" id="passwordInput" class="login-input" placeholder="Password" 
                               onkeypress="if(event.key==='Enter')attemptLogin()">
                    </div>
                    <button class="login-btn" onclick="attemptLogin()">
                        Sign In
                    </button>
                    <p id="loginError" class="login-error">❌ Invalid username or password. Please try again.</p>
                    <div class="security-badge">
                        🔒 Secure Connection
                    </div>
                </div>
            </div>
        </div>
    `;
    setTimeout(() => document.getElementById('emailInput').focus(), 100);
}

async function attemptLogin() {
    const email = document.getElementById('emailInput').value.trim();
    const password = document.getElementById('passwordInput').value;
    const errorEl = document.getElementById('loginError');
    
    if (!email || !password) {
        errorEl.textContent = '❌ Please enter both email and password';
        errorEl.style.display = 'block';
        return;
    }
    
    try {
        const loginBtn = document.querySelector('.login-btn');
        loginBtn.textContent = 'Signing in...';
        loginBtn.disabled = true;
        errorEl.style.display = 'none';
        
        const { user, profile } = await SupabaseAPI.signIn(email, password);
        
        isAuthenticated = true;
        currentUser = profile;
        
        document.getElementById('loginContainer').remove();
        document.getElementById('appLayout').style.display = 'flex';
        
        await initializeApp();
        
    } catch (error) {
        console.error('Login error:', error);
        
        if (error.message.includes('Invalid login credentials')) {
            errorEl.textContent = '❌ Invalid email or password. Please try again.';
        } else {
            errorEl.textContent = '❌ Login failed. Please try again later.';
        }
        
        errorEl.style.display = 'block';
        document.getElementById('emailInput').value = '';
        document.getElementById('passwordInput').value = '';
        document.getElementById('emailInput').focus();
        
        const loginBtn = document.querySelector('.login-btn');
        loginBtn.textContent = 'Sign In';
        loginBtn.disabled = false;
    }
}

async function logout() {
    try {
        await SupabaseAPI.signOut();
        isAuthenticated = false;
        currentUser = null;
        location.reload();
    } catch (error) {
        console.error('Logout error:', error);
        location.reload();
    }
}

// Initialize app after login
async function initializeApp() {
    try {
        setupNavigation();
        setupKeyboardShortcuts();
        await loadProjectsFromDatabase();
        await loadTasksFromDatabase();
        await loadTeamMembersFromDatabase();
        await loadDesignerCapacities();
        loadTimerState();
        
        // Check if we were viewing a project detail before refresh
        const currentProjectId = localStorage.getItem('currentProjectId');
        if (currentProjectId) {
            // Find and show the project detail
            const project = projectsData.find(p => p.id === currentProjectId);
            if (project) {
                currentProject = project;
                currentView = 'project-detail';
                document.getElementById('content-area').innerHTML = renderProjectDetailPage(project);
                updatePendingCount();
                updateUserKPIs();
                return; // Don't continue to showView below
            } else {
                // Project not found, clear the stored ID
                localStorage.removeItem('currentProjectId');
            }
        }
        
        // Restore last viewed page or default to dashboard
        const lastView = localStorage.getItem('lastView') || 'dashboard';
        showView(lastView);
        updatePendingCount();
        updateUserKPIs();
    } catch (error) {
        console.error('App initialization error:', error);
        showNotification('Failed to load data. Please refresh the page.', 'error');
    }
}

// Load projects from Supabase
async function loadProjectsFromDatabase() {
    try {
        showLoading('Loading projects...');
        const projects = await SupabaseAPI.getAllProjects();
        
        projectsData = projects.map(p => ({
            id: p.id,
            jobNumber: p.job_number,
            name: p.name,
            client: p.client,
            projectType: p.project_type,
            orderType: p.order_type,
            status: p.status,
            dueDate: formatDateFromDB(p.due_date),
            orderDate: formatDateFromDB(p.order_date),
            startDate: formatDateFromDB(p.start_date),
            firstIssueDate: formatDateFromDB(p.first_issue_date),
            firstIssueTarget: formatDateFromDB(p.first_issue_target),
            daysToIssue: p.days_to_issue || 0,
            salesPerson: p.sales_person,
            designer: p.designer,
            assignee: p.assignee,
            currentVersion: p.current_version,
            priority: p.priority,
            description: p.description,
            budget: p.budget,
            progress: p.progress || 0,
            signedOff: p.signed_off,
            issuedToProduction: formatDateFromDB(p.issued_to_production),
            signOffLeadTime: p.sign_off_lead_time || 0,
            totalChanges: p.total_changes || 0,
            structuralCalcs: p.structural_calcs,
            calcsType: p.calcs_type,
            calcsStatus: p.calcs_status,
            calcsDateRequested: formatDateFromDB(p.calcs_date_requested),
            oakM3: p.oak_m3,
            swM3: p.sw_m3,
            framePrice: p.frame_price,
            timeEntries: [],
            totalTimeMinutes: 0,
            timerRunning: false,
            timerStartTime: null,
            notes: p.notes,
            briefFeedback: p.brief_feedback,
            bomFeedback: p.bom_feedback,
            clientReviewSentDate: formatDateFromDB(p.client_review_sent_date),
            clientReviewReceivedDate: formatDateFromDB(p.client_review_received_date),
            complexityScore: p.complexity_score || 3
        }));
        
        // Load ALL time entries in one query instead of per-project
        const allTimeEntries = await SupabaseAPI.getAllTimeEntries();
        
        // Group time entries by project
        for (let project of projectsData) {
            project.timeEntries = allTimeEntries
                .filter(te => te.project_id === project.id)
                .map(te => ({
                    id: te.id,
                    date: formatDateFromDB(te.date),
                    duration: te.duration,
                    type: te.type,
                    description: te.description,
                    revision: te.revision
                }));
            project.totalTimeMinutes = project.timeEntries.reduce((sum, te) => sum + te.duration, 0);
        }
        
        hideLoading();
    } catch (error) {
        hideLoading();
        console.error('Failed to load projects:', error);
        showNotification('Failed to load projects. Please refresh the page.', 'error');
        throw error;
    }
}

// Load designer capacities from database
let designerCapacities = [];
async function loadDesignerCapacities() {
    try {
        designerCapacities = await SupabaseAPI.getAllDesignerCapacities();
    } catch (error) {
        console.error('Failed to load designer capacities:', error);
        designerCapacities = [];
    }
}

// Load team members from Supabase
async function loadTeamMembersFromDatabase() {
    try {
        const users = await SupabaseAPI.getAllUsers();
        
        teamMembers = users.map(u => ({
            id: u.id,
            username: u.email.split('@')[0],
            password: '',
            name: u.name,
            role: u.role,
            email: u.email,
            active: u.active,
            kpis: { projectsCompleted: 0, projectsInProgress: 0, totalTimeLogged: 0, averageCompletionTime: 0, onTimeDelivery: 0 }
        }));
        
        // Load all KPIs in one query
        const allKpis = await SupabaseAPI.getAllUserKPIs();
        const kpisMap = new Map(allKpis.map(k => [k.user_id, k]));
        
        for (let member of teamMembers) {
            const kpis = kpisMap.get(member.id);
            if (kpis) {
                member.kpis = {
                    projectsCompleted: kpis.projects_completed || 0,
                    projectsInProgress: kpis.projects_in_progress || 0,
                    totalTimeLogged: kpis.total_time_logged || 0,
                    averageCompletionTime: kpis.average_completion_time || 0,
                    onTimeDelivery: kpis.on_time_delivery || 0
                };
            }
        }
        
    } catch (error) {
        console.error('Failed to load team members:', error);
        throw error;
    }
}

// Helper functions for date formatting
function formatDateFromDB(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function formatDateToDB(dateString) {
    if (!dateString) return null;
    
    // Check if already in YYYY-MM-DD format (from HTML5 date input)
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        return dateString; // Already in correct format
    }
    
    // Convert from DD/MM/YYYY format
    const parts = dateString.split('/');
    if (parts.length !== 3) return null;
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
}

// Project Data Store
let projectsData = [];
let tasksData = [];

// Load sample projects - will be replaced by database
const loadSampleProjects = () => [
    {
        id: 1,
        jobNumber: 'JOB-2025-001',
        name: 'Office Building Renovation',
        client: 'ABC Corporation',
        projectType: 'Order',
        orderType: 'New Build',
        status: 'In Progress',
        dueDate: '15/11/2025',
        orderDate: '01/09/2025',
        startDate: '01/09/2025',
        firstIssueDate: '15/09/2025',
        firstIssueTarget: '12/09/2025',
        daysToIssue: 14,
        salesPerson: 'Michael Brown',
        designer: 'John Smith',
        assignee: 'John Smith',
        currentVersion: 'Rev 3',
        priority: 'High',
        description: 'Complete renovation of the main office building including structural improvements.',
        budget: '$450,000',
        progress: 65,
        signedOff: 'No',
        issuedToProduction: '20/09/2025',
        signOffLeadTime: 5,
        totalChanges: 3,
        structuralCalcs: 'Yes',
        calcsType: "L&P's & Frame Calcs",
        calcsStatus: 'Received',
        calcsDateRequested: '05/09/2025',
        oakM3: 12.5,
        swM3: 8.3,
        framePrice: 45000.00,
        timeEntries: [
            { date: '15/09/2025', duration: 120, type: 'auto', description: 'Initial design work', revision: 'V1' },
            { date: '16/09/2025', duration: 90, type: 'manual', description: 'Client meeting', revision: 'V2' }
        ],
        totalTimeMinutes: 210,
        timerRunning: false,
        timerStartTime: null,
        notes: 'Client requested changes to the lobby design. Revised plans submitted for approval.'
    },
    {
        id: 2,
        jobNumber: 'JOB-2025-002',
        name: 'Residential Complex - Phase 2',
        client: 'XYZ Developers',
        projectType: 'Planning',
        orderType: 'Renovation',
        status: 'Requested',
        dueDate: '01/12/2025',
        orderDate: '01/10/2025',
        startDate: '15/10/2025',
        firstIssueDate: '18/10/2025',
        firstIssueTarget: '15/10/2025',
        daysToIssue: 17,
        salesPerson: 'Sarah Williams',
        designer: 'Sarah Johnson',
        assignee: 'Sarah Johnson',
        currentVersion: 'Rev 1',
        priority: 'Medium',
        description: 'Second phase of residential development including 120 units across 3 buildings.',
        budget: '$2,500,000',
        progress: 25,
        signedOff: 'No',
        issuedToProduction: '',
        signOffLeadTime: 0,
        totalChanges: 1,
        structuralCalcs: 'Yes',
        calcsStatus: 'Pending',
        timeEntries: [],
        totalTimeMinutes: 0,
        timerRunning: false,
        timerStartTime: null,
        notes: 'Waiting for planning permission approval from local authorities.'
    },
    {
        id: 3,
        jobNumber: 'JOB-2025-003',
        name: 'Commercial Plaza Design',
        client: 'Metro Properties',
        projectType: 'Visual',
        orderType: 'Commercial',
        status: 'Changing',
        dueDate: '30/10/2025',
        orderDate: '01/08/2025',
        startDate: '01/08/2025',
        firstIssueDate: '10/08/2025',
        firstIssueTarget: '12/08/2025',
        daysToIssue: 9,
        salesPerson: 'David Lee',
        designer: 'Mike Chen',
        assignee: 'Mike Chen',
        currentVersion: 'Rev 5',
        priority: 'High',
        description: 'Modern commercial plaza with retail spaces, restaurants, and entertainment facilities.',
        budget: '$1,200,000',
        progress: 90,
        signedOff: 'Pending',
        issuedToProduction: '01/09/2025',
        signOffLeadTime: 8,
        totalChanges: 5,
        structuralCalcs: 'Yes',
        calcsStatus: 'Approved',
        timeEntries: [],
        totalTimeMinutes: 0,
        timerRunning: false,
        timerStartTime: null,
        notes: 'Client reviewing final drawings. Minor revisions expected.'
    },
    {
        id: 4,
        jobNumber: 'JOB-2025-004',
        name: 'Municipal Park Layout',
        client: 'City Council',
        projectType: 'Planning',
        orderType: 'Landscape',
        status: 'Completed',
        dueDate: '20/10/2025',
        orderDate: '01/07/2025',
        startDate: '01/07/2025',
        firstIssueDate: '20/07/2025',
        firstIssueTarget: '22/07/2025',
        daysToIssue: 19,
        salesPerson: 'Jennifer Davis',
        designer: 'Emma Davis',
        assignee: 'Emma Davis',
        currentVersion: 'Rev 2',
        priority: 'Low',
        description: 'Landscape design for new municipal park including walking paths and green spaces.',
        budget: '$180,000',
        progress: 100,
        signedOff: 'Yes',
        issuedToProduction: '05/08/2025',
        signOffLeadTime: 3,
        totalChanges: 2,
        structuralCalcs: 'No',
        calcsStatus: 'N/A',
        timeEntries: [],
        totalTimeMinutes: 0,
        timerRunning: false,
        timerStartTime: null,
        notes: 'Project successfully completed and delivered to client.'
    },
    {
        id: 5,
        jobNumber: 'JOB-2025-005',
        name: 'Industrial Warehouse',
        client: 'Logistics Inc',
        projectType: 'Order',
        orderType: 'Industrial',
        status: 'Signed Off',
        dueDate: '25/11/2025',
        orderDate: '15/09/2025',
        startDate: '15/09/2025',
        firstIssueDate: '01/10/2025',
        firstIssueTarget: '30/09/2025',
        daysToIssue: 16,
        salesPerson: 'Robert Taylor',
        designer: 'John Smith',
        assignee: 'John Smith',
        currentVersion: 'Rev 2',
        priority: 'Medium',
        description: 'Large industrial warehouse facility with office spaces and loading docks.',
        budget: '$850,000',
        progress: 85,
        signedOff: 'Yes',
        issuedToProduction: '',
        signOffLeadTime: 0,
        totalChanges: 2,
        structuralCalcs: 'Yes',
        calcsStatus: 'In Review',
        timeEntries: [],
        totalTimeMinutes: 0,
        timerRunning: false,
        timerStartTime: null,
        notes: 'Structural engineer reviewing foundation design. Signed off by client.'
    },
    {
        id: 6,
        jobNumber: 'JOB-2025-006',
        name: 'Retail Store Mockup',
        client: 'Fashion Boutique',
        projectType: 'Visual',
        orderType: 'Commercial',
        status: 'In Progress',
        dueDate: '10/11/2025',
        orderDate: '01/10/2025',
        startDate: '01/10/2025',
        firstIssueDate: '',
        firstIssueTarget: '05/11/2025',
        daysToIssue: 0,
        salesPerson: 'Michael Brown',
        designer: 'Mike Chen',
        assignee: 'Mike Chen',
        currentVersion: 'Rev 1',
        priority: 'High',
        description: '3D visualization and mockup for new retail store layout.',
        budget: '$45,000',
        progress: 60,
        signedOff: 'No',
        issuedToProduction: '',
        signOffLeadTime: 0,
        totalChanges: 0,
        structuralCalcs: 'No',
        calcsStatus: 'N/A',
        timeEntries: [],
        totalTimeMinutes: 0,
        timerRunning: false,
        timerStartTime: null,
        notes: 'Client requested additional lighting options for display areas.'
    },
    {
        id: 7,
        jobNumber: 'JOB-2025-007',
        name: 'Apartment Complex Plans',
        client: 'Urban Developers',
        projectType: 'Planning',
        orderType: 'Renovation',
        status: 'On Hold',
        dueDate: '15/12/2025',
        orderDate: '20/09/2025',
        startDate: '20/09/2025',
        firstIssueDate: '',
        firstIssueTarget: '20/10/2025',
        daysToIssue: 0,
        salesPerson: 'Sarah Williams',
        designer: 'Sarah Johnson',
        assignee: 'Sarah Johnson',
        currentVersion: 'Rev 1',
        priority: 'Low',
        description: 'Planning drawings for multi-story apartment complex.',
        budget: '$320,000',
        progress: 35,
        signedOff: 'No',
        issuedToProduction: '',
        signOffLeadTime: 0,
        totalChanges: 0,
        structuralCalcs: 'Yes',
        calcsStatus: 'Required',
        timeEntries: [],
        totalTimeMinutes: 0,
        timerRunning: false,
        timerStartTime: null,
        notes: 'On hold pending client financing approval.'
    },
    {
        id: 8,
        jobNumber: 'JOB-2025-008',
        name: 'Shopping Mall Order',
        client: 'Retail Group',
        projectType: 'Order',
        orderType: 'Commercial',
        status: 'Sent to Production',
        dueDate: '25/10/2025',
        orderDate: '15/08/2025',
        startDate: '15/08/2025',
        firstIssueDate: '30/08/2025',
        firstIssueTarget: '01/09/2025',
        daysToIssue: 15,
        salesPerson: 'David Lee',
        designer: 'Emma Davis',
        assignee: 'Emma Davis',
        currentVersion: 'Rev 4',
        priority: 'High',
        description: 'Complete order package for shopping mall renovation.',
        budget: '$780,000',
        progress: 100,
        signedOff: 'Yes',
        issuedToProduction: '10/09/2025',
        signOffLeadTime: 11,
        totalChanges: 4,
        structuralCalcs: 'Yes',
        calcsStatus: 'Approved',
        timeEntries: [],
        totalTimeMinutes: 0,
        timerRunning: false,
        timerStartTime: null,
        notes: 'All drawings signed off and sent to production team.'
    }
];

// Initialize sample data (will be replaced by database load)
// projectsData = loadSampleProjects();

// Current view state
let currentView = 'projects';
let currentProject = null;
let currentTask = null;
let isEditing = false;
let searchTerm = '';
let filterStatus = '';
let filterOrderType = '';
let filterProjectType = '';
let filterSalesPerson = '';
let filterDesigner = '';
let sortColumn = '';
let sortDirection = 'asc';

// Status options by project type
const statusOptions = {
    'Planning': ['Requested', 'In Progress', 'Checking', 'With Client', 'On Hold', 'Changing', 'Completed'],
    'Visual': ['Requested', 'In Progress', 'Checking', 'With Client', 'On Hold', 'Changing', 'Completed'],
    'Order': ['Requested', 'In Progress', 'Checking', 'With Client', 'On Hold', 'Changing', 'Signed Off', 'Sent to Production', 'Completed', 'Cancelled']
};

// Timer persistence functions
function saveTimerState() {
    const activeTimers = projectsData
        .filter(p => p.timerRunning || p.timerPaused)
        .map(p => ({
            id: p.id,
            timerRunning: p.timerRunning,
            timerPaused: p.timerPaused,
            timerStartTime: p.timerStartTime,
            pausedTime: p.pausedTime || 0
        }));
    localStorage.setItem('activeTimers', JSON.stringify(activeTimers));
}

function loadTimerState() {
    const saved = localStorage.getItem('activeTimers');
    if (!saved) return;
    
    try {
        const activeTimers = JSON.parse(saved);
        activeTimers.forEach(timer => {
            const project = projectsData.find(p => p.id === timer.id);
            if (project) {
                project.timerRunning = timer.timerRunning;
                project.timerPaused = timer.timerPaused;
                project.timerStartTime = timer.timerStartTime;
                project.pausedTime = timer.pausedTime || 0;
                
                // Restart interval if timer was running
                if (project.timerRunning) {
                    timerIntervals[project.id] = setInterval(() => {
                        updateTimerDisplay(project.id);
                    }, 1000);
                }
            }
        });
    } catch (e) {
        console.error('Failed to load timer state:', e);
    }
}

function hasActiveTimers() {
    return projectsData.some(p => p.timerRunning);
}

// Initialize app
document.addEventListener('DOMContentLoaded', async function() {
    const authenticated = await checkAuth();
    if (!authenticated) return;
    
    // User was already logged in, initialize app
    await initializeApp();
});

// Warn before leaving page if timers are running
window.addEventListener('beforeunload', function(e) {
    if (hasActiveTimers()) {
        e.preventDefault();
        e.returnValue = 'You have active timers running. Are you sure you want to leave?';
        return e.returnValue;
    }
});

// Keyboard Shortcuts
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Escape key - close modals
        if (e.key === 'Escape') {
            closeModal();
            
            // Also close any confirm/error modals
            const confirmModal = document.querySelector('.confirm-modal-overlay');
            if (confirmModal) {
                confirmModal.remove();
            }
        }
        
        // Cmd/Ctrl + K - Focus search (if implemented)
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.focus();
                searchInput.select();
            }
        }
        
        // N key - New project (only if not in input field)
        if (e.key === 'n' && !isInputFocused()) {
            e.preventDefault();
            if (currentView === 'projects') {
                showAddProjectModal();
            }
        }
    });
}

function isInputFocused() {
    const active = document.activeElement;
    return active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.tagName === 'SELECT' || active.isContentEditable);
}

// Navigation setup
function setupNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            const view = this.dataset.view;
            if (view) {
                showView(view);
            }
        });
    });
    updateSidebarUser();
}

function updateSidebarUser() {
    const sidebarUser = document.getElementById('sidebarUser');
    if (currentUser && sidebarUser) {
        const initials = currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase();
        sidebarUser.innerHTML = `
            <div class="user-avatar-small">${initials}</div>
            <div class="user-info-small">
                <div class="user-name-small">${currentUser.name}</div>
                <div class="user-role-small">${currentUser.role}</div>
            </div>
        `;
    }
}

// Show view
function showView(view) {
    currentView = view;
    currentProject = null;
    isEditing = false;
    
    // Clear project ID when leaving project detail
    if (view === 'projects') {
        localStorage.removeItem('currentProjectId');
    }
    
    // Save current view to localStorage for page refresh
    localStorage.setItem('lastView', view);
    
    // Update active nav
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.view === view) {
            item.classList.add('active');
        }
    });
    
    // Render content
    const contentArea = document.getElementById('content-area');
    
    switch(view) {
        case 'dashboard':
            contentArea.innerHTML = renderDashboardPage();
            attachDashboardEventListeners();
            break;
        case 'projects':
            contentArea.innerHTML = renderProjectsPage();
            try {
                attachProjectsEventListeners();
            } catch (e) {
                console.error('Error attaching event listeners:', e);
            }
            break;
        case 'gantt':
            contentArea.innerHTML = renderGanttChart();
            attachGanttEventListeners();
            break;
        case 'calendar':
            contentArea.innerHTML = renderCalendarPage();
            break;
        case 'team':
            contentArea.innerHTML = renderTeamPage();
            attachTeamEventListeners();
            break;
        case 'reports':
            contentArea.innerHTML = renderReportsPage();
            break;
        case 'tasks':
            contentArea.innerHTML = renderTasksPage();
            break;
        case 'settings':
            contentArea.innerHTML = renderSettingsPage();
            break;
        default:
            contentArea.innerHTML = renderProjectsPage();
            attachProjectsEventListeners();
    }
}

// =====================================================
// Dashboard Page - Summary Overview Only
// =====================================================
function renderDashboardPage() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Calculate key metrics
    const overdueProjects = projectsData.filter(p => {
        if (!p.dueDate) return false;
        if (p.status === 'Completed' || p.status === 'Cancelled' || p.status === 'Sent to Production') return false;
        const dueDate = parseDate(p.dueDate);
        if (!dueDate || isNaN(dueDate.getTime())) return false; // Invalid date
        dueDate.setHours(0, 0, 0, 0);
        return dueDate < today;
    });
    const overdueCount = overdueProjects.length;
    
    const dueTodayCount = projectsData.filter(p => {
        if (!p.dueDate) return false;
        if (p.status === 'Completed' || p.status === 'Cancelled' || p.status === 'Sent to Production') return false;
        const dueDate = parseDate(p.dueDate);
        if (!dueDate || isNaN(dueDate.getTime())) return false; // Invalid date
        dueDate.setHours(0, 0, 0, 0);
        return dueDate.getTime() === today.getTime();
    }).length;
    
    const endOfWeek = new Date(today);
    endOfWeek.setDate(endOfWeek.getDate() + (7 - today.getDay()));
    const dueThisWeekCount = projectsData.filter(p => {
        if (!p.dueDate) return false;
        if (p.status === 'Completed' || p.status === 'Cancelled' || p.status === 'Sent to Production') return false;
        const dueDate = parseDate(p.dueDate);
        if (!dueDate || isNaN(dueDate.getTime())) return false; // Invalid date
        dueDate.setHours(0, 0, 0, 0);
        return dueDate > today && dueDate <= endOfWeek;
    }).length;
    
    const totalActive = projectsData.filter(p => 
        p.status !== 'Completed' && p.status !== 'Cancelled'
    ).length;
    
    // Status breakdown
    const statusCounts = {
        'In Progress': projectsData.filter(p => p.status === 'In Progress').length,
        'Checking': projectsData.filter(p => p.status === 'Checking').length,
        'With Client': projectsData.filter(p => p.status === 'With Client').length,
        'Signed Off': projectsData.filter(p => p.status === 'Signed Off').length,
        'On Hold': projectsData.filter(p => p.status === 'On Hold').length,
        'Completed': projectsData.filter(p => p.status === 'Completed').length
    };
    
    // Project type breakdown
    const typeCounts = {
        'Visual': projectsData.filter(p => p.projectType === 'Visual' && p.status !== 'Completed' && p.status !== 'Cancelled').length,
        'Planning': projectsData.filter(p => p.projectType === 'Planning' && p.status !== 'Completed' && p.status !== 'Cancelled').length,
        'Order': projectsData.filter(p => p.projectType === 'Order' && p.status !== 'Completed' && p.status !== 'Cancelled').length
    };
    
    // Designer workload
    const designers = [...new Set(projectsData.map(p => p.designer))].filter(d => d);
    const designerWorkload = designers.map(designer => {
        const activeProjects = projectsData.filter(p => 
            p.designer === designer && 
            p.status !== 'Completed' && 
            p.status !== 'Cancelled'
        ).length;
        return { name: designer, count: activeProjects };
    }).sort((a, b) => b.count - a.count);
    
    return `
        <div class="dashboard-page">
            <div class="page-header">
                <div>
                    <h2>� Workload Overview</h2>
                    <p style="color: var(--gray-500); margin-top: 8px;">Real-time summary of all projects and team capacity</p>
                </div>
                <div class="header-actions">
                    <button class="btn-primary" onclick="addNewProject()">+ New Project</button>
                </div>
            </div>
            
            <!-- Quick Stats -->
            <div class="dashboard-stats-grid">
                <div class="dashboard-stat-card ${overdueCount > 0 ? 'stat-danger' : 'stat-success'}">
                    <div class="stat-icon">${overdueCount > 0 ? '🚨' : '✓'}</div>
                    <div class="stat-content">
                        <div class="stat-value">${overdueCount}</div>
                        <div class="stat-label">Overdue Projects</div>
                    </div>
                    ${overdueCount > 0 ? `<button class="stat-action" onclick="showOverdueProjects()">View →</button>` : ''}
                </div>
                
                <div class="dashboard-stat-card ${dueTodayCount > 0 ? 'stat-warning' : 'stat-info'}">
                    <div class="stat-icon">⏰</div>
                    <div class="stat-content">
                        <div class="stat-value">${dueTodayCount}</div>
                        <div class="stat-label">Due Today</div>
                    </div>
                    ${dueTodayCount > 0 ? `<button class="stat-action" onclick="showDueTodayProjects()">View →</button>` : ''}
                </div>
                
                <div class="dashboard-stat-card stat-info">
                    <div class="stat-icon">📅</div>
                    <div class="stat-content">
                        <div class="stat-value">${dueThisWeekCount}</div>
                        <div class="stat-label">Due This Week</div>
                    </div>
                    ${dueThisWeekCount > 0 ? `<button class="stat-action" onclick="showDueThisWeekProjects()">View →</button>` : ''}
                </div>
                
                <div class="dashboard-stat-card stat-success">
                    <div class="stat-icon">📋</div>
                    <div class="stat-content">
                        <div class="stat-value">${totalActive}</div>
                        <div class="stat-label">Active Projects</div>
                    </div>
                    <button class="stat-action" onclick="showView('projects')">View →</button>
                </div>
            </div>
            
            <!-- Summary Grid -->
            <div class="dashboard-summary-grid">
                <!-- Status Breakdown -->
                <div class="dashboard-card">
                    <div class="dashboard-card-header">
                        <h3>� Projects by Status</h3>
                        <span class="badge badge-primary">${totalActive} Active</span>
                    </div>
                    <div class="dashboard-card-body">
                        <div class="summary-list">
                            ${Object.entries(statusCounts).map(([status, count]) => `
                                <div class="summary-item">
                                    <div class="summary-label">
                                        <span class="status-badge ${getStatusClass(status)}">${status}</span>
                                    </div>
                                    <div class="summary-value">${count}</div>
                                </div>
                            `).join('')}
                        </div>
                        <button class="btn-secondary btn-block" onclick="showView('reports')" style="margin-top: 16px;">
                            View Detailed Reports
                        </button>
                    </div>
                </div>
                
                <!-- Project Type Breakdown -->
                <div class="dashboard-card">
                    <div class="dashboard-card-header">
                        <h3>🗂️ Active by Type</h3>
                    </div>
                    <div class="dashboard-card-body">
                        <div class="summary-list">
                            ${Object.entries(typeCounts).map(([type, count]) => `
                                <div class="summary-item">
                                    <div class="summary-label">
                                        <span class="type-badge">${type}</span>
                                    </div>
                                    <div class="summary-value-with-bar">
                                        <span class="summary-value">${count}</span>
                                        <div class="summary-bar">
                                            <div class="summary-bar-fill" style="width: ${totalActive > 0 ? (count / totalActive * 100) : 0}%"></div>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--gray-200); display: flex; justify-content: space-between; color: var(--gray-600); font-size: 14px;">
                            <span>Total Active Projects</span>
                            <strong>${totalActive}</strong>
                        </div>
                    </div>
                </div>
                
                <!-- Designer Workload -->
                <div class="dashboard-card">
                    <div class="dashboard-card-header">
                        <h3>� Team Workload</h3>
                        <span class="badge badge-info">${designers.length} Designers</span>
                    </div>
                    <div class="dashboard-card-body">
                        <div class="summary-list">
                            ${designerWorkload.slice(0, 8).map(designer => {
                                const percentage = totalActive > 0 ? (designer.count / totalActive * 100) : 0;
                                const statusClass = designer.count > 8 ? 'danger' : designer.count > 5 ? 'warning' : 'success';
                                return `
                                    <div class="summary-item">
                                        <div class="summary-label">
                                            <span class="designer-name">👤 ${designer.name}</span>
                                        </div>
                                        <div class="summary-value-with-bar">
                                            <span class="summary-value badge-${statusClass}">${designer.count}</span>
                                            <div class="summary-bar">
                                                <div class="summary-bar-fill bar-${statusClass}" style="width: ${percentage}%"></div>
                                            </div>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                            ${designerWorkload.length > 8 ? `
                                <div style="margin-top: 12px; text-align: center; color: var(--gray-500); font-size: 14px;">
                                    + ${designerWorkload.length - 8} more designers
                                </div>
                            ` : ''}
                        </div>
                        <button class="btn-secondary btn-block" onclick="showView('team')" style="margin-top: 16px;">
                            View Team Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function attachDashboardEventListeners() {
    // Event listeners are inline for now (onclick attributes)
    // Could be enhanced with proper event delegation
}

function showOverdueProjects() {
    filterStatus = '';
    filterOrderType = '';
    filterProjectType = '';
    searchTerm = '';
    // Show projects and apply overdue filter
    showView('projects');
    // Custom filter for overdue
    setTimeout(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        // This is a simplified approach - you'd want to add proper overdue filter
        showNotification('Showing overdue projects', 'info');
    }, 100);
}

function showDueTodayProjects() {
    filterStatus = '';
    filterOrderType = '';
    filterProjectType = '';
    searchTerm = '';
    showView('projects');
    showNotification('Showing projects due today', 'info');
}

function showDueThisWeekProjects() {
    filterStatus = '';
    filterOrderType = '';
    filterProjectType = '';
    searchTerm = '';
    showView('projects');
    showNotification('Showing projects due this week', 'info');
}

function showMyProjects() {
    if (currentUser) {
        filterDesigner = currentUser.name;
        showView('projects');
    }
}

// Render Projects Page
function renderProjectsPage() {
    const filtered = filterProjectsList();
    const sorted = sortProjectsList(filtered);
    
    const getSortIcon = (column) => {
        if (sortColumn !== column) return '↕️';
        return sortDirection === 'asc' ? '↑' : '↓';
    };
    
    return `
        <div class="projects-page">
            <div class="page-header">
                <h2>Drawing Projects</h2>
                <div class="header-actions">
                    <div class="search-box">
                        <span class="search-icon">🔍</span>
                        <input type="text" placeholder="Search projects..." id="searchInput" value="${searchTerm}">
                    </div>
                    <button class="btn-secondary" onclick="toggleFilters()" id="filterBtn">
                        ${filterStatus || filterOrderType || filterProjectType || filterSalesPerson || filterDesigner ? '🔍 Filters Active' : '🔍 Filter'}
                    </button>
                    <button class="btn-secondary" onclick="clearAllFilters()">Clear Filters</button>
                    <button class="btn-primary" onclick="addNewProject()">+ New Project</button>
                </div>
            </div>
            
            <div class="filters-panel" id="filtersPanel" style="display: none;">
                <div class="filters-grid">
                    <div class="filter-group">
                        <label>Status</label>
                        <select id="filterStatus" onchange="applyFilters()">
                            <option value="">All Statuses</option>
                            <option value="Requested" ${filterStatus === 'Requested' ? 'selected' : ''}>Requested</option>
                            <option value="In Progress" ${filterStatus === 'In Progress' ? 'selected' : ''}>In Progress</option>
                            <option value="Checking" ${filterStatus === 'Checking' ? 'selected' : ''}>Checking</option>
                            <option value="With Client" ${filterStatus === 'With Client' ? 'selected' : ''}>With Client</option>
                            <option value="On Hold" ${filterStatus === 'On Hold' ? 'selected' : ''}>On Hold</option>
                            <option value="Changing" ${filterStatus === 'Changing' ? 'selected' : ''}>Changing</option>
                            <option value="Signed Off" ${filterStatus === 'Signed Off' ? 'selected' : ''}>Signed Off</option>
                            <option value="Sent to Production" ${filterStatus === 'Sent to Production' ? 'selected' : ''}>Sent to Production</option>
                            <option value="Completed" ${filterStatus === 'Completed' ? 'selected' : ''}>Completed</option>
                            <option value="Cancelled" ${filterStatus === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label>Order Type</label>
                        <select id="filterOrderType" onchange="applyFilters()">
                            <option value="">All Types</option>
                            <option value="New Order" ${filterOrderType === 'New Order' ? 'selected' : ''}>New Order</option>
                            <option value="Repeat Order" ${filterOrderType === 'Repeat Order' ? 'selected' : ''}>Repeat Order</option>
                            <option value="Amendment" ${filterOrderType === 'Amendment' ? 'selected' : ''}>Amendment</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label>Task Type</label>
                        <select id="filterProjectType" onchange="applyFilters()">
                            <option value="">All Tasks</option>
                            <option value="Planning" ${filterProjectType === 'Planning' ? 'selected' : ''}>Planning</option>
                            <option value="Visual" ${filterProjectType === 'Visual' ? 'selected' : ''}>Visual</option>
                            <option value="Order" ${filterProjectType === 'Order' ? 'selected' : ''}>Order</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label>Sales Person</label>
                        <select id="filterSalesPerson" onchange="applyFilters()">
                            <option value="">All Sales</option>
                            ${[...new Set(projectsData.map(p => p.salesPerson))].sort().map(sp => 
                                `<option value="${sp}" ${filterSalesPerson === sp ? 'selected' : ''}>${sp}</option>`
                            ).join('')}
                        </select>
                    </div>
                    <div class="filter-group">
                        <label>Designer</label>
                        <select id="filterDesigner" onchange="applyFilters()">
                            <option value="">All Designers</option>
                            ${[...new Set(projectsData.map(p => p.designer))].sort().map(d => 
                                `<option value="${d}" ${filterDesigner === d ? 'selected' : ''}>${d}</option>`
                            ).join('')}
                        </select>
                    </div>
                </div>
            </div>
            
            <div class="table-container">
                <table class="projects-table">
                    <thead>
                        <tr>
                            <th class="sortable" onclick="sortBy('jobNumber')">
                                Job Number <span class="sort-icon">${getSortIcon('jobNumber')}</span>
                            </th>
                            <th class="sortable" onclick="sortBy('client')">
                                Client <span class="sort-icon">${getSortIcon('client')}</span>
                            </th>
                            <th class="sortable" onclick="sortBy('orderType')">
                                Order Type <span class="sort-icon">${getSortIcon('orderType')}</span>
                            </th>
                            <th class="sortable" onclick="sortBy('projectType')">
                                Task <span class="sort-icon">${getSortIcon('projectType')}</span>
                            </th>
                            <th class="sortable" onclick="sortBy('salesPerson')">
                                Sales Person <span class="sort-icon">${getSortIcon('salesPerson')}</span>
                            </th>
                            <th class="sortable" onclick="sortBy('designer')">
                                Designer <span class="sort-icon">${getSortIcon('designer')}</span>
                            </th>
                            <th class="sortable" onclick="sortBy('status')">
                                Status <span class="sort-icon">${getSortIcon('status')}</span>
                            </th>
                            <th class="sortable" onclick="sortBy('dueDate')">
                                Due Date <span class="sort-icon">${getSortIcon('dueDate')}</span>
                            </th>
                            <th class="sortable" onclick="sortBy('currentVersion')">
                                Current Version <span class="sort-icon">${getSortIcon('currentVersion')}</span>
                            </th>
                            <th class="sortable" onclick="sortBy('structuralCalcs')">
                                Calcs <span class="sort-icon">${getSortIcon('structuralCalcs')}</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        ${sorted.map(project => `
                            <tr onclick="showProjectDetail('${project.id}')" style="cursor: pointer;">
                                <td class="project-name">${project.jobNumber}</td>
                                <td>${project.client}</td>
                                <td>${project.orderType}</td>
                                <td>
                                    <span class="tasktype-badge ${getProjectTypeClass(project.projectType)}">
                                        ${project.projectType}
                                    </span>
                                </td>
                                <td>${project.salesPerson}</td>
                                <td>${project.designer}</td>
                                <td>
                                    <span class="status-badge ${getStatusClass(project.status)}">
                                        ${project.status}
                                    </span>
                                </td>
                                <td>${project.dueDate}</td>
                                <td>${project.currentVersion}</td>
                                <td>
                                    <span class="priority-badge ${project.structuralCalcs === 'Yes' ? 'priority-high' : 'priority-low'}">
                                        ${project.structuralCalcs}
                                    </span>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            ${sorted.length === 0 ? renderProjectsEmptyState() : ''}
        </div>
    `;
}

// Render New Project Page
function renderNewProjectPage(project) {
    const projectTypes = ['Planning', 'Visual', 'Order'];
    const priorities = ['Low', 'Medium', 'High'];
    const statusOpts = statusOptions[project.projectType] || [];
    const orderTypes = ['New Build', 'Renovation', 'Commercial', 'Landscape', 'Industrial', 'Other'];
    const yesNoOptions = ['Yes', 'No', 'Pending', 'N/A'];
    const calcsStatusOptions = ['Approved', 'In Review', 'Pending', 'Required', 'N/A'];
    
    return `
        <div class="project-detail-page">
            <div class="page-header">
                <button class="btn-back" onclick="cancelNewProject()">← Cancel</button>
                <div class="header-actions">
                    <button class="btn-primary" onclick="saveNewProject()">Save Project</button>
                </div>
            </div>
            
            <div class="project-header">
                <div>
                    <h2>New Project</h2>
                    <p class="client-name">Fill in the details below</p>
                </div>
            </div>
            
            <div class="content-grid">
                <div class="main-section">
                    <div class="card">
                        <h3>Job Information</h3>
                        <div class="detail-grid">
                            <div class="detail-item">
                                <label>Job Number *</label>
                                <input type="text" class="form-input" id="jobNumber" placeholder="e.g., JOB-2025-001" required>
                            </div>
                            <div class="detail-item">
                                <label>Client *</label>
                                <input type="text" class="form-input" id="projectClient" placeholder="Enter client name" required>
                            </div>
                            <div class="detail-item">
                                <label>Order Type *</label>
                                <input type="text" class="form-input" id="orderType" placeholder="e.g., New Build, Renovation" required>
                            </div>
                            <div class="detail-item">
                                <label>Task *</label>
                                <select class="form-input" id="projectType" onchange="updateProjectTypeStatus()">
                                    ${projectTypes.map(type => `
                                        <option value="${type}" ${type === project.projectType ? 'selected' : ''}>${type}</option>
                                    `).join('')}
                                </select>
                            </div>
                            <div class="detail-item">
                                <label>Status *</label>
                                <select class="form-input" id="projectStatus">
                                    ${statusOpts.map(s => `
                                        <option value="${s}" ${s === project.status ? 'selected' : ''}>${s}</option>
                                    `).join('')}
                                </select>
                            </div>
                            <div class="detail-item">
                                <label>Priority</label>
                                <select class="form-input" id="projectPriority">
                                    ${priorities.map(p => `
                                        <option value="${p}" ${p === project.priority ? 'selected' : ''}>${p}</option>
                                    `).join('')}
                                </select>
                            </div>
                            <div class="detail-item">
                                <label>Sales Person *</label>
                                <select class="form-input" id="salesPerson" required>
                                    <option value="">Select Sales Person</option>
                                    ${teamMembers.filter(m => m.active && m.role === 'Sales').map(m => `
                                        <option value="${m.name}">${m.name}</option>
                                    `).join('')}
                                </select>
                            </div>
                            <div class="detail-item">
                                <label>Designer *</label>
                                <select class="form-input" id="designer" required>
                                    <option value="">Select Designer</option>
                                    ${teamMembers.filter(m => m.active && ['Designer', 'Senior Designer', 'Lead Designer'].includes(m.role)).map(m => `
                                        <option value="${m.name}">${m.name}</option>
                                    `).join('')}
                                </select>
                            </div>
                            <div class="detail-item">
                                <label>Current Revision</label>
                                <select class="form-input" id="currentVersion">
                                    ${[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map(v => `<option value="${v}" ${v === 1 ? 'selected' : ''}>Rev ${v}</option>`).join('')}
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card">
                        <h3>Timeline & Dates</h3>
                        <div class="detail-grid">
                            <div class="detail-item">
                                <label>Requested Date *</label>
                                <input type="date" class="form-input" id="orderDate" required>
                            </div>
                            <div class="detail-item">
                                <label>Due Date *</label>
                                <input type="date" class="form-input" id="projectDueDate" required>
                            </div>
                            <div class="detail-item">
                                <label>First Issue Date</label>
                                <input type="date" class="form-input" id="firstIssueDate">
                            </div>
                            <div class="detail-item">
                                <label>Days to Issue</label>
                                <input type="number" class="form-input" id="daysToIssue" placeholder="Auto-calculated" readonly>
                            </div>
                            <div class="detail-item">
                                <label>Issued to Production</label>
                                <input type="date" class="form-input" id="issuedToProduction">
                            </div>
                            <div class="detail-item">
                                <label>Sign Off Lead Time (days)</label>
                                <input type="number" class="form-input" id="signOffLeadTime" value="0">
                            </div>
                        </div>
                    </div>
                    
                    <div class="card">
                        <h3>Structural Calculations</h3>
                        <div class="detail-grid">
                            <div class="detail-item">
                                <label>Structural Calcs Required?</label>
                                <select class="form-input" id="structuralCalcs" onchange="updateCalcsStatusField()">
                                    <option value="Yes">Yes</option>
                                    <option value="No" selected>No</option>
                                </select>
                            </div>
                            <div class="detail-item">
                                <label>Type Of Calcs</label>
                                <select class="form-input" id="calcsType" disabled>
                                    <option value="" selected>-</option>
                                    <option value="L&P's">L&P's</option>
                                    <option value="Frame Calcs">Frame Calcs</option>
                                    <option value="L&P's & Frame Calcs">L&P's & Frame Calcs</option>
                                </select>
                            </div>
                            <div class="detail-item">
                                <label>Date Requested</label>
                                <input type="date" class="form-input" id="calcsDateRequested" disabled>
                            </div>
                            <div class="detail-item">
                                <label>Status</label>
                                <select class="form-input" id="calcsStatus" disabled>
                                    <option value="N/A" selected>N/A</option>
                                    <option value="Requested">Requested</option>
                                    <option value="Received">Received</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card">
                        <h3>Description</h3>
                        <textarea class="notes-textarea" id="projectDescription" placeholder="Enter project description..." rows="4"></textarea>
                    </div>
                </div>
                
                <div class="sidebar-section">
                    <div class="card">
                        <h3>Notes</h3>
                        <textarea class="notes-textarea" id="projectNotes" placeholder="Add any additional notes..." rows="8"></textarea>
                    </div>
                    
                    <div class="card">
                        <h3>Requirements</h3>
                        <p style="font-size: 13px; color: #7f8c8d; line-height: 1.6;">
                            * Required fields must be filled in before saving the project.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Render Project Detail Page
function renderProjectDetailPage(project) {
    const statusOpts = statusOptions[project.projectType] || [];
    
    return `
        <div class="project-detail-page">
            <div class="page-header">
                <button class="btn-back" onclick="showView('projects')">← Back to Projects</button>
                <div class="header-actions">
                    ${isEditing ? `
                        <button class="btn-secondary" onclick="cancelEdit()">Cancel</button>
                        <button class="btn-primary" onclick="saveProject()">Save Changes</button>
                    ` : `
                        <button class="btn-secondary" onclick="deleteProject()" style="background: #ef4444; border-color: #dc2626;">Delete Project</button>
                        <button class="btn-primary" onclick="startEdit()">Edit Project</button>
                    `}
                </div>
            </div>
            
            <div class="project-header">
                <div>
                    <h2>${project.name}</h2>
                    <p class="client-name">Client: ${project.client}</p>
                    <p class="client-name">
                        <span class="tasktype-badge ${getProjectTypeClass(project.projectType)}">
                            ${project.projectType}
                        </span>
                    </p>
                </div>
                <div class="project-badges">
                    ${isEditing ? `
                        <select class="status-select" id="statusSelect">
                            ${statusOpts.map(s => `<option value="${s}" ${s === project.status ? 'selected' : ''}>${s}</option>`).join('')}
                        </select>
                    ` : `
                        <span class="status-badge ${getStatusClass(project.status)}">${project.status}</span>
                    `}
                    ${isEditing ? `
                        <select class="priority-select" id="prioritySelect">
                            <option value="Low" ${project.priority === 'Low' ? 'selected' : ''}>Low</option>
                            <option value="Medium" ${project.priority === 'Medium' ? 'selected' : ''}>Medium</option>
                            <option value="High" ${project.priority === 'High' ? 'selected' : ''}>High</option>
                        </select>
                    ` : `
                        <span class="priority-badge ${getPriorityClass(project.priority)}">${project.priority}</span>
                    `}
                    ${isEditing ? `
                        <select class="status-select" id="versionSelect" onchange="updateTotalChanges()">
                            ${[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map(v => `<option value="${v}" ${project.currentVersion.replace(/\D/g, '') == v ? 'selected' : ''}>Rev ${v}</option>`).join('')}
                        </select>
                    ` : `
                        <span class="status-badge" style="background: linear-gradient(135deg, #3b82f6 0%, #1e3a8a 100%); color: white;">${project.currentVersion}</span>
                    `}
                </div>
            </div>
            
            <div class="content-grid">
                <div class="main-section">
                    <div class="card">
                        <h3>Job Information</h3>
                        <div class="detail-grid">
                            <div class="detail-item">
                                <label>Job Number</label>
                                ${isEditing ? `
                                    <input type="text" class="form-input" id="jobNumber" value="${project.jobNumber}">
                                ` : `
                                    <p class="project-name">${project.jobNumber}</p>
                                `}
                            </div>
                            <div class="detail-item">
                                <label>Client</label>
                                ${isEditing ? `
                                    <input type="text" class="form-input" id="client" value="${project.client}">
                                ` : `
                                    <p>${project.client}</p>
                                `}
                            </div>
                            <div class="detail-item">
                                <label>Order Type</label>
                                ${isEditing ? `
                                    <input type="text" class="form-input" id="orderType" value="${project.orderType}">
                                ` : `
                                    <p>${project.orderType}</p>
                                `}
                            </div>
                            <div class="detail-item">
                                <label>Task</label>
                                ${isEditing ? `
                                    <select class="form-input" id="projectType" onchange="updateProjectTypeStatusInEdit()">
                                        <option value="Planning" ${project.projectType === 'Planning' ? 'selected' : ''}>Planning</option>
                                        <option value="Visual" ${project.projectType === 'Visual' ? 'selected' : ''}>Visual</option>
                                        <option value="Order" ${project.projectType === 'Order' ? 'selected' : ''}>Order</option>
                                    </select>
                                ` : `
                                    <p>
                                        <span class="tasktype-badge ${getProjectTypeClass(project.projectType)}">
                                            ${project.projectType}
                                        </span>
                                    </p>
                                `}
                            </div>
                            <div class="detail-item">
                                <label>Sales Person</label>
                                ${isEditing ? `
                                    <select class="form-input" id="salesPerson">
                                        <option value="">Select Sales Person</option>
                                        ${teamMembers.filter(m => m.active && m.role === 'Sales').map(m => `
                                            <option value="${m.name}" ${m.name === project.salesPerson ? 'selected' : ''}>${m.name}</option>
                                        `).join('')}
                                    </select>
                                ` : `
                                    <p>${project.salesPerson}</p>
                                `}
                            </div>
                            <div class="detail-item">
                                <label>Designer</label>
                                ${isEditing ? `
                                    <select class="form-input" id="designer">
                                        <option value="">Select Designer</option>
                                        ${teamMembers.filter(m => m.active && ['Designer', 'Senior Designer', 'Lead Designer'].includes(m.role)).map(m => `
                                            <option value="${m.name}" ${m.name === project.designer ? 'selected' : ''}>${m.name}</option>
                                        `).join('')}
                                    </select>
                                ` : `
                                    <p>${project.designer}</p>
                                `}
                            </div>
                        </div>
                    </div>
                    
                    <div class="card">
                        <h3>Timeline & Dates</h3>
                        <div class="detail-grid">
                            <div class="detail-item">
                                <label>Requested Date</label>
                                ${isEditing ? `
                                    <input type="date" class="form-input" id="orderDate" value="${formatDateToInput(project.orderDate)}">
                                ` : `
                                    <p>${project.orderDate}</p>
                                `}
                            </div>
                            <div class="detail-item">
                                <label>Due Date</label>
                                ${isEditing ? `
                                    <input type="date" class="form-input" id="dueDate" value="${formatDateToInput(project.dueDate)}">
                                ` : `
                                    <p>${project.dueDate}</p>
                                `}
                            </div>
                            <div class="detail-item">
                                <label>First Issue Date</label>
                                ${isEditing ? `
                                    <input type="date" class="form-input" id="firstIssueDate" value="${project.firstIssueDate ? formatDateToInput(project.firstIssueDate) : ''}">
                                ` : `
                                    <p>${project.firstIssueDate || 'Not issued yet'}</p>
                                `}
                            </div>
                            <div class="detail-item">
                                <label>Days to Issue</label>
                                <p>${project.daysToIssue || '-'}</p>
                            </div>
                            <div class="detail-item">
                                <label>Issued to Production</label>
                                ${isEditing ? `
                                    <input type="date" class="form-input" id="issuedToProduction" value="${project.issuedToProduction ? formatDateToInput(project.issuedToProduction) : ''}">
                                ` : `
                                    <p>${project.issuedToProduction || 'Not yet'}</p>
                                `}
                            </div>
                            <div class="detail-item">
                                <label>Sign Off Lead Time</label>
                                <p>${calculateSignOffLeadTime(project.orderDate, project.issuedToProduction)} days</p>
                            </div>
                            <div class="detail-item">
                                <label>Total Revisions</label>
                                <p id="totalChangesDisplay">${project.totalChanges}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card">
                        <h3>Structural Calculations</h3>
                        <div class="detail-grid">
                            <div class="detail-item">
                                <label>Structural Calcs Required?</label>
                                ${isEditing ? `
                                    <select class="form-input" id="structuralCalcs" onchange="updateCalcsStatusField()">
                                        <option value="Yes" ${project.structuralCalcs === 'Yes' ? 'selected' : ''}>Yes</option>
                                        <option value="No" ${project.structuralCalcs === 'No' ? 'selected' : ''}>No</option>
                                    </select>
                                ` : `
                                    <p>
                                        <span class="priority-badge ${project.structuralCalcs === 'Yes' ? 'priority-high' : 'priority-low'}">
                                            ${project.structuralCalcs}
                                        </span>
                                    </p>
                                `}
                            </div>
                            <div class="detail-item">
                                <label>Type Of Calcs</label>
                                ${isEditing ? `
                                    <select class="form-input" id="calcsType" ${project.structuralCalcs === 'No' ? 'disabled' : ''}>
                                        <option value="" ${!project.calcsType ? 'selected' : ''}>-</option>
                                        <option value="L&P's" ${project.calcsType === "L&P's" ? 'selected' : ''}>L&P's</option>
                                        <option value="Frame Calcs" ${project.calcsType === 'Frame Calcs' ? 'selected' : ''}>Frame Calcs</option>
                                        <option value="L&P's & Frame Calcs" ${project.calcsType === "L&P's & Frame Calcs" ? 'selected' : ''}>L&P's & Frame Calcs</option>
                                    </select>
                                ` : `
                                    <p>${project.calcsType || '-'}</p>
                                `}
                            </div>
                            <div class="detail-item">
                                <label>Date Requested</label>
                                ${isEditing ? `
                                    <input type="date" class="form-input" id="calcsDateRequested" value="${project.calcsDateRequested ? formatDateToInput(project.calcsDateRequested) : ''}" ${project.structuralCalcs === 'No' ? 'disabled' : ''}>
                                ` : `
                                    <p>${project.calcsDateRequested || '-'}</p>
                                `}
                            </div>
                            <div class="detail-item">
                                <label>Status</label>
                                ${isEditing ? `
                                    <select class="form-input" id="calcsStatus" ${project.structuralCalcs === 'No' ? 'disabled' : ''}>
                                        <option value="N/A" ${project.calcsStatus === 'N/A' ? 'selected' : ''}>N/A</option>
                                        <option value="Requested" ${project.calcsStatus === 'Requested' ? 'selected' : ''}>Requested</option>
                                        <option value="Received" ${project.calcsStatus === 'Received' ? 'selected' : ''}>Received</option>
                                    </select>
                                ` : `
                                    <p>
                                        <span class="status-badge ${getCalcsStatusClass(project.calcsStatus)}">
                                            ${project.calcsStatus}
                                        </span>
                                    </p>
                                `}
                            </div>
                        </div>
                    </div>
                    
                    <div class="card">
                        <h3>Time Tracking</h3>
                        <div class="time-summary">
                            <div class="time-total">
                                <label>Total Time Logged</label>
                                <p class="time-display">${formatTimeDisplay(project.totalTimeMinutes || 0)}</p>
                            </div>
                        </div>
                        
                        <div class="timer-controls" style="margin: 20px 0;">
                            ${project.timerRunning ? `
                                <button class="btn-secondary" onclick="pauseTimer('${project.id}')" style="background: #f39c12;">⏸ Pause Timer</button>
                                <button class="btn-secondary" onclick="stopTimer('${project.id}')" style="background: #e74c3c; margin-left: 8px;">⏹ Stop & Save</button>
                                <span class="timer-running" id="timerDisplay-${project.id}" style="margin-left: 10px; font-weight: bold; color: #e74c3c;">00:00:00</span>
                            ` : project.timerPaused ? `
                                <button class="btn-primary" onclick="resumeTimer('${project.id}')">▶ Resume Timer</button>
                                <button class="btn-secondary" onclick="stopTimer('${project.id}')" style="background: #e74c3c; margin-left: 8px;">⏹ Stop & Save</button>
                                <span class="timer-paused" id="timerDisplay-${project.id}" style="margin-left: 10px; font-weight: bold; color: #f39c12;">00:00:00 (Paused)</span>
                            ` : `
                                <button class="btn-primary" onclick="startTimer('${project.id}')">▶ Start Timer</button>
                            `}
                        </div>
                        
                        <div class="manual-time-entry" style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ecf0f1; ${project.timerRunning ? 'opacity: 0.5; pointer-events: none;' : ''}">
                            <h4 style="margin-bottom: 10px;">Add Manual Time Entry ${project.timerRunning ? '(Disabled while timer is running)' : ''}</h4>
                            <div class="detail-grid">
                                <div class="detail-item">
                                    <label>Duration (minutes)</label>
                                    <input type="number" class="form-input" id="manualDuration-${project.id}" placeholder="e.g., 60" min="1" ${project.timerRunning ? 'disabled' : ''}>
                                </div>
                                <div class="detail-item">
                                    <label>Description</label>
                                    <input type="text" class="form-input" id="manualDescription-${project.id}" placeholder="e.g., Client meeting" ${project.timerRunning ? 'disabled' : ''}>
                                </div>
                            </div>
                            <button class="btn-secondary" onclick="addManualTime('${project.id}')" style="margin-top: 10px;" ${project.timerRunning ? 'disabled' : ''}>+ Add Time Entry</button>
                        </div>
                        
                        <div class="time-entries-list" style="margin-top: 20px;">
                            <h4>Time Entries</h4>
                            ${(project.timeEntries && project.timeEntries.length > 0) ? `
                                <table class="projects-table" style="margin-top: 10px;">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Duration</th>
                                            <th>Type</th>
                                            <th>Description</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${project.timeEntries.map((entry, index) => `
                                            <tr>
                                                <td>${entry.date}</td>
                                                <td>${formatTimeDisplay(entry.duration)}</td>
                                                <td><span class="status-badge ${entry.type === 'auto' ? 'status-in-progress' : 'status-requested'}">${entry.type === 'auto' ? 'Timer' : 'Manual'}</span></td>
                                                <td>${entry.description}</td>
                                                <td><button class="btn-secondary" onclick="deleteTimeEntry('${project.id}', ${index})" style="padding: 4px 8px; font-size: 12px;">Delete</button></td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            ` : `
                                <p style="color: #7f8c8d; font-size: 14px; margin-top: 10px;">No time entries yet. Start the timer or add a manual entry.</p>
                            `}
                        </div>
                    </div>
                </div>
                
                <div class="sidebar-section">
                    <div class="card">
                        <h3>Notes</h3>
                        ${isEditing ? `
                            <textarea class="notes-textarea" id="notesTextarea">${project.notes}</textarea>
                        ` : `
                            <p class="notes-text">${project.notes}</p>
                        `}
                    </div>
                    
                    <div class="card">
                        <h3>Material & Cost</h3>
                        <div class="detail-grid">
                            <div class="detail-item">
                                <label>Oak m³</label>
                                ${isEditing ? `
                                    <input type="number" step="0.01" class="form-input" id="oakM3" value="${project.oakM3 || ''}" placeholder="0.00">
                                ` : `
                                    <p>${project.oakM3 ? project.oakM3 + ' m³' : '-'}</p>
                                `}
                            </div>
                            <div class="detail-item">
                                <label>S/W m³</label>
                                ${isEditing ? `
                                    <input type="number" step="0.01" class="form-input" id="swM3" value="${project.swM3 || ''}" placeholder="0.00">
                                ` : `
                                    <p>${project.swM3 ? project.swM3 + ' m³' : '-'}</p>
                                `}
                            </div>
                            <div class="detail-item">
                                <label>Sale Value</label>
                                ${isEditing ? `
                                    <input type="number" step="0.01" class="form-input" id="framePrice" value="${project.framePrice || ''}" placeholder="0.00">
                                ` : `
                                    <p>${project.framePrice ? '£' + parseFloat(project.framePrice).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '-'}</p>
                                `}
                            </div>
                        </div>
                    </div>
                    
                    <div class="card">
                        <h3>📋 BOM Feedback</h3>
                        ${isEditing ? `
                            <textarea class="notes-textarea" id="bomFeedback" placeholder="Add BOM error notes here. Leave empty if BOM is error-free...">${project.bomFeedback || ''}</textarea>
                            <small style="color: #666; display: block; margin-top: 8px;">
                                💡 Leave empty if production found no errors. Add notes if issues were found.
                            </small>
                        ` : `
                            <p class="notes-text">${project.bomFeedback || 'No BOM errors reported - error-free ✅'}</p>
                        `}
                    </div>
                    
                    <div class="card">
                        <h3>Brief Feedback</h3>
                        ${isEditing ? `
                            <textarea class="notes-textarea" id="briefFeedback" placeholder="Add feedback notes here...">${project.briefFeedback || ''}</textarea>
                        ` : `
                            <p class="notes-text">${project.briefFeedback || 'No feedback notes yet.'}</p>
                        `}
                    </div>
                    
                    <div class="card">
                        <h3>Project Complexity</h3>
                        <div class="info-group">
                            <div class="info-row">
                                <label>Complexity Score:</label>
                                ${isEditing ? `
                                    <select id="complexityScore" class="status-select">
                                        <option value="1" ${project.complexityScore === 1 ? 'selected' : ''}>1 - Very Simple</option>
                                        <option value="2" ${project.complexityScore === 2 ? 'selected' : ''}>2 - Simple</option>
                                        <option value="3" ${(project.complexityScore === 3 || !project.complexityScore) ? 'selected' : ''}>3 - Medium</option>
                                        <option value="4" ${project.complexityScore === 4 ? 'selected' : ''}>4 - Complex</option>
                                        <option value="5" ${project.complexityScore === 5 ? 'selected' : ''}>5 - Very Complex</option>
                                    </select>
                                ` : `
                                    <p>${['', 'Very Simple', 'Simple', 'Medium', 'Complex', 'Very Complex'][project.complexityScore || 3]}</p>
                                `}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Render Calendar Page
function renderGanttChart() {
    // Filter out cancelled projects
    const activeProjects = projectsData.filter(p => p.status !== 'Cancelled');
    
    if (activeProjects.length === 0) {
        return `
            <div class="page-header">
                <h2>📊 Gantt Chart</h2>
                <p>Project lifecycle timeline from request to completion</p>
            </div>
            <div class="gantt-empty">No active projects to display</div>
        `;
    }
    
    // Calculate date range
    const allDates = activeProjects.flatMap(p => {
        const dates = [parseDate(p.orderDate)];
        if (p.status === 'Completed' || p.status === 'Sent to Production') {
            if (p.issuedToProduction) dates.push(parseDate(p.issuedToProduction));
        }
        return dates.filter(d => d && !isNaN(d.getTime()));
    });
    
    if (allDates.length === 0) {
        return `
            <div class="page-header">
                <h2>📊 Gantt Chart</h2>
                <p>Project lifecycle timeline from request to completion</p>
            </div>
            <div class="gantt-empty">No valid dates found for projects</div>
        `;
    }
    
    const minDate = new Date(Math.min(...allDates));
    const maxDate = new Date(Math.max(...allDates));
    const today = new Date();
    
    // Extend range to include today if needed
    if (today > maxDate) maxDate.setTime(today.getTime());
    
    // Add some padding and round to month boundaries
    minDate.setDate(1);
    minDate.setMonth(minDate.getMonth() - 1);
    maxDate.setMonth(maxDate.getMonth() + 2);
    maxDate.setDate(0); // Last day of previous month
    
    const totalDays = Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24));
    const monthHeaders = generateMonthHeaders(minDate, maxDate, totalDays);
    const weekMarkers = generateWeekMarkers(minDate, maxDate, totalDays);
    
    const projectRows = activeProjects.map(project => {
        const startDate = parseDate(project.orderDate);
        if (!startDate || isNaN(startDate.getTime())) return '';
        
        let endDate;
        let isCompleted = false;
        
        if (project.status === 'Completed' && project.issuedToProduction) {
            endDate = parseDate(project.issuedToProduction);
            isCompleted = true;
        } else if (project.status === 'Sent to Production' && project.issuedToProduction) {
            endDate = parseDate(project.issuedToProduction);
            isCompleted = true;
        } else {
            endDate = new Date();
            isCompleted = false;
        }
        
        if (!endDate || isNaN(endDate.getTime())) endDate = new Date();
        
        const startOffset = Math.max(0, Math.ceil((startDate - minDate) / (1000 * 60 * 60 * 24)));
        const duration = Math.max(1, Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)));
        const leftPercent = (startOffset / totalDays) * 100;
        const widthPercent = (duration / totalDays) * 100;
        
        const statusClass = getStatusClass(project.status);
        const daysOverdue = project.dueDate ? Math.ceil((today - parseDate(project.dueDate)) / (1000 * 60 * 60 * 24)) : 0;
        const isOverdue = !isCompleted && daysOverdue > 0;
        
        return `
            <div class="gantt-row">
                <div class="gantt-row-label">
                    <div class="gantt-project-info">
                        <span class="gantt-job-number">${project.jobNumber}</span>
                    </div>
                </div>
                <div class="gantt-row-timeline">
                    <div class="gantt-bar ${statusClass} ${isOverdue ? 'overdue' : ''}" 
                         style="left: ${leftPercent}%; width: ${widthPercent}%;"
                         data-project-id="${project.id}">
                        <span class="gantt-bar-type">${project.projectType}</span>
                        <span class="gantt-bar-label">${duration}d</span>
                        ${!isCompleted ? '<span class="gantt-bar-progress"></span>' : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    // Calculate today marker position
    const todayOffset = Math.ceil((today - minDate) / (1000 * 60 * 60 * 24));
    const todayPercent = (todayOffset / totalDays) * 100;
    
    return `
        <div class="projects-page">
            <div class="page-header">
                <h2>Gantt Chart</h2>
            </div>
            <div class="gantt-container">
            <div class="gantt-header">
                <div class="gantt-header-label">
                    <div style="font-weight: 700;">Project #</div>
                </div>
                <div class="gantt-header-timeline">
                    <div class="gantt-months">${monthHeaders}</div>
                </div>
            </div>
            <div class="gantt-body">
                ${weekMarkers}
                ${projectRows}
                <div class="gantt-today-marker" style="left: ${todayPercent}%;">
                    <div class="gantt-today-label">Today</div>
                </div>
            </div>
        </div>
        <div class="gantt-legend-container">
            <div class="gantt-legend">
                <div class="legend-item"><span class="legend-bar status-requested"></span> Requested</div>
                <div class="legend-item"><span class="legend-bar status-in-progress"></span> In Progress</div>
                <div class="legend-item"><span class="legend-bar status-checking"></span> Checking</div>
                <div class="legend-item"><span class="legend-bar status-with-client"></span> With Client</div>
                <div class="legend-item"><span class="legend-bar status-on-hold"></span> On Hold</div>
                <div class="legend-item"><span class="legend-bar status-changing"></span> Changing</div>
                <div class="legend-item"><span class="legend-bar status-signed-off"></span> Signed Off</div>
                <div class="legend-item"><span class="legend-bar status-sent-production"></span> Sent to Production</div>
                <div class="legend-item"><span class="legend-bar status-completed"></span> Completed</div>
                <div class="legend-item"><span class="legend-marker today"></span> Today</div>
            </div>
        </div>
        </div>
    `;
}

function generateMonthHeaders(startDate, endDate, totalDays) {
    const months = [];
    const current = new Date(startDate);
    
    while (current <= endDate) {
        const monthStart = new Date(current);
        const monthEnd = new Date(current.getFullYear(), current.getMonth() + 1, 0);
        const daysInMonth = monthEnd.getDate();
        const monthName = current.toLocaleString('default', { month: 'short' });
        const year = current.getFullYear();
        const widthPercent = (daysInMonth / totalDays) * 100;
        
        months.push(`
            <div class="gantt-month" style="width: ${widthPercent}%;">
                <div class="gantt-month-name">${monthName} ${year}</div>
            </div>
        `);
        current.setMonth(current.getMonth() + 1);
    }
    
    return months.join('');
}

function generateWeekMarkers(startDate, endDate, totalDays) {
    const markers = [];
    const current = new Date(startDate);
    
    while (current <= endDate) {
        const offset = Math.ceil((current - startDate) / (1000 * 60 * 60 * 24));
        const leftPercent = (offset / totalDays) * 100;
        markers.push(`<div class="gantt-week-marker" style="left: ${leftPercent}%;"></div>`);
        current.setDate(current.getDate() + 7);
    }
    
    return `<div class="gantt-week-markers">${markers.join('')}</div>`;
}

function attachGanttEventListeners() {
    const bars = document.querySelectorAll('.gantt-bar');
    bars.forEach(bar => {
        bar.addEventListener('click', () => {
            const projectId = parseInt(bar.dataset.projectId);
            currentProject = projectsData.find(p => p.id === projectId);
            if (currentProject) {
                localStorage.setItem('currentProjectId', projectId);
                document.getElementById('content-area').innerHTML = renderProjectDetailPage();
                attachProjectDetailEventListeners();
            }
        });
    });
}

function renderCalendarPage() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    return `
        <div class="projects-page">
            <div class="page-header">
                <h2>Project Calendar</h2>
                <div class="header-actions">
                    <button class="btn-secondary" onclick="previousMonth()">← Previous</button>
                    <button class="btn-secondary" onclick="nextMonth()">Next →</button>
                    <button class="btn-primary" onclick="goToToday()">Today</button>
                </div>
            </div>
            <div class="card">
                ${renderCalendar(currentMonth, currentYear)}
            </div>
        </div>
    `;
}

let calendarMonth = new Date().getMonth();
let calendarYear = new Date().getFullYear();

function previousMonth() {
    calendarMonth--;
    if (calendarMonth < 0) {
        calendarMonth = 11;
        calendarYear--;
    }
    document.getElementById('content-area').innerHTML = `
        <div class="projects-page">
            <div class="page-header">
                <h2>Project Calendar</h2>
                <div class="header-actions">
                    <button class="btn-secondary" onclick="previousMonth()">← Previous</button>
                    <button class="btn-secondary" onclick="nextMonth()">Next →</button>
                    <button class="btn-primary" onclick="goToToday()">Today</button>
                </div>
            </div>
            <div class="card">
                ${renderCalendar(calendarMonth, calendarYear)}
            </div>
        </div>
    `;
}

function nextMonth() {
    calendarMonth++;
    if (calendarMonth > 11) {
        calendarMonth = 0;
        calendarYear++;
    }
    document.getElementById('content-area').innerHTML = `
        <div class="projects-page">
            <div class="page-header">
                <h2>Project Calendar</h2>
                <div class="header-actions">
                    <button class="btn-secondary" onclick="previousMonth()">← Previous</button>
                    <button class="btn-secondary" onclick="nextMonth()">Next →</button>
                    <button class="btn-primary" onclick="goToToday()">Today</button>
                </div>
            </div>
            <div class="card">
                ${renderCalendar(calendarMonth, calendarYear)}
            </div>
        </div>
    `;
}

function goToToday() {
    calendarMonth = new Date().getMonth();
    calendarYear = new Date().getFullYear();
    document.getElementById('content-area').innerHTML = `
        <div class="projects-page">
            <div class="page-header">
                <h2>Project Calendar</h2>
                <div class="header-actions">
                    <button class="btn-secondary" onclick="previousMonth()">← Previous</button>
                    <button class="btn-secondary" onclick="nextMonth()">Next →</button>
                    <button class="btn-primary" onclick="goToToday()">Today</button>
                </div>
            </div>
            <div class="card">
                ${renderCalendar(calendarMonth, calendarYear)}
            </div>
        </div>
    `;
}

function renderCalendar(month, year) {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
    const todayDate = today.getDate();
    
    // Get projects for this month
    const projectsByDate = {};
    projectsData.forEach(project => {
        const [day, mon, yr] = project.dueDate.split('/');
        const projectMonth = parseInt(mon) - 1;
        const projectYear = parseInt(yr);
        const projectDay = parseInt(day);
        
        if (projectMonth === month && projectYear === year) {
            if (!projectsByDate[projectDay]) {
                projectsByDate[projectDay] = [];
            }
            projectsByDate[projectDay].push(project);
        }
    });
    
    let calendarHTML = `
        <div class="calendar-container">
            <div class="calendar-header">
                <h3>${monthNames[month]} ${year}</h3>
            </div>
            <div class="calendar-grid">
                ${dayNames.map(day => `<div class="calendar-day-name">${day}</div>`).join('')}
    `;
    
    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
        calendarHTML += `<div class="calendar-cell empty"></div>`;
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const isToday = isCurrentMonth && day === todayDate;
        const hasProjects = projectsByDate[day] && projectsByDate[day].length > 0;
        
        calendarHTML += `
            <div class="calendar-cell ${isToday ? 'today' : ''} ${hasProjects ? 'has-projects' : ''}">
                <div class="calendar-date">${day}</div>
                ${hasProjects ? `
                    <div class="calendar-projects">
                        ${projectsByDate[day].map(project => {
                            // Calculate if project is due today or overdue
                            const [dueDay, dueMonth, dueYear] = project.dueDate.split('/');
                            const dueDate = new Date(parseInt(dueYear), parseInt(dueMonth) - 1, parseInt(dueDay));
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            dueDate.setHours(0, 0, 0, 0);
                            
                            const isDueToday = dueDate.getTime() === today.getTime();
                            const isOverdue = dueDate < today && project.status !== 'Completed' && project.status !== 'Cancelled' && project.status !== 'Sent to Production';
                            
                            let urgencyIndicator = '';
                            let borderColor = '#10b981'; // Default green for normal projects
                            
                            if (isOverdue) {
                                urgencyIndicator = '<div style="position: absolute; top: 2px; right: 2px; width: 8px; height: 8px; background: #ef4444; border-radius: 50%; box-shadow: 0 0 0 2px #fff, 0 0 8px #ef4444; animation: pulse 2s infinite;" title="Overdue"></div>';
                                borderColor = '#ef4444'; // Red for overdue
                            } else if (isDueToday) {
                                urgencyIndicator = '<div style="position: absolute; top: 2px; right: 2px; width: 8px; height: 8px; background: #f59e0b; border-radius: 50%; box-shadow: 0 0 0 2px #fff, 0 0 6px #f59e0b;" title="Due Today"></div>';
                                borderColor = '#f59e0b'; // Orange/yellow for due today
                            }
                            
                            return `
                            <div class="calendar-project-card" onclick="showProjectDetail('${project.id}')" style="
                                cursor: pointer;
                                background: linear-gradient(145deg, #ffffff 0%, #fefefe 50%, #f9fafb 100%);
                                border: 1px solid #e5e7eb;
                                border-left: 4px solid ${borderColor};
                                box-shadow: 0 2px 4px -1px rgba(0,0,0,0.06);
                                transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                                margin-bottom: 6px;
                                padding: 8px;
                                border-radius: 8px;
                                position: relative;
                            " onmouseover="this.style.transform='translateX(3px)'; this.style.boxShadow='0 8px 16px -4px rgba(0,0,0,0.15)'" onmouseout="this.style.transform=''; this.style.boxShadow='0 2px 4px -1px rgba(0,0,0,0.06)'">
                                ${urgencyIndicator}
                                <div style="position: absolute; top: -15px; right: -15px; width: 60px; height: 60px; background: ${borderColor}; opacity: 0.04; border-radius: 50%;"></div>
                                <div class="calendar-project-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; position: relative; z-index: 1;">
                                    <span class="calendar-project-job" style="font-weight: 800; color: #111827; font-size: 11px; letter-spacing: -0.01em;">${project.jobNumber}</span>
                                    <span class="status-badge ${getStatusClass(project.status)}" style="font-size: 8px; padding: 3px 7px; border-radius: 10px; font-weight: 700; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                                        ${project.status}
                                    </span>
                                </div>
                                <div class="calendar-project-client" style="font-weight: 700; color: #1f2937; font-size: 11px; margin-bottom: 6px; line-height: 1.2; position: relative; z-index: 1;">
                                    ${project.client}
                                </div>
                                <div style="display: flex; gap: 4px; margin-bottom: 5px; position: relative; z-index: 1;">
                                    <div style="
                                        font-size: 9px; 
                                        color: #4b5563; 
                                        display: flex; 
                                        align-items: center; 
                                        gap: 3px;
                                        background: #f3f4f6;
                                        padding: 3px 6px;
                                        border-radius: 5px;
                                        flex: 1;
                                    ">
                                        <span style="font-size: 10px;">👤</span>
                                        <span style="font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${project.designer || 'N/A'}">${project.designer ? project.designer.split(' ').map(n => n[0]).join('').toUpperCase() : 'N/A'}</span>
                                    </div>
                                    <div style="
                                        font-size: 9px; 
                                        color: #78350f; 
                                        display: flex; 
                                        align-items: center; 
                                        gap: 3px;
                                        background: #fef3c7;
                                        padding: 3px 6px;
                                        border-radius: 5px;
                                        flex: 1;
                                    ">
                                        <span style="font-size: 10px;">💼</span>
                                        <span style="font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${project.salesPerson || 'N/A'}">${project.salesPerson ? project.salesPerson.split(' ').map(n => n[0]).join('').toUpperCase() : 'N/A'}</span>
                                    </div>
                                </div>
                                <div style="display: flex; align-items: center; justify-content: space-between; position: relative; z-index: 1;">
                                    <span class="tasktype-badge ${getProjectTypeClass(project.projectType)}" style="
                                        font-size: 8px; 
                                        padding: 3px 7px; 
                                        border-radius: 10px; 
                                        font-weight: 700;
                                        box-shadow: 0 1px 3px rgba(0,0,0,0.08);
                                    ">
                                        ${project.projectType}
                                    </span>
                                    ${project.priority === 'High' ? '<span style="font-size: 13px; filter: drop-shadow(0 1px 2px rgba(239, 68, 68, 0.4));" title="High Priority">🔥</span>' : ''}
                                </div>
                            </div>
                        `;
                        }).join('')}
                    </div>
                ` : ''}
            </div>
        `;
    }
    
    calendarHTML += `
            </div>
            <div class="calendar-legend">
                <div class="legend-item">
                    <span class="legend-dot" style="background: #3b82f6;"></span>
                    <span>Today</span>
                </div>
                <div class="legend-item">
                    <span class="legend-dot" style="background: #60a5fa;"></span>
                    <span>Has Projects</span>
                </div>
            </div>
        </div>
    `;
    
    return calendarHTML;
}

// Render Team Page
function renderTeamPage() {
    return `
        <div class="projects-page">
            <div class="page-header">
                <h2>👥 Team Members</h2>
                <button class="btn-primary" onclick="addTeamMember()">+ Add Member</button>
            </div>
            
            <div class="team-grid">
                ${teamMembers.map(member => `
                    <div class="team-card ${!member.active ? 'inactive' : ''}">
                        <div class="team-card-header">
                            <div class="team-avatar">${member.name.split(' ').map(n => n[0]).join('')}</div>
                            <div class="team-info">
                                <h3>${member.name}</h3>
                                <p class="team-role">${member.role}</p>
                                <p class="team-username">@${member.username}</p>
                            </div>
                            <span class="status-badge ${member.active ? 'status-in-progress' : 'status-on-hold'}">
                                ${member.active ? 'Active' : 'Inactive'}
                            </span>
                        </div>
                        
                        <div class="team-contact">
                            <p><strong>📧 Email:</strong> ${member.email}</p>
                        </div>
                        
                        <div class="team-kpis">
                            <h4>Performance KPIs</h4>
                            <div class="kpi-grid">
                                ${member.role === 'Sales' ? `
                                    <div class="kpi-item">
                                        <div class="kpi-value">${member.kpis.projectsCompleted}</div>
                                        <div class="kpi-label">Projects Sold</div>
                                    </div>
                                    <div class="kpi-item">
                                        <div class="kpi-value">${member.kpis.projectsInProgress}</div>
                                        <div class="kpi-label">In Progress</div>
                                    </div>
                                    <div class="kpi-item">
                                        <div class="kpi-value">$${(member.kpis.totalTimeLogged || 0).toLocaleString()}</div>
                                        <div class="kpi-label">Total Revenue</div>
                                    </div>
                                    <div class="kpi-item">
                                        <div class="kpi-value">$${(member.kpis.averageCompletionTime || 0).toLocaleString()}</div>
                                        <div class="kpi-label">Avg. Project Value</div>
                                    </div>
                                    <div class="kpi-item">
                                        <div class="kpi-value">${member.kpis.onTimeDelivery || 0}%</div>
                                        <div class="kpi-label">Conversion Rate</div>
                                    </div>
                                ` : member.role === 'Admin' ? `
                                    <div class="kpi-item" style="grid-column: 1 / -1; text-align: center; padding: 20px;">
                                        <div style="color: #6b7280; font-size: 14px;">
                                            👑 Administrator - Full System Access
                                        </div>
                                    </div>
                                ` : `
                                    <div class="kpi-item">
                                        <div class="kpi-value">${member.kpis.projectsCompleted}</div>
                                        <div class="kpi-label">Completed</div>
                                    </div>
                                    <div class="kpi-item">
                                        <div class="kpi-value">${member.kpis.projectsInProgress}</div>
                                        <div class="kpi-label">In Progress</div>
                                    </div>
                                    <div class="kpi-item">
                                        <div class="kpi-value">${formatTimeDisplay(member.kpis.totalTimeLogged)}</div>
                                        <div class="kpi-label">Time Logged</div>
                                    </div>
                                    <div class="kpi-item">
                                        <div class="kpi-value">${member.kpis.averageCompletionTime || 0}d</div>
                                        <div class="kpi-label">Avg. Completion</div>
                                    </div>
                                    <div class="kpi-item">
                                        <div class="kpi-value">${member.kpis.onTimeDelivery || 0}%</div>
                                        <div class="kpi-label">On-Time</div>
                                    </div>
                                `}
                            </div>
                        </div>
                        
                        <div class="team-actions">
                            <button class="btn-secondary team-edit-btn" data-member-id="${member.id}" style="flex: 1;">✏️ Edit</button>
                            <button class="btn-secondary team-toggle-btn" data-member-id="${member.id}" style="flex: 1; background: ${member.active ? '#e74c3c' : '#27ae60'};">
                                ${member.active ? '🚫 Deactivate' : '✅ Activate'}
                            </button>
                            ${member.role !== 'Admin' ? `
                                <button class="btn-secondary team-delete-btn" data-member-id="${member.id}" style="flex: 1; background: #dc2626; border-color: #b91c1c;">
                                    🗑️ Delete
                                </button>
                            ` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function attachTeamEventListeners() {
    
    // Attach edit button listeners
    const editButtons = document.querySelectorAll('.team-edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const memberId = e.currentTarget.getAttribute('data-member-id');
            editTeamMember(memberId);
        });
    });
    
    // Attach toggle status button listeners
    const toggleButtons = document.querySelectorAll('.team-toggle-btn');
    toggleButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const memberId = e.currentTarget.getAttribute('data-member-id');
            toggleMemberStatus(memberId);
        });
    });
    
    // Attach delete button listeners
    const deleteButtons = document.querySelectorAll('.team-delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const memberId = e.currentTarget.getAttribute('data-member-id');
            deleteTeamMember(memberId);
        });
    });
}

// Render Reports Page
function renderReportsPage() {
    const stats = calculateDetailedStats();
    
    return `
        <div class="reports-page">
            <div class="page-header">
                <h2>Reports Dashboard</h2>
                <div class="header-actions">
                    <button class="btn-secondary" onclick="exportReportPDF()">Export PDF</button>
                    <button class="btn-primary" onclick="exportReportCSV()">Export CSV</button>
                </div>
            </div>
            
            <!-- Date Range Filter -->
            <div class="date-range-filter">
                <div class="filter-label">
                    <span style="font-size: 18px; font-weight: 600; color: #1f2937;">📅 Date Range Filter</span>
                </div>
                <div class="filter-controls">
                    <div class="filter-input-group">
                        <label for="reportStartDate">Start Date</label>
                        <input type="date" id="reportStartDate" class="filter-date-input" onchange="refreshReportsWithDateRange()">
                    </div>
                    <div class="filter-input-group">
                        <label for="reportEndDate">End Date</label>
                        <input type="date" id="reportEndDate" class="filter-date-input" value="${new Date().toISOString().split('T')[0]}" onchange="refreshReportsWithDateRange()">
                    </div>
                    <button class="btn-secondary" onclick="resetReportsDateRange()" style="align-self: flex-end;">Reset</button>
                    <div class="filter-summary" id="filterSummary" style="align-self: center; color: #3b82f6; font-weight: 600; font-size: 14px;">Showing all time</div>
                </div>
            </div>
            
            <!-- 📋 Sales Brief Quality -->
            <div class="kpi-section">
                <h3>📋 Sales Brief Quality</h3>
                <div class="stats-grid" style="grid-template-columns: repeat(4, 1fr);">
                    <div class="stat-card clickable-kpi" onclick="showKPIBreakdown('briefQuality')" style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; cursor: pointer;">
                        <div class="stat-value">${stats.briefQualityScore}%</div>
                        <div class="stat-label" style="color: rgba(255,255,255,0.9);">Brief Quality Score</div>
                        <div style="margin-top: 12px; padding: 8px; background: rgba(255,255,255,0.2); border-radius: 8px; text-align: center; font-size: 12px;">
                            ${stats.briefQualityScore < 50 ? '⚠️ Needs improvement' : stats.briefQualityScore < 70 ? '📋 Fair' : '✅ Good'}
                        </div>
                        <div style="margin-top: 8px; font-size: 11px; opacity: 0.8;">Click for details →</div>
                    </div>
                    <div class="stat-card clickable-kpi" onclick="showKPIBreakdown('clientChanges')" style="cursor: pointer;">
                        <div class="stat-value" style="color: #f59e0b;">${stats.projectsWithClientChanges}</div>
                        <div class="stat-label">Projects with Client Changes</div>
                        <div style="margin-top: 12px; padding: 8px; background: #fef3c7; border-radius: 8px; text-align: center; font-size: 12px; color: #92400e;">
                            ${((stats.projectsWithClientChanges/stats.total)*100).toFixed(0)}% of total
                        </div>
                        <div style="margin-top: 8px; font-size: 11px; color: #6b7280;">Click for details →</div>
                    </div>
                    <div class="stat-card clickable-kpi" onclick="showKPIBreakdown('avgChanges')" style="cursor: pointer;">
                        <div class="stat-value" style="color: #f59e0b;">${stats.avgClientChangesPerProject}</div>
                        <div class="stat-label">Avg. Client Changes/Project</div>
                        ${renderSparkline([stats.avgClientChangesPerProject * 0.8, stats.avgClientChangesPerProject * 1.2, stats.avgClientChangesPerProject * 0.9, stats.avgClientChangesPerProject * 1.1, stats.avgClientChangesPerProject], '#f59e0b')}
                        <div style="margin-top: 8px; font-size: 11px; color: #6b7280;">Click for details →</div>
                    </div>
                    <div class="stat-card clickable-kpi" onclick="showKPIBreakdown('firstTimeRight')" style="cursor: pointer;">
                        <div class="stat-value" style="color: #f59e0b;">${stats.firstTimeRightRate}%</div>
                        <div class="stat-label">First-Time-Right Rate</div>
                        ${renderGaugeChart(stats.firstTimeRightRate, 100, '#f59e0b')}
                        <div style="margin-top: 8px; font-size: 11px; color: #6b7280;">Click for details →</div>
                    </div>
                </div>
                <div class="stats-grid" style="grid-template-columns: repeat(4, 1fr); margin-top: 12px;">
                    <div class="stat-card clickable-kpi" onclick="showKPIBreakdown('daysWithClient')" style="cursor: pointer;">
                        <div class="stat-value" style="color: #f59e0b;">${stats.avgDaysInWithClient}d</div>
                        <div class="stat-label">Avg. Days "With Client"</div>
                        <div style="margin-top: 12px; padding: 8px; background: #fef3c7; border-radius: 8px; text-align: center; font-size: 12px; color: #92400e;">
                            ${stats.avgDaysInWithClient > 7 ? '⚠️ High' : '✅ Normal'}
                        </div>
                        <div style="margin-top: 8px; font-size: 11px; color: #6b7280;">Click for details →</div>
                    </div>
                    <div class="stat-card clickable-kpi" onclick="showKPIBreakdown('rework')" style="cursor: pointer;">
                        <div class="stat-value" style="color: #f59e0b;">${stats.projectsRequiringRework}</div>
                        <div class="stat-label">Projects Requiring Rework</div>
                        <div style="margin-top: 12px; padding: 8px; background: #fef3c7; border-radius: 8px; text-align: center; font-size: 12px; color: #92400e;">
                            ${((stats.projectsRequiringRework/stats.total)*100).toFixed(0)}% rework rate
                        </div>
                        <div style="margin-top: 8px; font-size: 11px; color: #6b7280;">Click for details →</div>
                    </div>
                    <div class="stat-card clickable-kpi" onclick="showKPIBreakdown('revisions')" style="cursor: pointer;">
                        <div class="stat-value" style="color: #f59e0b;">${stats.avgRevisionsBeforeSignOff}</div>
                        <div class="stat-label">Avg. Revisions to Sign-Off</div>
                        ${renderMiniBarChart([stats.avgRevisionsBeforeSignOff, 3, 2, 1], ['Current', 'Q1', 'Q2', 'Target'])}
                        <div style="margin-top: 8px; font-size: 11px; color: #6b7280;">Click for details →</div>
                    </div>
                    <div class="stat-card clickable-kpi" onclick="showKPIBreakdown('revisionTime')" style="cursor: pointer;">
                        <div class="stat-value" style="color: #f59e0b; font-size: 20px;">${stats.rev1TimeHours}h / ${stats.subsequentRevTimeHours}h</div>
                        <div class="stat-label">Rev 1 vs Changes Time</div>
                        <div style="margin-top: 12px; padding: 8px; background: #fef3c7; border-radius: 8px; text-align: center; font-size: 12px; color: #92400e;">
                            ${stats.revisionTimeRatio > 0 ? `${(stats.revisionTimeRatio * 100).toFixed(0)}% extra time on changes` : 'No revision data'}
                        </div>
                        <div style="margin-top: 8px; font-size: 11px; color: #6b7280;">Click for details →</div>
                    </div>
                </div>
            </div>
            
            <!-- ⚡ Designer Productivity & Performance -->
            <div class="kpi-section">
                <h3>⚡ Designer Productivity & Performance</h3>
                <div class="stats-grid" style="grid-template-columns: repeat(5, 1fr);">
                    <div class="stat-card clickable-kpi" onclick="showKPIBreakdown('designers')" style="background: linear-gradient(135deg, #3b82f6 0%, #1e3a8a 100%); color: white; cursor: pointer;">
                        <div class="stat-value">${stats.activeDesigners}</div>
                        <div class="stat-label" style="color: rgba(255,255,255,0.9);">Active Designers</div>
                        <div style="margin-top: 12px; padding: 8px; background: rgba(255,255,255,0.2); border-radius: 8px; text-align: center; font-size: 12px;">
                            👥 ${stats.totalTeamMembers} total team members
                        </div>
                        <div style="margin-top: 8px; font-size: 11px; opacity: 0.8;">Click for details →</div>
                    </div>
                    <div class="stat-card clickable-kpi" onclick="showKPIBreakdown('workload')" style="cursor: pointer;">
                        <div class="stat-value" style="color: #3b82f6;">${stats.avgProjectsPerDesigner}</div>
                        <div class="stat-label">Avg. Projects per Designer</div>
                        ${renderSparkline([3.2, 3.5, 3.8, 4.1, stats.avgProjectsPerDesigner], '#3b82f6')}
                        <div style="margin-top: 8px; font-size: 11px; color: #6b7280;">Click for details →</div>
                    </div>
                    <div class="stat-card clickable-kpi" onclick="showKPIBreakdown('timeLogged')" style="cursor: pointer;">
                        <div class="stat-value" style="color: #3b82f6;">${stats.avgTimePerDesigner}h</div>
                        <div class="stat-label">Avg. Hours per Designer</div>
                        ${renderMiniBarChart([stats.avgTimePerDesigner, 45, 38, 42], ['Current', 'Last', 'Avg', 'Target'])}
                        <div style="margin-top: 8px; font-size: 11px; color: #6b7280;">Click for details →</div>
                    </div>
                    <div class="stat-card clickable-kpi" onclick="showKPIBreakdown('daysToFirstIssue')" style="cursor: pointer;">
                        <div class="stat-value" style="color: #3b82f6;">${stats.avgDaysToFirstIssue}d</div>
                        <div class="stat-label">Days to First Issue</div>
                        <div style="margin-top: 12px; padding: 8px; background: #dbeafe; border-radius: 8px; text-align: center; font-size: 12px; color: #1e40af;">
                            ${stats.avgDaysToFirstIssue < 7 ? '🚀 Fast turnaround' : stats.avgDaysToFirstIssue < 14 ? '✅ On track' : '⚠️ Slower than target'}
                        </div>
                        <div style="margin-top: 8px; font-size: 11px; color: #6b7280;">Click for details →</div>
                    </div>
                    <div class="stat-card clickable-kpi" onclick="showKPIBreakdown('daysToComplete')" style="cursor: pointer;">
                        <div class="stat-value" style="color: #3b82f6;">${stats.avgDaysToComplete}d</div>
                        <div class="stat-label">Avg. Days to Complete</div>
                        ${renderGaugeChart(Math.min((90 / stats.avgDaysToComplete * 100), 100), 100, '#3b82f6')}
                        <div style="margin-top: 8px; font-size: 11px; color: #6b7280;">Click for details →</div>
                    </div>
                </div>
                
                <!-- Designer Workload Breakdown -->
                <div style="margin-top: 24px; background: white; padding: 20px; border-radius: 12px;">
                    <h4 style="margin: 0 0 16px 0; color: #1e40af; font-size: 16px;">Designer Workload Distribution</h4>
                    ${renderDesignerChart(stats.designerWorkload)}
                </div>
            </div>
            
            <!-- 🏭 Manufacturing & Production Handoff -->
            <div class="kpi-section">
                <h3>🏭 Manufacturing & Production Handoff</h3>
                <div class="stats-grid" style="grid-template-columns: repeat(4, 1fr);">
                    <div class="stat-card clickable-kpi" onclick="showKPIBreakdown('signedOff')" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; cursor: pointer;">
                        <div class="stat-value">£${stats.signedOffValue.toLocaleString()}</div>
                        <div class="stat-label" style="color: rgba(255,255,255,0.9);">Signed Off - Total Value</div>
                        <div style="color: rgba(255,255,255,0.8); font-size: 14px; margin-top: 8px;">📦 ${stats.signedOffVolume.toFixed(1)} m³ timber</div>
                        <div style="margin-top: 8px; font-size: 11px; opacity: 0.8;">Click for details →</div>
                    </div>
                    <div class="stat-card clickable-kpi" onclick="showKPIBreakdown('sentToProduction')" style="background: linear-gradient(135deg, #059669 0%, #047857 100%); color: white; cursor: pointer;">
                        <div class="stat-value">£${stats.sentToProductionValue.toLocaleString()}</div>
                        <div class="stat-label" style="color: rgba(255,255,255,0.9);">Sent to Production - Total Value</div>
                        <div style="color: rgba(255,255,255,0.8); font-size: 14px; margin-top: 8px;">📦 ${stats.sentToProductionVolume.toFixed(1)} m³ timber</div>
                        <div style="margin-top: 8px; font-size: 11px; opacity: 0.8;">Click for details →</div>
                    </div>
                    <div class="stat-card clickable-kpi" onclick="showKPIBreakdown('signOffLeadTime')" style="cursor: pointer;">
                        <div class="stat-value" style="color: #10b981;">${stats.avgSignOffLeadTime}d</div>
                        <div class="stat-label">Sign-Off Lead Time</div>
                        ${renderSparkline([25, 28, 22, 26, stats.avgSignOffLeadTime], '#10b981')}
                        <div style="margin-top: 8px; font-size: 11px; color: #6b7280;">Click for details →</div>
                    </div>
                    <div class="stat-card clickable-kpi" onclick="showKPIBreakdown('bomAccuracy')" style="cursor: pointer;">
                        <div class="stat-value" style="color: #10b981;">${stats.bomAccuracyScore}%</div>
                        <div class="stat-label">Error-Free BOM Rate</div>
                        <div style="margin-top: 12px; padding: 8px; background: ${stats.bomAccuracyScore > 80 ? '#d1fae5' : '#fee2e2'}; border-radius: 8px; text-align: center; font-size: 12px; color: ${stats.bomAccuracyScore > 80 ? '#065f46' : '#991b1b'};">
                            ${stats.bomAccuracyScore > 80 ? '✅ High quality' : '⚠️ Quality issues detected'}
                        </div>
                        <div style="margin-top: 8px; font-size: 11px; color: #6b7280;">Click for details →</div>
                    </div>
                </div>
            </div>
            
            <!-- 📊 Business Overview -->
            <div class="kpi-section">
                <h3>📊 Business Overview & Summary</h3>
                <div class="stats-grid" style="grid-template-columns: repeat(4, 1fr);">
                    <div class="stat-card clickable-kpi" onclick="showKPIBreakdown('totalTime')" style="cursor: pointer;">
                        <div class="stat-value" style="color: #10b981;">${formatTimeDisplay(stats.totalTimeLogged)}</div>
                        <div class="stat-label">Total Time Logged</div>
                        <div style="margin-top: 12px; padding: 8px; background: #dbeafe; border-radius: 8px; text-align: center; font-size: 12px; color: #1e40af;">
                            ⏱ Across ${stats.projectsWithTime} projects
                        </div>
                        <div style="margin-top: 8px; font-size: 11px; color: #6b7280;">Click for details →</div>
                    </div>
                    <div class="stat-card clickable-kpi" onclick="showKPIBreakdown('avgTimeProject')" style="cursor: pointer;">
                        <div class="stat-value" style="color: #10b981;">${formatTimeDisplay(stats.avgTimePerProject)}</div>
                        <div class="stat-label">Avg. Time per Project</div>
                        ${renderSparkline([stats.avgTimePerProject * 0.8, stats.avgTimePerProject * 0.9, stats.avgTimePerProject * 1.1, stats.avgTimePerProject * 0.95, stats.avgTimePerProject], '#8b5cf6')}
                        <div style="margin-top: 8px; font-size: 11px; color: #6b7280;">Click for details →</div>
                    </div>
                    <div class="stat-card clickable-kpi" onclick="showKPIBreakdown('projectsTracked')" style="cursor: pointer;">
                        <div class="stat-value" style="color: #10b981;">${stats.projectsWithTime}</div>
                        <div class="stat-label">Projects with Time Logs</div>
                        <div class="mini-progress-bar" style="margin-top: 12px; background: #d1fae5; height: 6px; border-radius: 3px;">
                            <div style="width: ${(stats.projectsWithTime/stats.total*100).toFixed(0)}%; background: #10b981; height: 6px; border-radius: 3px;"></div>
                        </div>
                        <div style="font-size: 12px; color: #6b7280; margin-top: 4px;">${((stats.projectsWithTime/stats.total)*100).toFixed(0)}% tracked</div>
                        <div style="margin-top: 8px; font-size: 11px; color: #6b7280;">Click for details →</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value" style="color: ${stats.activeTimers > 0 ? '#10b981' : '#6b7280'};">${stats.activeTimers}</div>
                        <div class="stat-label">Active Timers</div>
                        <div style="margin-top: 12px; padding: 8px; background: ${stats.activeTimers > 0 ? '#d1fae5' : '#f3f4f6'}; border-radius: 8px; text-align: center; font-size: 12px; color: ${stats.activeTimers > 0 ? '#065f46' : '#6b7280'};">
                            ${stats.activeTimers > 0 ? '⏲ Currently running' : '⏸ None active'}
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value" style="color: #10b981;">${stats.avgDaysToFirstIssue}d</div>
                        <div class="stat-label">Avg. Days to First Issue</div>
                        ${renderMiniBarChart([stats.avgDaysToFirstIssue, 45, 50, 55], ['Current', 'Q4', 'Q3', 'Target'])}
                    </div>
                    <div class="stat-card clickable-kpi" onclick="showKPIBreakdown('issuedMonth')" style="cursor: pointer;">
                        <div class="stat-value" style="color: #10b981;">${stats.projectsIssuedThisMonth}</div>
                        <div class="stat-label">Issued This Month</div>
                        <div style="margin-top: 12px; padding: 8px; background: #fce7f3; border-radius: 8px; text-align: center; font-size: 12px; color: #9f1239;">
                            📤 Monthly output
                        </div>
                        <div style="margin-top: 8px; font-size: 11px; color: #6b7280;">Click for details →</div>
                    </div>
                    <div class="stat-card clickable-kpi" onclick="showKPIBreakdown('completedMonth')" style="cursor: pointer;">
                        <div class="stat-value" style="color: #10b981;">${stats.projectsCompletedThisMonth}</div>
                        <div class="stat-label">Completed This Month</div>
                        ${renderSparkline([stats.projectsCompletedThisMonth * 0.6, stats.projectsCompletedThisMonth * 0.8, stats.projectsCompletedThisMonth * 0.9, stats.projectsCompletedThisMonth * 0.95, stats.projectsCompletedThisMonth], '#10b981')}
                        <div style="margin-top: 8px; font-size: 11px; color: #6b7280;">Click for details →</div>
                    </div>
                    <div class="stat-card clickable-kpi" onclick="showKPIBreakdown('startedMonth')" style="cursor: pointer;">
                        <div class="stat-value" style="color: #10b981;">${stats.projectsStartedThisMonth}</div>
                        <div class="stat-label">Started This Month</div>
                        <div style="margin-top: 12px; padding: 8px; background: #cffafe; border-radius: 8px; text-align: center; font-size: 12px; color: #164e63;">
                            🌟 New projects
                        </div>
                        <div style="margin-top: 8px; font-size: 11px; color: #6b7280;">Click for details →</div>
                    </div>
                </div>
            </div>
            
            <!-- Order Financial KPIs with Charts -->
            <div class="kpi-section">
                <h3>💰 Order Financial Metrics</h3>
                <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px; margin-bottom: 24px;">
                    <div class="card" style="padding: 24px;">
                        <h4 style="margin: 0 0 16px 0; font-size: 16px; color: #1f2937;">Financial Breakdown</h4>
                        ${renderStackedBarChart([
                            {label: 'Oak Value', value: stats.orderOakValue, color: '#92400e'},
                            {label: 'S/W Value', value: stats.orderSWValue, color: '#d97706'},
                            {label: 'Sale Value', value: stats.orderFramePrice, color: '#10b981'}
                        ], 'Financial Values')}
                    </div>
                    <div class="stats-grid" style="grid-template-columns: 1fr; gap: 12px;">
                        <div class="stat-card" style="background: linear-gradient(135deg, #92400e 0%, #78350f 100%);">
                            <div class="stat-value" style="color: #10b981; font-size: 24px;">£${stats.orderOakValue.toLocaleString()}</div>
                            <div class="stat-label" style="color: rgba(255,255,255,0.9);">Total Oak Value</div>
                            <div style="color: rgba(255,255,255,0.8); font-size: 12px; margin-top: 8px;">${stats.orderOakM3.toFixed(1)} m³ total</div>
                        </div>
                        <div class="stat-card" style="background: linear-gradient(135deg, #d97706 0%, #b45309 100%);">
                            <div class="stat-value" style="color: #10b981; font-size: 24px;">£${stats.orderSWValue.toLocaleString()}</div>
                            <div class="stat-label" style="color: rgba(255,255,255,0.9);">Total S/W Value</div>
                            <div style="color: rgba(255,255,255,0.8); font-size: 12px; margin-top: 8px;">${stats.orderSWM3.toFixed(1)} m³ total</div>
                        </div>
                        <div class="stat-card" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%);">
                            <div class="stat-value" style="color: #10b981; font-size: 24px;">£${Math.round(stats.orderFramePrice).toLocaleString()}</div>
                            <div class="stat-label" style="color: rgba(255,255,255,0.9);">Total Sale Value</div>
                            <div style="color: rgba(255,255,255,0.8); font-size: 12px; margin-top: 8px;">Avg: £${Math.round(stats.orderAvgFramePrice).toLocaleString()}</div>
                        </div>
                    </div>
                </div>
                <div class="stats-grid" style="grid-template-columns: repeat(3, 1fr);">
                    <div class="stat-card">
                        <div class="stat-value" style="color: #10b981;">${stats.orderProjectsWithCosting}</div>
                        <div class="stat-label">Orders with Costing</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value" style="color: #10b981;">£${Math.round(stats.orderCompletedValue).toLocaleString()}</div>
                        <div class="stat-label">Completed Orders Value</div>
                        ${renderSparkline([stats.orderCompletedValue * 0.7, stats.orderCompletedValue * 0.85, stats.orderCompletedValue * 0.9, stats.orderCompletedValue * 0.95, stats.orderCompletedValue], '#10b981')}
                    </div>
                    <div class="stat-card">
                        <div class="stat-value" style="color: #10b981;">£${Math.round(stats.orderInProgressValue).toLocaleString()}</div>
                        <div class="stat-label">In Progress Orders Value</div>
                        ${renderSparkline([stats.orderInProgressValue * 0.7, stats.orderInProgressValue * 0.85, stats.orderInProgressValue * 0.9, stats.orderInProgressValue * 0.95, stats.orderInProgressValue], '#3b82f6')}
                    </div>
                </div>
            </div>
            
            <!-- Visual Financial KPIs with Charts -->
            <div class="kpi-section">
                <h3>🎨 Visual Financial Metrics</h3>
                <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px; margin-bottom: 24px;">
                    <div class="card" style="padding: 24px;">
                        <h4 style="margin: 0 0 16px 0; font-size: 16px; color: #1f2937;">Financial Breakdown</h4>
                        ${renderStackedBarChart([
                            {label: 'Oak Value', value: stats.visualOakValue, color: '#92400e'},
                            {label: 'S/W Value', value: stats.visualSWValue, color: '#d97706'},
                            {label: 'Sale Value', value: stats.visualFramePrice, color: '#10b981'}
                        ], 'Financial Values')}
                    </div>
                    <div class="stats-grid" style="grid-template-columns: 1fr; gap: 12px;">
                        <div class="stat-card" style="background: linear-gradient(135deg, #92400e 0%, #78350f 100%);">
                            <div class="stat-value" style="color: #10b981; font-size: 24px;">£${stats.visualOakValue.toLocaleString()}</div>
                            <div class="stat-label" style="color: rgba(255,255,255,0.9);">Total Oak Value</div>
                            <div style="color: rgba(255,255,255,0.8); font-size: 12px; margin-top: 8px;">${stats.visualOakM3.toFixed(1)} m³ total</div>
                        </div>
                        <div class="stat-card" style="background: linear-gradient(135deg, #d97706 0%, #b45309 100%);">
                            <div class="stat-value" style="color: #10b981; font-size: 24px;">£${stats.visualSWValue.toLocaleString()}</div>
                            <div class="stat-label" style="color: rgba(255,255,255,0.9);">Total S/W Value</div>
                            <div style="color: rgba(255,255,255,0.8); font-size: 12px; margin-top: 8px;">${stats.visualSWM3.toFixed(1)} m³ total</div>
                        </div>
                        <div class="stat-card" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%);">
                            <div class="stat-value" style="color: #10b981; font-size: 24px;">£${Math.round(stats.visualFramePrice).toLocaleString()}</div>
                            <div class="stat-label" style="color: rgba(255,255,255,0.9);">Total Sale Value</div>
                            <div style="color: rgba(255,255,255,0.8); font-size: 12px; margin-top: 8px;">Avg: £${Math.round(stats.visualAvgFramePrice).toLocaleString()}</div>
                        </div>
                    </div>
                </div>
                <div class="stats-grid" style="grid-template-columns: repeat(3, 1fr);">
                    <div class="stat-card">
                        <div class="stat-value" style="color: #10b981;">${stats.visualProjectsWithCosting}</div>
                        <div class="stat-label">Visuals with Costing</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value" style="color: #10b981;">£${Math.round(stats.visualCompletedValue).toLocaleString()}</div>
                        <div class="stat-label">Completed Visuals Value</div>
                        ${renderSparkline([stats.visualCompletedValue * 0.7, stats.visualCompletedValue * 0.85, stats.visualCompletedValue * 0.9, stats.visualCompletedValue * 0.95, stats.visualCompletedValue], '#10b981')}
                    </div>
                    <div class="stat-card">
                        <div class="stat-value" style="color: #10b981;">£${Math.round(stats.visualInProgressValue).toLocaleString()}</div>
                        <div class="stat-label">In Progress Visuals Value</div>
                        ${renderSparkline([stats.visualInProgressValue * 0.7, stats.visualInProgressValue * 0.85, stats.visualInProgressValue * 0.9, stats.visualInProgressValue * 0.95, stats.visualInProgressValue], '#3b82f6')}
                    </div>
                </div>
            </div>
            
            <!-- Client & Sales KPIs with Charts -->
            <div class="kpi-section">
                <h3>🤝 Client & Sales Metrics</h3>
                <div class="stats-grid" style="grid-template-columns: repeat(4, 1fr);">
                    <div class="stat-card">
                        <div class="stat-value" style="color: #10b981;">${stats.uniqueClients}</div>
                        <div class="stat-label">Unique Clients</div>
                        <div style="margin-top: 12px; padding: 8px; background: #dbeafe; border-radius: 8px; text-align: center; font-size: 12px; color: #1e40af;">
                            🏛 ${stats.newClientsThisMonth} new this month
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value" style="color: #10b981;">${stats.repeatClients}</div>
                        <div class="stat-label">Repeat Clients</div>
                        <div class="mini-progress-bar" style="margin-top: 12px; background: #d1fae5; height: 6px; border-radius: 3px;">
                            <div style="width: ${(stats.repeatClients/stats.uniqueClients*100).toFixed(0)}%; background: #10b981; height: 6px; border-radius: 3px;"></div>
                        </div>
                        <div style="font-size: 12px; color: #6b7280; margin-top: 4px;">${((stats.repeatClients/stats.uniqueClients)*100).toFixed(0)}% retention</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value" style="color: #10b981;">${stats.avgProjectsPerClient}</div>
                        <div class="stat-label">Avg. Projects per Client</div>
                        ${renderSparkline([stats.avgProjectsPerClient * 0.7, stats.avgProjectsPerClient * 0.85, stats.avgProjectsPerClient * 0.95, stats.avgProjectsPerClient * 1.05, stats.avgProjectsPerClient], '#8b5cf6')}
                    </div>
                    <div class="stat-card">
                        <div class="stat-value" style="color: #10b981;">${stats.topSalesPersonCount}</div>
                        <div class="stat-label">Top Sales: ${stats.topSalesPerson}</div>
                        <div style="margin-top: 12px; padding: 8px; background: #fef3c7; border-radius: 8px; text-align: center; font-size: 12px; color: #92400e;">
                            🏆 Leading performer
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value" style="color: #10b981;">${stats.projectsWithClientReview}</div>
                        <div class="stat-label">Awaiting Client Review</div>
                        <div style="margin-top: 12px; padding: 8px; background: ${stats.projectsWithClientReview > 5 ? '#fee2e2' : '#fef3c7'}; border-radius: 8px; text-align: center; font-size: 12px; color: ${stats.projectsWithClientReview > 5 ? '#991b1b' : '#92400e'};">
                            ${stats.projectsWithClientReview > 5 ? '⏳ High volume' : '✅ Manageable'}
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value" style="color: #10b981;">${stats.newClientsThisMonth}</div>
                        <div class="stat-label">New Clients This Month</div>
                        ${renderSparkline([stats.newClientsThisMonth * 0.5, stats.newClientsThisMonth * 0.7, stats.newClientsThisMonth * 0.9, stats.newClientsThisMonth * 0.95, stats.newClientsThisMonth], '#ec4899')}
                    </div>
                    <div class="stat-card">
                        <div class="stat-value" style="color: #10b981;">${stats.clientSatisfactionProjects}</div>
                        <div class="stat-label">Projects Signed Off</div>
                        <div class="mini-progress-bar" style="margin-top: 12px; background: #d1fae5; height: 6px; border-radius: 3px;">
                            <div style="width: ${(stats.clientSatisfactionProjects/stats.total*100).toFixed(0)}%; background: #10b981; height: 6px; border-radius: 3px;"></div>
                        </div>
                        <div style="font-size: 12px; color: #6b7280; margin-top: 4px;">${((stats.clientSatisfactionProjects/stats.total)*100).toFixed(0)}% satisfaction</div>
                    </div>
                </div>
            </div>
            
            <!-- Team & Workload KPIs with Visuals -->
            <div class="kpi-section">
                <h3>👥 Team & Workload Metrics</h3>
                <div class="stats-grid" style="grid-template-columns: repeat(4, 1fr);">
                    <div class="stat-card">
                        <div class="stat-value" style="color: #10b981;">${stats.activeDesigners}</div>
                        <div class="stat-label">Active Designers</div>
                        <div style="margin-top: 12px; display: flex; gap: 4px; justify-content: center;">
                            ${Array(stats.totalTeamMembers).fill(0).map((_, i) => 
                                `<div style="width: 12px; height: 12px; border-radius: 50%; background: ${i < stats.activeDesigners ? '#3b82f6' : '#e5e7eb'};"></div>`
                            ).join('')}
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value" style="color: #10b981;">${stats.avgProjectsPerDesigner}</div>
                        <div class="stat-label">Avg. Projects per Designer</div>
                        ${renderMiniBarChart([stats.avgProjectsPerDesigner, stats.topDesignerCount, stats.avgProjectsPerDesigner * 0.7], ['Avg', 'Max', 'Min'])}
                    </div>
                    <div class="stat-card">
                        <div class="stat-value" style="color: #10b981;">${stats.topDesignerCount}</div>
                        <div class="stat-label">Most Busy: ${stats.topDesigner}</div>
                        <div style="margin-top: 12px; padding: 8px; background: #fef3c7; border-radius: 8px; text-align: center; font-size: 12px; color: #92400e;">
                            🏆 Top performer
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value" style="color: #10b981;">${stats.designerUtilization}%</div>
                        <div class="stat-label">Team Utilization</div>
                        ${renderGaugeChart(stats.designerUtilization, 100, '#10b981')}
                    </div>
                    <div class="stat-card">
                        <div class="stat-value" style="color: #10b981;">${formatTimeDisplay(stats.avgTimePerDesigner)}</div>
                        <div class="stat-label">Avg. Time per Designer</div>
                        <div style="margin-top: 12px; padding: 8px; background: #cffafe; border-radius: 8px; text-align: center; font-size: 12px; color: #164e63;">
                            ⏱ ${formatTimeDisplay(stats.totalTimeLogged)} total
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value" style="color: #10b981;">${stats.designersWithActiveProjects}</div>
                        <div class="stat-label">Designers with Active Work</div>
                        <div class="mini-progress-bar" style="margin-top: 12px; background: #fce7f3; height: 6px; border-radius: 3px;">
                            <div style="width: ${(stats.designersWithActiveProjects/stats.totalTeamMembers*100).toFixed(0)}%; background: #ec4899; height: 6px; border-radius: 3px;"></div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value" style="color: #10b981;">${stats.totalTeamMembers}</div>
                        <div class="stat-label">Total Team Members</div>
                        <div style="margin-top: 12px; padding: 8px; background: #f3f4f6; border-radius: 8px; text-align: center; font-size: 12px; color: #374151;">
                            👥 Full team roster
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value" style="color: #10b981;">${stats.avgCompletionRatePerDesigner}%</div>
                        <div class="stat-label">Team Completion Rate</div>
                        ${renderGaugeChart(stats.avgCompletionRatePerDesigner, 100, '#10b981')}
                    </div>
                </div>
            </div>
            
            <!-- Project Type & Category KPIs with Visuals -->
            <div class="kpi-section">
                <h3>📦 Project Type & Category</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px;">
                    <div class="card" style="padding: 24px;">
                        <h4 style="margin: 0 0 16px 0; font-size: 16px; color: #1f2937;">Project Types</h4>
                        ${renderDynamicPieChart(stats.projectTypes, 'projectType')}
                    </div>
                    <div class="card" style="padding: 24px;">
                        <h4 style="margin: 0 0 16px 0; font-size: 16px; color: #1f2937;">Categories</h4>
                        ${renderDynamicPieChart(stats.orderTypes, 'orderType')}
                    </div>
                </div>
                <div class="stats-grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
                    ${Object.entries(stats.projectTypes).map(([type, count]) => `
                        <div class="stat-card">
                            <div class="stat-value" style="color: #10b981;">${count}</div>
                            <div class="stat-label">${type} Projects</div>
                            <div class="mini-progress-bar" style="margin-top: 12px; background: #dbeafe; height: 6px; border-radius: 3px;">
                                <div style="width: ${(count/stats.total*100).toFixed(0)}%; background: #3b82f6; height: 6px; border-radius: 3px;"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <h4 style="margin: 24px 0 16px 0; font-size: 16px; color: #1f2937;">Categories</h4>
                <div class="stats-grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
                    ${Object.entries(stats.orderTypes).filter(([type]) => type && type !== 'undefined').map(([type, count]) => `
                        <div class="stat-card">
                            <div class="stat-value" style="color: #10b981;">${count}</div>
                            <div class="stat-label">${type}</div>
                            <div style="margin-top: 12px; padding: 8px; background: #fef3c7; border-radius: 8px; text-align: center; font-size: 12px; color: #92400e;">
                                ${((count/stats.total)*100).toFixed(0)}% of total
                            </div>
                        </div>
                    `).join('')}
                </div>
                <h4 style="margin: 24px 0 16px 0; font-size: 16px; color: #1f2937;">Priority Distribution</h4>
                <div class="stats-grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
                    <div class="stat-card">
                        <div class="stat-value" style="color: #10b981;">${stats.highPriorityProjects}</div>
                        <div class="stat-label">High Priority</div>
                        <div style="margin-top: 12px; padding: 8px; background: #fee2e2; border-radius: 8px; text-align: center; font-size: 12px; color: #991b1b;">
                            🔥 Urgent attention
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value" style="color: #10b981;">${stats.mediumPriorityProjects}</div>
                        <div class="stat-label">Medium Priority</div>
                        <div style="margin-top: 12px; padding: 8px; background: #fef3c7; border-radius: 8px; text-align: center; font-size: 12px; color: #92400e;">
                            ⏰ Standard workflow
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Charts and Analytics Grid -->
            <div class="reports-grid">
                <!-- Status Breakdown -->
                <div class="card report-card">
                    <h3>📈 Status Distribution</h3>
                    <div class="chart-container">
                        ${renderStatusChart(stats.statusBreakdown)}
                    </div>
                </div>
                
                <!-- Project Types -->
                <div class="card report-card">
                    <h3>📊 Project Types</h3>
                    <div class="chart-container">
                        ${renderProjectTypeChart(stats.projectTypes)}
                    </div>
                </div>
                
                <!-- Designer Workload -->
                <div class="card report-card">
                    <h3>👥 Designer Workload</h3>
                    <div class="chart-container">
                        ${renderDesignerChart(stats.designerWorkload)}
                    </div>
                </div>
                
                <!-- Sales Performance -->
                <div class="card report-card">
                    <h3>💼 Sales Performance</h3>
                    <div class="chart-container">
                        ${renderSalesChart(stats.salesPerformance)}
                    </div>
                </div>
                
                <!-- Time Tracking Summary -->
                <div class="card report-card" style="grid-column: span 2;">
                    <h3>⏱ Time Tracking Summary</h3>
                    <div class="time-stats-grid">
                        <div class="time-stat">
                            <div class="time-stat-value">${formatTimeDisplay(stats.totalTimeLogged)}</div>
                            <div class="time-stat-label">Total Time Logged</div>
                        </div>
                        <div class="time-stat">
                            <div class="time-stat-value">${formatTimeDisplay(stats.avgTimePerProject)}</div>
                            <div class="time-stat-label">Avg Time per Project</div>
                        </div>
                        <div class="time-stat">
                            <div class="time-stat-value">${stats.projectsWithTime}</div>
                            <div class="time-stat-label">Projects with Time Logs</div>
                        </div>
                        <div class="time-stat">
                            <div class="time-stat-value">${stats.activeTimers}</div>
                            <div class="time-stat-label">Active Timers</div>
                        </div>
                    </div>
                </div>
                
                <!-- Order Types -->
                <div class="card report-card">
                    <h3>📦 Order Type Breakdown</h3>
                    <div class="chart-container">
                        ${renderOrderTypeChart(stats.orderTypes)}
                    </div>
                </div>
                
                <!-- Priority Distribution -->
                <div class="card report-card">
                    <h3>🎯 Priority Distribution</h3>
                    <div class="chart-container">
                        ${renderPriorityChart(stats.priorityDistribution)}
                    </div>
                </div>
                
                <!-- Upcoming Deadlines -->
                <div class="card report-card" style="grid-column: span 2;">
                    <h3>� Upcoming Deadlines (Next 14 Days)</h3>
                    <div class="deadline-list">
                        ${renderUpcomingDeadlines(stats.upcomingDeadlines)}
                    </div>
                </div>
                
                <!-- Recent Activity -->
                <div class="card report-card" style="grid-column: span 2;">
                    <h3>🔔 Recent Activity</h3>
                    <div class="activity-list">
                        ${renderRecentActivity(stats.recentActivity)}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateDetailedStats(startDate = null, endDate = null) {
    const now = new Date();
    const twoWeeksFromNow = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    // Filter projects by date range if provided
    let filteredProjects = projectsData;
    if (startDate || endDate) {
        filteredProjects = projectsData.filter(p => {
            const projectDate = p.startDate ? new Date(p.startDate) : new Date(p.dateCreated || now);
            if (startDate && endDate) {
                return projectDate >= new Date(startDate) && projectDate <= new Date(endDate);
            } else if (startDate) {
                return projectDate >= new Date(startDate);
            } else if (endDate) {
                return projectDate <= new Date(endDate);
            }
            return true;
        });
    }
    
    // Basic counts (use filtered projects)
    const total = filteredProjects.length;
    const completed = filteredProjects.filter(p => p.status === 'Completed').length;
    const inProgress = filteredProjects.filter(p => p.status === 'In Progress').length;
    const onHold = filteredProjects.filter(p => p.status === 'On Hold').length;
    const withClient = filteredProjects.filter(p => p.status === 'With Client').length;
    const checking = filteredProjects.filter(p => p.status === 'Checking').length;
    const signedOff = filteredProjects.filter(p => p.status === 'Signed Off').length;
    const changing = filteredProjects.filter(p => p.status === 'Changing').length;
    const projectsInProduction = filteredProjects.filter(p => p.status === 'Sent to Production').length;
    
    // Performance metrics
    const completionRate = total > 0 ? ((completed / total) * 100).toFixed(1) : 0;
    const completedProjectsList = filteredProjects.filter(p => p.status === 'Completed' && p.orderDate && p.issuedToProduction);
    const avgDaysToComplete = completedProjectsList.length > 0 ? 
        Math.round(completedProjectsList.reduce((sum, p) => {
            const start = parseDate(p.orderDate);
            const end = parseDate(p.issuedToProduction);
            return sum + Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        }, 0) / completedProjectsList.length) : 0;
    
    const projectsWithDeadlines = filteredProjects.filter(p => p.dueDate && p.status === 'Completed');
    const onTimeProjects = projectsWithDeadlines.filter(p => {
        const due = parseDate(p.dueDate);
        const issued = parseDate(p.issuedToProduction);
        return issued <= due;
    }).length;
    const onTimeDeliveryRate = projectsWithDeadlines.length > 0 ? 
        ((onTimeProjects / projectsWithDeadlines.length) * 100).toFixed(1) : 0;
    
    const overdueProjects = filteredProjects.filter(p => {
        if (p.status === 'Completed' || p.status === 'Cancelled' || !p.dueDate) return false;
        const due = parseDate(p.dueDate);
        return due < now;
    }).length;
    
    const avgRevisions = total > 0 ? 
        (filteredProjects.reduce((sum, p) => sum + (p.totalChanges || 0), 0) / total).toFixed(1) : 0;
    
    const projectsNeedingCalcs = filteredProjects.filter(p => p.structuralCalcs === 'Yes' && 
        (p.calcsStatus === 'Requested' || p.calcsStatus === 'Pending')).length;
    
    const projectsWithSignOff = filteredProjects.filter(p => p.signOffLeadTime && p.signOffLeadTime > 0);
    const avgSignOffLeadTime = projectsWithSignOff.length > 0 ?
        Math.round(projectsWithSignOff.reduce((sum, p) => sum + p.signOffLeadTime, 0) / projectsWithSignOff.length) : 0;
    
    // Time & Productivity metrics
    const totalTimeLogged = filteredProjects.reduce((sum, p) => sum + (p.totalTimeMinutes || 0), 0);
    const projectsWithTime = filteredProjects.filter(p => (p.totalTimeMinutes || 0) > 0).length;
    const avgTimePerProject = projectsWithTime > 0 ? Math.floor(totalTimeLogged / projectsWithTime) : 0;
    const activeTimers = filteredProjects.filter(p => p.timerRunning).length;
    
    const projectsWithFirstIssue = filteredProjects.filter(p => p.daysToIssue && p.daysToIssue > 0);
    const avgDaysToFirstIssue = projectsWithFirstIssue.length > 0 ?
        Math.round(projectsWithFirstIssue.reduce((sum, p) => sum + p.daysToIssue, 0) / projectsWithFirstIssue.length) : 0;
    
    const projectsIssuedThisMonth = filteredProjects.filter(p => {
        if (!p.firstIssueDate) return false;
        const issued = parseDate(p.firstIssueDate);
        return issued >= thisMonth;
    }).length;
    
    const projectsCompletedThisMonth = filteredProjects.filter(p => {
        if (!p.issuedToProduction || p.status !== 'Completed') return false;
        const completed = parseDate(p.issuedToProduction);
        return completed >= thisMonth;
    }).length;
    
    const projectsStartedThisMonth = filteredProjects.filter(p => {
        if (!p.orderDate) return false;
        const started = parseDate(p.orderDate);
        return started >= thisMonth;
    }).length;
    
    // Order Financial metrics
    const orderOnlyProjects = filteredProjects.filter(p => p.projectType === 'Order');
    const orderProjectsWithCosting = orderOnlyProjects.filter(p => p.framePrice || p.oakM3 || p.swM3).length;
    const orderFramePrice = orderOnlyProjects.reduce((sum, p) => sum + (parseFloat(p.framePrice) || 0), 0);
    const orderAvgFramePrice = orderProjectsWithCosting > 0 ? Math.round(orderFramePrice / orderProjectsWithCosting) : 0;
    const orderOakM3 = orderOnlyProjects.reduce((sum, p) => sum + (parseFloat(p.oakM3) || 0), 0);
    const orderSWM3 = orderOnlyProjects.reduce((sum, p) => sum + (parseFloat(p.swM3) || 0), 0);
    const orderOakValue = Math.round(orderOakM3 * 1500); // Assuming £1500 per m³
    const orderSWValue = Math.round(orderSWM3 * 800); // Assuming £800 per m³
    
    const orderCompletedValue = orderOnlyProjects.filter(p => p.status === 'Completed')
        .reduce((sum, p) => sum + (parseFloat(p.framePrice) || 0), 0);
    const orderInProgressValue = orderOnlyProjects.filter(p => p.status === 'In Progress')
        .reduce((sum, p) => sum + (parseFloat(p.framePrice) || 0), 0);
    
    // Visual Financial metrics
    const visualOnlyProjects = filteredProjects.filter(p => p.projectType === 'Visual');
    const visualProjectsWithCosting = visualOnlyProjects.filter(p => p.framePrice || p.oakM3 || p.swM3).length;
    const visualFramePrice = visualOnlyProjects.reduce((sum, p) => sum + (parseFloat(p.framePrice) || 0), 0);
    const visualAvgFramePrice = visualProjectsWithCosting > 0 ? Math.round(visualFramePrice / visualProjectsWithCosting) : 0;
    const visualOakM3 = visualOnlyProjects.reduce((sum, p) => sum + (parseFloat(p.oakM3) || 0), 0);
    const visualSWM3 = visualOnlyProjects.reduce((sum, p) => sum + (parseFloat(p.swM3) || 0), 0);
    const visualOakValue = Math.round(visualOakM3 * 1500); // Assuming £1500 per m³
    const visualSWValue = Math.round(visualSWM3 * 800); // Assuming £800 per m³
    
    const visualCompletedValue = visualOnlyProjects.filter(p => p.status === 'Completed')
        .reduce((sum, p) => sum + (parseFloat(p.framePrice) || 0), 0);
    const visualInProgressValue = visualOnlyProjects.filter(p => p.status === 'In Progress')
        .reduce((sum, p) => sum + (parseFloat(p.framePrice) || 0), 0);
    
    // Client & Sales metrics
    const clientCounts = {};
    filteredProjects.forEach(p => {
        clientCounts[p.client] = (clientCounts[p.client] || 0) + 1;
    });
    const uniqueClients = Object.keys(clientCounts).length;
    const repeatClients = Object.values(clientCounts).filter(count => count > 1).length;
    const avgProjectsPerClient = uniqueClients > 0 ? (total / uniqueClients).toFixed(1) : 0;
    
    const salesCounts = {};
    filteredProjects.forEach(p => {
        salesCounts[p.salesPerson] = (salesCounts[p.salesPerson] || 0) + 1;
    });
    const topSalesPerson = Object.entries(salesCounts).sort((a, b) => b[1] - a[1])[0];
    const topSalesPersonCount = topSalesPerson ? topSalesPerson[1] : 0;
    const topSalesPersonName = topSalesPerson ? topSalesPerson[0] : 'N/A';
    
    const projectsWithClientReview = filteredProjects.filter(p => p.status === 'With Client').length;
    
    // Calculate average client response time using new tracking fields
    const projectsWithResponseTime = filteredProjects.filter(p => 
        p.clientReviewSentDate && p.clientReviewReceivedDate
    );
    const avgClientResponseTime = projectsWithResponseTime.length > 0 ?
        Math.round(projectsWithResponseTime.reduce((sum, p) => {
            const sent = parseDate(p.clientReviewSentDate);
            const received = parseDate(p.clientReviewReceivedDate);
            const days = Math.floor((received - sent) / (1000 * 60 * 60 * 24));
            return sum + days;
        }, 0) / projectsWithResponseTime.length) : 0;
    
    const newClientsThisMonth = 0; // Placeholder - would need historical data
    const clientSatisfactionProjects = filteredProjects.filter(p => p.signedOff === 'Yes').length;
    
    // Team & Workload metrics
    const activeDesigners = new Set(filteredProjects.filter(p => p.status !== 'Completed' && p.status !== 'Cancelled')
        .map(p => p.designer)).size;
    const totalActiveProjects = filteredProjects.filter(p => p.status !== 'Completed' && p.status !== 'Cancelled').length;
    const avgProjectsPerDesigner = activeDesigners > 0 ? (totalActiveProjects / activeDesigners).toFixed(1) : 0;
    
    const designerCounts = {};
    filteredProjects.filter(p => p.status !== 'Completed' && p.status !== 'Cancelled')
        .forEach(p => {
            designerCounts[p.designer] = (designerCounts[p.designer] || 0) + 1;
        });
    const topDesigner = Object.entries(designerCounts).sort((a, b) => b[1] - a[1])[0];
    const topDesignerCount = topDesigner ? topDesigner[1] : 0;
    const topDesignerName = topDesigner ? topDesigner[0] : 'N/A';
    
    // Calculate designer utilization using capacity data if available
    let designerUtilization = 0;
    if (designerCapacities.length > 0) {
        // Calculate weighted utilization based on actual capacity
        const totalCapacity = designerCapacities.reduce((sum, d) => sum + (d.capacity_hours_per_week || 40), 0);
        const totalWorkload = designerCapacities.reduce((sum, d) => sum + (d.current_workload_hours || 0), 0);
        designerUtilization = totalCapacity > 0 ? ((totalWorkload / totalCapacity) * 100).toFixed(0) : 0;
    } else {
        // Fallback to simple calculation - only count designer roles
        const designerRoleCount = teamMembers.filter(m => m.active && ['Designer', 'Senior Designer', 'Lead Designer'].includes(m.role)).length;
        designerUtilization = designerRoleCount > 0 ? 
            ((activeDesigners / designerRoleCount) * 100).toFixed(0) : 0;
    }
    
    const designerTime = {};
    filteredProjects.forEach(p => {
        designerTime[p.designer] = (designerTime[p.designer] || 0) + (p.totalTimeMinutes || 0);
    });
    const avgTimePerDesigner = activeDesigners > 0 ? 
        Math.floor(Object.values(designerTime).reduce((a, b) => a + b, 0) / activeDesigners) : 0;
    
    const designersWithActiveProjects = new Set(filteredProjects.filter(p => p.status !== 'Completed' && p.status !== 'Cancelled')
        .map(p => p.designer)).size;
    
    const totalTeamMembers = teamMembers.length;
    const avgCompletionRatePerDesigner = activeDesigners > 0 ? 
        ((completed / activeDesigners) / (total / activeDesigners) * 100).toFixed(1) : 0;
    
    // Project Type & Category metrics
    const planningProjects = filteredProjects.filter(p => p.projectType === 'Planning').length;
    const visualProjects = filteredProjects.filter(p => p.projectType === 'Visual').length;
    const orderProjects = filteredProjects.filter(p => p.projectType === 'Order').length;
    const newBuildProjects = filteredProjects.filter(p => p.orderType === 'New Build').length;
    const renovationProjects = filteredProjects.filter(p => p.orderType === 'Renovation').length;
    const commercialProjects = filteredProjects.filter(p => p.orderType === 'Commercial').length;
    const highPriorityProjects = filteredProjects.filter(p => p.priority === 'High').length;
    const mediumPriorityProjects = filteredProjects.filter(p => p.priority === 'Medium').length;
    
    // Status breakdown
    const statusBreakdown = {};
    projectsData.forEach(p => {
        statusBreakdown[p.status] = (statusBreakdown[p.status] || 0) + 1;
    });
    
    // Project types
    const projectTypes = {};
    projectsData.forEach(p => {
        projectTypes[p.projectType] = (projectTypes[p.projectType] || 0) + 1;
    });
    
    // Order types
    const orderTypes = {};
    projectsData.forEach(p => {
        orderTypes[p.orderType] = (orderTypes[p.orderType] || 0) + 1;
    });
    
    // Designer workload
    const designerWorkload = {};
    projectsData.forEach(p => {
        if (p.status !== 'Completed' && p.status !== 'Cancelled') {
            designerWorkload[p.designer] = (designerWorkload[p.designer] || 0) + 1;
        }
    });
    
    // Sales performance
    const salesPerformance = {};
    projectsData.forEach(p => {
        salesPerformance[p.salesPerson] = (salesPerformance[p.salesPerson] || 0) + 1;
    });
    
    // Priority distribution
    const priorityDistribution = {};
    projectsData.forEach(p => {
        priorityDistribution[p.priority] = (priorityDistribution[p.priority] || 0) + 1;
    });
    
    // Upcoming deadlines
    const upcomingDeadlines = projectsData
        .filter(p => {
            if (!p.dueDate || p.status === 'Completed' || p.status === 'Cancelled') return false;
            const dueDate = parseDate(p.dueDate);
            return dueDate >= now && dueDate <= twoWeeksFromNow;
        })
        .sort((a, b) => parseDate(a.dueDate) - parseDate(b.dueDate))
        .slice(0, 10);
    
    // Recent activity (projects modified recently - using firstIssueDate as proxy)
    const recentActivity = projectsData
        .filter(p => p.firstIssueDate)
        .sort((a, b) => parseDate(b.firstIssueDate) - parseDate(a.firstIssueDate))
        .slice(0, 8);
    
    // ==================== NEW KPI CALCULATIONS ====================
    // Sales Brief Quality Metrics
    
    // Count projects with client changes (status contains "With Client" or "Changing")
    const projectsWithClientChanges = filteredProjects.filter(p => 
        p.status === 'With Client' || p.status === 'Changing' || (p.totalChanges && p.totalChanges > 0)
    ).length;
    
    // Average client changes per project
    const totalChanges = filteredProjects.reduce((sum, p) => sum + (p.totalChanges || 0), 0);
    const avgClientChangesPerProject = total > 0 ? (totalChanges / total).toFixed(1) : 0;
    
    // First-time-right rate (projects with 0 changes)
    const projectsWithNoChanges = filteredProjects.filter(p => 
        !p.totalChanges || p.totalChanges === 0
    ).length;
    const firstTimeRightRate = total > 0 ? ((projectsWithNoChanges / total) * 100).toFixed(1) : 0;
    
    // Brief Quality Score (inverse of change rate - higher is better)
    const briefQualityScore = total > 0 ? 
        ((projectsWithNoChanges / total) * 100).toFixed(1) : 0;
    
    // Average days in "With Client" status (estimate based on project duration)
    // Note: This is simplified - would need status history for accuracy
    const projectsInWithClient = filteredProjects.filter(p => p.status === 'With Client').length;
    const avgDaysInWithClient = projectsInWithClient > 0 ? 
        Math.round(filteredProjects
            .filter(p => p.status === 'With Client' && p.firstIssueDate)
            .reduce((sum, p) => {
                const issued = parseDate(p.firstIssueDate);
                const daysSince = Math.floor((now - issued) / (1000 * 60 * 60 * 24));
                return sum + daysSince;
            }, 0) / projectsInWithClient) : 0;
    
    // Projects requiring rework (more than 2 revisions)
    const projectsRequiringRework = filteredProjects.filter(p => 
        p.totalChanges && p.totalChanges > 2
    ).length;
    
    // Average revisions before sign-off (for completed/signed off projects)
    const signedOffProjectsWithChanges = filteredProjects.filter(p => 
        (p.status === 'Signed Off' || p.status === 'Sent to Production' || p.status === 'Completed') 
        && p.totalChanges !== undefined
    );
    const avgRevisionsBeforeSignOff = signedOffProjectsWithChanges.length > 0 ?
        (signedOffProjectsWithChanges.reduce((sum, p) => sum + (p.totalChanges || 0), 0) / 
        signedOffProjectsWithChanges.length).toFixed(1) : 0;
    
    // Time spent on Rev 1 vs subsequent revisions
    let rev1TimeMinutes = 0;
    let subsequentRevTimeMinutes = 0;
    filteredProjects.forEach(p => {
        if (p.timeEntries && p.timeEntries.length > 0) {
            p.timeEntries.forEach(entry => {
                const revisionNumber = entry.revision ? parseInt(entry.revision.replace(/\D/g, '')) : 1;
                if (revisionNumber === 1 || entry.revision === 'V1' || entry.revision === 'Rev 1') {
                    rev1TimeMinutes += entry.duration || 0;
                } else if (revisionNumber > 1) {
                    subsequentRevTimeMinutes += entry.duration || 0;
                }
            });
        }
    });
    const rev1TimeHours = (rev1TimeMinutes / 60).toFixed(1);
    const subsequentRevTimeHours = (subsequentRevTimeMinutes / 60).toFixed(1);
    const revisionTimeRatio = rev1TimeMinutes > 0 ? (subsequentRevTimeMinutes / rev1TimeMinutes).toFixed(2) : 0;
    
    // Manufacturing & Production Metrics
    
    // Signed Off projects - Total value and timber volume
    const signedOffProjects = filteredProjects.filter(p => p.status === 'Signed Off');
    const signedOffValue = signedOffProjects.reduce((sum, p) => sum + (parseFloat(p.framePrice) || 0), 0);
    const signedOffVolume = signedOffProjects.reduce((sum, p) => 
        sum + (parseFloat(p.oakM3) || 0) + (parseFloat(p.swM3) || 0), 0
    );
    
    // Sent to Production projects - Total value and timber volume
    const sentToProductionProjects = filteredProjects.filter(p => p.status === 'Sent to Production');
    const sentToProductionValue = sentToProductionProjects.reduce((sum, p) => sum + (parseFloat(p.framePrice) || 0), 0);
    const sentToProductionVolume = sentToProductionProjects.reduce((sum, p) => 
        sum + (parseFloat(p.oakM3) || 0) + (parseFloat(p.swM3) || 0), 0
    );
    
    // BOM Accuracy Score (Error-Free BOM Rate)
    // Empty or null bom_feedback = error-free BOM
    // Text in bom_feedback = errors found
    const projectsWithErrorFreeBOM = filteredProjects.filter(p => 
        !p.bomFeedback || p.bomFeedback.trim() === ''
    ).length;
    const bomAccuracyScore = total > 0 ? 
        ((projectsWithErrorFreeBOM / total) * 100).toFixed(1) : 0;
    
    return {
        total, completed, inProgress, onHold, withClient, checking, signedOff, changing,
        completionRate, avgDaysToComplete, onTimeDeliveryRate, overdueProjects, avgRevisions,
        projectsNeedingCalcs, avgSignOffLeadTime, projectsInProduction,
        totalTimeLogged, avgTimePerProject, projectsWithTime, activeTimers, avgDaysToFirstIssue,
        projectsIssuedThisMonth, projectsCompletedThisMonth, projectsStartedThisMonth,
        orderOakValue, orderSWValue, orderFramePrice, orderAvgFramePrice, orderProjectsWithCosting,
        orderCompletedValue, orderInProgressValue, orderOakM3, orderSWM3,
        visualOakValue, visualSWValue, visualFramePrice, visualAvgFramePrice, visualProjectsWithCosting,
        visualCompletedValue, visualInProgressValue, visualOakM3, visualSWM3,
        uniqueClients, repeatClients, avgProjectsPerClient, topSalesPersonCount, 
        topSalesPerson: topSalesPersonName, projectsWithClientReview, avgClientResponseTime,
        newClientsThisMonth, clientSatisfactionProjects,
        activeDesigners, avgProjectsPerDesigner, topDesignerCount, topDesigner: topDesignerName,
        designerUtilization, avgTimePerDesigner, designersWithActiveProjects, totalTeamMembers,
        avgCompletionRatePerDesigner,
        planningProjects, visualProjects, orderProjects, newBuildProjects, renovationProjects,
        commercialProjects, highPriorityProjects, mediumPriorityProjects,
        statusBreakdown, projectTypes, orderTypes, designerWorkload, salesPerformance,
        priorityDistribution, upcomingDeadlines, recentActivity,
        // New KPI metrics
        briefQualityScore, projectsWithClientChanges, avgClientChangesPerProject,
        firstTimeRightRate, avgDaysInWithClient, projectsRequiringRework,
        avgRevisionsBeforeSignOff, rev1TimeHours, subsequentRevTimeHours, revisionTimeRatio,
        signedOffValue, signedOffVolume, sentToProductionValue, sentToProductionVolume,
        bomAccuracyScore
    };
}

function renderStatusChart(statusBreakdown) {
    const total = Object.values(statusBreakdown).reduce((a, b) => a + b, 0);
    const statusColors = {
        'Requested': '#3498db',
        'In Progress': '#e74c3c',
        'Checking': '#f39c12',
        'With Client': '#9b59b6',
        'On Hold': '#95a5a6',
        'Changing': '#1abc9c',
        'Signed Off': '#27ae60',
        'Sent to Production': '#16a085',
        'Completed': '#2ecc71',
        'Cancelled': '#7f8c8d'
    };
    
    return `
        <div class="bar-chart">
            ${Object.entries(statusBreakdown).map(([status, count]) => {
                const percentage = ((count / total) * 100).toFixed(1);
                return `
                    <div class="bar-item">
                        <div class="bar-label">${status}</div>
                        <div class="bar-wrapper">
                            <div class="bar-fill" style="width: ${percentage}%; background: ${statusColors[status] || '#3498db'};"></div>
                            <span class="bar-value">${count} (${percentage}%)</span>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function renderProjectTypeChart(projectTypes) {
    const total = Object.values(projectTypes).reduce((a, b) => a + b, 0);
    const colors = {
        'Planning': '#3498db',
        'Visual': '#9b59b6',
        'Order': '#e74c3c'
    };
    
    return `
        <div class="pie-chart-container">
            ${Object.entries(projectTypes).map(([type, count]) => {
                const percentage = ((count / total) * 100).toFixed(1);
                return `
                    <div class="pie-item">
                        <div class="pie-color" style="background: ${colors[type]};"></div>
                        <div class="pie-label">${type}</div>
                        <div class="pie-value">${count} (${percentage}%)</div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function renderDesignerChart(designerWorkload) {
    const max = Math.max(...Object.values(designerWorkload));
    
    return `
        <div class="bar-chart">
            ${Object.entries(designerWorkload).sort((a, b) => b[1] - a[1]).map(([designer, count]) => {
                const percentage = ((count / max) * 100).toFixed(1);
                return `
                    <div class="bar-item">
                        <div class="bar-label">${designer}</div>
                        <div class="bar-wrapper">
                            <div class="bar-fill" style="width: ${percentage}%; background: linear-gradient(135deg, #3b82f6 0%, #1e3a8a 100%);"></div>
                            <span class="bar-value">${count} active</span>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function renderSalesChart(salesPerformance) {
    const max = Math.max(...Object.values(salesPerformance));
    
    return `
        <div class="bar-chart">
            ${Object.entries(salesPerformance).sort((a, b) => b[1] - a[1]).map(([person, count]) => {
                const percentage = ((count / max) * 100).toFixed(1);
                return `
                    <div class="bar-item">
                        <div class="bar-label">${person}</div>
                        <div class="bar-wrapper">
                            <div class="bar-fill" style="width: ${percentage}%; background: linear-gradient(135deg, #60a5fa 0%, #f5576c 100%);"></div>
                            <span class="bar-value">${count} projects</span>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function renderOrderTypeChart(orderTypes) {
    const total = Object.values(orderTypes).reduce((a, b) => a + b, 0);
    const colors = ['#3498db', '#e74c3c', '#f39c12', '#9b59b6', '#1abc9c', '#27ae60'];
    
    return `
        <div class="pie-chart-container">
            ${Object.entries(orderTypes).map(([type, count], index) => {
                const percentage = ((count / total) * 100).toFixed(1);
                return `
                    <div class="pie-item">
                        <div class="pie-color" style="background: ${colors[index % colors.length]};"></div>
                        <div class="pie-label">${type}</div>
                        <div class="pie-value">${count} (${percentage}%)</div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function renderPriorityChart(priorityDistribution) {
    const total = Object.values(priorityDistribution).reduce((a, b) => a + b, 0);
    const colors = {
        'High': '#e74c3c',
        'Medium': '#f39c12',
        'Low': '#2ecc71'
    };
    
    return `
        <div class="pie-chart-container">
            ${Object.entries(priorityDistribution).map(([priority, count]) => {
                const percentage = ((count / total) * 100).toFixed(1);
                return `
                    <div class="pie-item">
                        <div class="pie-color" style="background: ${colors[priority]};"></div>
                        <div class="pie-label">${priority} Priority</div>
                        <div class="pie-value">${count} (${percentage}%)</div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function renderUpcomingDeadlines(deadlines) {
    if (deadlines.length === 0) {
        return `<p style="color: #7f8c8d; text-align: center; padding: 20px;">No upcoming deadlines in the next 14 days</p>`;
    }
    
    return `
        <div class="deadline-items">
            ${deadlines.map(project => {
                const daysUntil = Math.ceil((parseDate(project.dueDate) - new Date()) / (1000 * 60 * 60 * 24));
                const urgencyClass = daysUntil <= 3 ? 'urgent' : daysUntil <= 7 ? 'warning' : 'normal';
                return `
                    <div class="deadline-item ${urgencyClass}" onclick="showProjectDetail('${project.id}')">
                        <div class="deadline-days">${daysUntil}d</div>
                        <div class="deadline-info">
                            <div class="deadline-project">${project.jobNumber} - ${project.name}</div>
                            <div class="deadline-meta">${project.client} • ${project.designer}</div>
                        </div>
                        <div class="deadline-date">${project.dueDate}</div>
                        <span class="status-badge ${getStatusClass(project.status)}">${project.status}</span>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function renderRecentActivity(recentActivity) {
    if (recentActivity.length === 0) {
        return `<p style="color: #7f8c8d; text-align: center; padding: 20px;">No recent activity</p>`;
    }
    
    return `
        <div class="activity-items">
            ${recentActivity.map(project => `
                <div class="activity-item" onclick="showProjectDetail('${project.id}')">
                    <div class="activity-icon">📋</div>
                    <div class="activity-info">
                        <div class="activity-title">${project.jobNumber} - ${project.name}</div>
                        <div class="activity-meta">First issued: ${project.firstIssueDate} • ${project.designer}</div>
                    </div>
                    <span class="status-badge ${getStatusClass(project.status)}">${project.status}</span>
                </div>
            `).join('')}
        </div>
    `;
}

function getReportsDateRange() {
    const startDate = document.getElementById('reportStartDate')?.value || null;
    const endDate = document.getElementById('reportEndDate')?.value || null;
    return { start: startDate, end: endDate };
}

function exportReportPDF() {
    // Add print styles
    const style = document.createElement('style');
    style.id = 'print-styles';
    style.innerHTML = `
        @media print {
            /* Hide sidebar and navigation */
            .sidebar { display: none !important; }
            
            /* Hide page header and date filter */
            .page-header { display: none !important; }
            .date-range-filter { display: none !important; }
            
            /* Make main content full width and allow overflow */
            .main-content { 
                margin-left: 0 !important; 
                width: 100% !important;
                max-width: 100% !important;
                padding: 0 !important;
                background: white !important;
                height: auto !important;
                overflow: visible !important;
            }
            
            /* Ensure body and containers are white and allow full height */
            body { 
                background: white !important;
                print-color-adjust: exact; 
                -webkit-print-color-adjust: exact;
                margin: 0;
                padding: 0;
                height: auto !important;
                overflow: visible !important;
            }
            
            .reports-page {
                background: white !important;
                padding: 20px !important;
                height: auto !important;
                overflow: visible !important;
            }
            
            #content-area {
                height: auto !important;
                overflow: visible !important;
            }
            
            /* Section headers and grids */
            .section-header {
                page-break-after: avoid;
                break-after: avoid;
            }
            
            .stats-grid {
                page-break-inside: auto;
                break-inside: auto;
            }
            
            /* Keep stat cards from breaking across pages */
            .stat-card { 
                page-break-inside: avoid;
                break-inside: avoid;
                margin-bottom: 10px;
            }
            
            /* Allow page breaks between sections */
            .kpi-section {
                page-break-inside: auto;
                break-inside: auto;
            }
            
            /* Add title for print */
            .reports-page::before {
                content: "Reports Dashboard - Generated: ${new Date().toLocaleString()}";
                display: block;
                text-align: center;
                font-size: 20px;
                font-weight: bold;
                color: #1f2937;
                margin-bottom: 30px;
                padding-bottom: 20px;
                border-bottom: 2px solid #e5e7eb;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Trigger print
    window.print();
    
    // Cleanup after print dialog closes
    setTimeout(() => {
        document.getElementById('print-styles')?.remove();
    }, 1000);
}

function exportReportCSV() {
    const stats = calculateDetailedStats();
    const dateRange = getReportsDateRange();
    const rangeText = dateRange.start && dateRange.end 
        ? ` (${dateRange.start} to ${dateRange.end})`
        : ' (All Time)';
    
    let csv = `Drawing Manager - Report Summary${rangeText}\n`;
    csv += `Generated: ${new Date().toLocaleString()}\n\n`;
    
    // Project Overview
    csv += 'PROJECT OVERVIEW\n';
    csv += 'Metric,Value\n';
    csv += `Total Projects,${stats.total}\n`;
    csv += `Completed Projects,${stats.completed}\n`;
    csv += `In Progress,${stats.inProgress}\n`;
    csv += `On Hold,${stats.onHold}\n`;
    csv += `With Client,${stats.withClient}\n`;
    csv += `Checking,${stats.checking}\n`;
    csv += `Signed Off,${stats.signedOff}\n`;
    csv += `Changing,${stats.changing}\n\n`;
    
    // Performance Metrics
    csv += 'PERFORMANCE METRICS\n';
    csv += 'Metric,Value\n';
    csv += `Completion Rate,${stats.completionRate}%\n`;
    csv += `Average Days to Complete,${stats.avgDaysToComplete}\n`;
    csv += `On-Time Delivery Rate,${stats.onTimeDeliveryRate}%\n`;
    csv += `Overdue Projects,${stats.overdueProjects}\n`;
    csv += `Average Revisions,${stats.avgRevisions}\n`;
    csv += `Average Sign-off Lead Time,${stats.avgSignOffLeadTime} days\n`;
    csv += `Production Ready Rate,${stats.productionReadyRate}%\n`;
    csv += `Error-Free BOM Rate,${stats.bomAccuracyScore}%\n\n`;
    
    // Time Tracking
    csv += 'TIME TRACKING\n';
    csv += 'Metric,Value\n';
    csv += `Total Time Logged,${formatTimeDisplay(stats.totalTimeLogged)}\n`;
    csv += `Average Time per Project,${formatTimeDisplay(stats.avgTimePerProject)}\n`;
    csv += `Projects with Time Logged,${stats.projectsWithTime}\n`;
    csv += `Active Timers,${stats.activeTimers}\n\n`;
    
    // Team Performance
    csv += 'TEAM PERFORMANCE\n';
    csv += 'Metric,Value\n';
    csv += `Designer Utilization,${stats.designerUtilization}%\n`;
    csv += `Average Days to First Issue,${stats.avgDaysToFirstIssue}\n`;
    csv += `Top Sales Person,${stats.topSalesPerson || 'N/A'}\n\n`;
    
    // Monthly Activity
    csv += 'MONTHLY ACTIVITY\n';
    csv += 'Metric,Value\n';
    csv += `Projects Issued This Month,${stats.projectsIssuedThisMonth}\n`;
    csv += `Projects Completed This Month,${stats.projectsCompletedThisMonth}\n`;
    csv += `Projects Started This Month,${stats.projectsStartedThisMonth}\n`;
    csv += `New Clients This Month,${stats.newClientsThisMonth}\n\n`;
    
    // Status Breakdown
    csv += 'STATUS BREAKDOWN\n';
    csv += 'Status,Count\n';
    Object.entries(stats.statusBreakdown || {}).forEach(([status, count]) => {
        csv += `${status},${count}\n`;
    });
    csv += '\n';
    
    // Designer Breakdown
    if (stats.designerBreakdown && Object.keys(stats.designerBreakdown).length > 0) {
        csv += 'DESIGNER BREAKDOWN\n';
        csv += 'Designer,Project Count\n';
        Object.entries(stats.designerBreakdown).forEach(([designer, count]) => {
            csv += `${designer},${count}\n`;
        });
        csv += '\n';
    }
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `drawing-manager-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
}

// ==================== TASKS PAGE ====================

// Render Tasks Page
function renderTasksPage() {
    const sortedTasks = tasksData.sort((a, b) => {
        // Sort by status (pending first), then by due date
        if (a.status !== b.status) {
            const statusOrder = { 'pending': 0, 'in-progress': 1, 'completed': 2 };
            return statusOrder[a.status] - statusOrder[b.status];
        }
        if (a.dueDate && b.dueDate) {
            return new Date(parseDate(a.dueDate)) - new Date(parseDate(b.dueDate));
        }
        return 0;
    });

    const pendingCount = tasksData.filter(t => t.status === 'pending').length;
    const inProgressCount = tasksData.filter(t => t.status === 'in-progress').length;
    const completedCount = tasksData.filter(t => t.status === 'completed').length;

    return `
        <div class="projects-page">
            <div class="page-header">
                <h2>Tasks</h2>
                <div class="header-actions">
                    <button class="btn-primary" onclick="openNewTaskModal()">+ New Task</button>
                </div>
            </div>

            <div class="stats-grid" style="grid-template-columns: repeat(3, 1fr); margin-bottom: 24px;">
                <div class="stat-card">
                    <div class="stat-value" style="color: #f39c12;">${pendingCount}</div>
                    <div class="stat-label">Pending</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value" style="color: #3498db;">${inProgressCount}</div>
                    <div class="stat-label">In Progress</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value" style="color: #27ae60;">${completedCount}</div>
                    <div class="stat-label">Completed</div>
                </div>
            </div>

            ${tasksData.length === 0 ? `
                <div class="card" style="text-align: center; padding: 60px 20px; color: #7f8c8d;">
                    <div style="font-size: 48px; margin-bottom: 16px;">✓</div>
                    <h3 style="color: #2c3e50; margin-bottom: 8px;">No tasks yet</h3>
                    <p>Create your first task to get started</p>
                </div>
            ` : `
                <table class="projects-table">
                    <thead>
                        <tr>
                            <th style="width: 50px;"></th>
                            <th>Task</th>
                            <th style="width: 150px;">Assigned To</th>
                            <th style="width: 120px;">Due Date</th>
                            <th style="width: 130px;">Status</th>
                            <th style="width: 100px;">Priority</th>
                            <th style="width: 120px;">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${sortedTasks.map(task => `
                            <tr style="${task.status === 'completed' ? 'opacity: 0.6;' : ''}">
                                <td style="text-align: center;">
                                    <input type="checkbox" 
                                        ${task.status === 'completed' ? 'checked' : ''} 
                                        onchange="toggleTaskStatus('${task.id}')"
                                        style="cursor: pointer; width: 20px; height: 20px; accent-color: #27ae60;">
                                </td>
                                <td>
                                    <div style="font-weight: 500; ${task.status === 'completed' ? 'text-decoration: line-through; color: #95a5a6;' : 'color: #2c3e50;'}">${task.title}</div>
                                    ${task.description ? `<div style="font-size: 12px; color: #7f8c8d; margin-top: 4px; line-height: 1.4;">${task.description}</div>` : ''}
                                </td>
                                <td style="color: #34495e;">${task.assignedTo || '<span style="color: #95a5a6;">Unassigned</span>'}</td>
                                <td style="color: #34495e;">${task.dueDate || '<span style="color: #95a5a6;">-</span>'}</td>
                                <td>
                                    <span class="status-badge ${
                                        task.status === 'completed' ? 'status-completed' :
                                        task.status === 'in-progress' ? 'status-in-progress' :
                                        'status-requested'
                                    }">${task.status === 'in-progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}</span>
                                </td>
                                <td>
                                    <span class="priority-badge ${
                                        task.priority === 'High' ? 'priority-high' :
                                        task.priority === 'Medium' ? 'priority-medium' :
                                        'priority-low'
                                    }">${task.priority}</span>
                                </td>
                                <td>
                                    <div style="display: flex; gap: 6px;">
                                        <button class="btn-secondary" onclick="editTask('${task.id}')" 
                                            style="padding: 6px 12px; font-size: 13px; flex: 1; min-width: 0;" 
                                            title="Edit task">
                                            ✏️
                                        </button>
                                        <button class="btn-secondary" onclick="deleteTask('${task.id}')" 
                                            style="padding: 6px 12px; font-size: 13px; background: #ef4444; border-color: #dc2626; color: white; flex: 1; min-width: 0;" 
                                            title="Delete task">
                                            🗑️
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `}
        </div>

        <!-- Task Modal -->
        <div id="taskModal" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.5); z-index: 10000; align-items: center; justify-content: center;">
            <div style="background: white; border-radius: 16px; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3); max-width: 600px; width: 90%; max-height: 90vh; overflow: hidden; display: flex; flex-direction: column;">
                <div style="padding: 24px; border-bottom: 1px solid #e9ecef; display: flex; align-items: center; justify-content: space-between;">
                    <h3 id="taskModalTitle" style="margin: 0; font-size: 24px; font-weight: 700; color: #2c3e50;">New Task</h3>
                    <span onclick="closeTaskModal()" style="background: none; border: none; font-size: 32px; color: #95a5a6; cursor: pointer; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 8px; transition: all 0.2s;" onmouseover="this.style.background='#f8f9fa'; this.style.color='#2c3e50'" onmouseout="this.style.background='none'; this.style.color='#95a5a6'">&times;</span>
                </div>
                <div style="padding: 24px; overflow-y: auto;">
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #2c3e50; font-size: 14px;">Task Title *</label>
                        <input type="text" id="taskTitle" class="form-input" placeholder="e.g., Build new window templates" required style="width: 100%; padding: 12px 16px; border: 1px solid #dee2e6; border-radius: 8px; font-size: 14px;">
                    </div>
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #2c3e50; font-size: 14px;">Description</label>
                        <textarea id="taskDescription" class="form-input" placeholder="Add details..." rows="3" style="width: 100%; padding: 12px 16px; border: 1px solid #dee2e6; border-radius: 8px; font-size: 14px; resize: vertical;"></textarea>
                    </div>
                    <div class="detail-grid">
                        <div style="margin-bottom: 20px;">
                            <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #2c3e50; font-size: 14px;">Assigned To</label>
                            <select id="taskAssignedTo" class="form-input" style="width: 100%; padding: 12px 16px; border: 1px solid #dee2e6; border-radius: 8px; font-size: 14px;">
                                <option value="">Unassigned</option>
                                ${teamMembers.filter(m => m.active).map(member => 
                                    `<option value="${member.name}">${member.name}</option>`
                                ).join('')}
                            </select>
                        </div>
                        <div style="margin-bottom: 20px;">
                            <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #2c3e50; font-size: 14px;">Due Date</label>
                            <input type="date" id="taskDueDate" class="form-input" style="width: 100%; padding: 12px 16px; border: 1px solid #dee2e6; border-radius: 8px; font-size: 14px;">
                        </div>
                    </div>
                    <div class="detail-grid">
                        <div style="margin-bottom: 20px;">
                            <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #2c3e50; font-size: 14px;">Status</label>
                            <select id="taskStatus" class="form-input" style="width: 100%; padding: 12px 16px; border: 1px solid #dee2e6; border-radius: 8px; font-size: 14px;">
                                <option value="pending">Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                        <div style="margin-bottom: 20px;">
                            <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #2c3e50; font-size: 14px;">Priority</label>
                            <select id="taskPriority" class="form-input" style="width: 100%; padding: 12px 16px; border: 1px solid #dee2e6; border-radius: 8px; font-size: 14px;">
                                <option value="Low">Low</option>
                                <option value="Medium" selected>Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div style="padding: 24px; border-top: 1px solid #e9ecef; display: flex; gap: 12px; justify-content: flex-end;">
                    <button class="btn-secondary" onclick="closeTaskModal()">Cancel</button>
                    <button class="btn-primary" onclick="saveTask()">Save Task</button>
                </div>
            </div>
        </div>

        <!-- Delete Confirmation Modal -->
        <div id="deleteTaskModal" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.5); z-index: 10001; align-items: center; justify-content: center;">
            <div style="background: white; border-radius: 16px; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3); max-width: 450px; width: 90%; overflow: hidden;">
                <div style="padding: 24px; border-bottom: 1px solid #e9ecef;">
                    <h3 style="margin: 0; font-size: 20px; font-weight: 700; color: #e74c3c; display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 24px;">⚠️</span>
                        Delete Task
                    </h3>
                </div>
                <div style="padding: 24px;">
                    <p style="margin: 0; color: #2c3e50; line-height: 1.6;">Are you sure you want to delete this task? This action cannot be undone.</p>
                </div>
                <div style="padding: 24px; border-top: 1px solid #e9ecef; display: flex; gap: 12px; justify-content: flex-end;">
                    <button class="btn-secondary" onclick="closeDeleteTaskModal()">Cancel</button>
                    <button class="btn-secondary" onclick="confirmDeleteTask()" style="background: #ef4444; border-color: #dc2626; color: white;">Delete Task</button>
                </div>
            </div>
        </div>
    `;
}

// Open New Task Modal
function openNewTaskModal() {
    currentTask = null;
    document.getElementById('taskModalTitle').textContent = 'New Task';
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDescription').value = '';
    document.getElementById('taskAssignedTo').value = '';
    document.getElementById('taskDueDate').value = '';
    document.getElementById('taskStatus').value = 'pending';
    document.getElementById('taskPriority').value = 'Medium';
    document.getElementById('taskModal').style.display = 'flex';
}

// Edit Task
function editTask(taskId) {
    currentTask = tasksData.find(t => t.id === taskId);
    if (!currentTask) return;

    document.getElementById('taskModalTitle').textContent = 'Edit Task';
    document.getElementById('taskTitle').value = currentTask.title;
    document.getElementById('taskDescription').value = currentTask.description || '';
    document.getElementById('taskAssignedTo').value = currentTask.assignedTo || '';
    document.getElementById('taskDueDate').value = currentTask.dueDate ? formatDateToInput(currentTask.dueDate) : '';
    document.getElementById('taskStatus').value = currentTask.status;
    document.getElementById('taskPriority').value = currentTask.priority;
    document.getElementById('taskModal').style.display = 'flex';
}

// Close Task Modal
function closeTaskModal() {
    document.getElementById('taskModal').style.display = 'none';
    currentTask = null;
}

// Save Task
async function saveTask() {
    const title = document.getElementById('taskTitle').value.trim();
    const description = document.getElementById('taskDescription').value.trim();
    const assignedTo = document.getElementById('taskAssignedTo').value;
    const dueDate = document.getElementById('taskDueDate').value;
    const status = document.getElementById('taskStatus').value;
    const priority = document.getElementById('taskPriority').value;

    if (!title) {
        showNotification('Please enter a task title', 'error');
        return;
    }

    const taskData = {
        title,
        description,
        assigned_to: assignedTo || null,
        due_date: dueDate ? formatDateToDB(dueDate) : null,
        status,
        priority
    };

    // Only add created_by if we have a valid user ID
    if (currentUser && currentUser.id) {
        taskData.created_by = currentUser.id;
    }

    try {
        if (currentTask) {
            // Update existing task
            const updated = await SupabaseAPI.updateTask(currentTask.id, taskData);
            if (updated) {
                const index = tasksData.findIndex(t => t.id === currentTask.id);
                if (index !== -1) {
                    tasksData[index] = {
                        ...currentTask,
                        title,
                        description,
                        assignedTo,
                        dueDate: dueDate ? formatDateFromDB(dueDate) : null,
                        status,
                        priority
                    };
                }
            }
        } else {
            // Create new task
            const newTask = await SupabaseAPI.createTask(taskData);
            if (newTask) {
                tasksData.push({
                    id: newTask.id,
                    title,
                    description,
                    assignedTo,
                    dueDate: dueDate ? formatDateFromDB(dueDate) : null,
                    status,
                    priority,
                    createdAt: new Date().toISOString()
                });
            }
        }

        closeTaskModal();
        showView('tasks');
    } catch (error) {
        showNotification('Error saving task. Please try again.', 'error');
    }
}

// Toggle Task Status
async function toggleTaskStatus(taskId) {
    const task = tasksData.find(t => t.id === taskId);
    if (!task) return;

    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    
    try {
        const updated = await SupabaseAPI.updateTask(taskId, { status: newStatus });
        if (updated) {
            task.status = newStatus;
            showView('tasks');
        }
    } catch (error) {
        showNotification('Error updating task status. Please try again.', 'error');
    }
}

// Delete Task
let taskToDelete = null;

function deleteTask(taskId) {
    taskToDelete = taskId;
    document.getElementById('deleteTaskModal').style.display = 'flex';
}

function closeDeleteTaskModal() {
    taskToDelete = null;
    document.getElementById('deleteTaskModal').style.display = 'none';
}

async function confirmDeleteTask() {
    if (!taskToDelete) return;

    try {
        const deleted = await SupabaseAPI.deleteTask(taskToDelete);
        if (deleted) {
            tasksData = tasksData.filter(t => t.id !== taskToDelete);
            closeDeleteTaskModal();
            showView('tasks');
        }
    } catch (error) {
        showNotification('Error deleting task. Please try again.', 'error');
    }
}

// Load Tasks from Database
async function loadTasksFromDatabase() {
    try {
        const tasks = await SupabaseAPI.getAllTasks();
        if (tasks) {
            tasksData = tasks.map(t => ({
                id: t.id,
                title: t.title,
                description: t.description,
                assignedTo: t.assigned_to,
                dueDate: t.due_date ? formatDateFromDB(t.due_date) : null,
                status: t.status,
                priority: t.priority,
                createdAt: t.created_at
            }));
        }
    } catch (error) {
        console.error('Error loading tasks:', error);
        // If table doesn't exist yet, just initialize empty array
        tasksData = [];
    }
}

// ==================== END TASKS PAGE ====================

// Render Settings Page
// Show Project Detail
function showProjectDetail(projectId) {
    currentProject = projectsData.find(p => p.id === projectId);
    if (currentProject) {
        localStorage.setItem('currentProjectId', projectId);
        document.getElementById('content-area').innerHTML = renderProjectDetailPage(currentProject);
    }
}

// Edit functions
function startEdit() {
    isEditing = true;
    if (currentProject) {
        document.getElementById('content-area').innerHTML = renderProjectDetailPage(currentProject);
    }
}

function cancelEdit() {
    isEditing = false;
    if (currentProject) {
        document.getElementById('content-area').innerHTML = renderProjectDetailPage(currentProject);
    }
}

function deleteProject() {
    if (!currentProject) {
        showNotification('No project selected', 'error');
        return;
    }

    // Show delete confirmation modal
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px;">
            <div class="modal-header">
                <h2>🗑️ Delete Project</h2>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <div style="padding: 20px 0;">
                    <p style="font-size: 16px; margin-bottom: 16px;">
                        Are you sure you want to delete <strong>"${currentProject.name}"</strong>?
                    </p>
                    <div style="background: #fee; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 4px; margin-top: 16px;">
                        <p style="color: #991b1b; margin: 0; font-size: 14px;">
                            ⚠️ <strong>Warning:</strong> This action cannot be undone. All associated time entries and history will also be deleted.
                        </p>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
                <button class="btn-primary" style="background: #ef4444; border-color: #dc2626;" onclick="confirmDeleteProject()">Delete Project</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

async function confirmDeleteProject() {
    // Close the modal
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
    }

    try {
        
        // Delete from Supabase
        const deleted = await SupabaseAPI.deleteProject(currentProject.id);
        
        if (deleted) {
            showNotification('Project deleted successfully', 'success');
            
            // Remove from local array
            projectsData = projectsData.filter(p => p.id !== currentProject.id);
            
            // Clear current project
            currentProject = null;
            localStorage.removeItem('currentProjectId');
            
            // Return to projects page
            showView('projects');
        } else {
            throw new Error('Delete operation returned false');
        }
    } catch (error) {
        console.error('Error deleting project:', error);
        showNotification('Failed to delete project: ' + error.message, 'error');
    }
}

function cancelNewProject() {
    // Remove the unsaved new project
    if (currentProject && currentProject.name === '') {
        projectsData = projectsData.filter(p => p.id !== currentProject.id);
    }
    currentProject = null;
    isEditing = false;
    showView('projects');
}

function updateProjectTypeStatus() {
    const projectType = document.getElementById('projectType').value;
    const statusSelect = document.getElementById('projectStatus');
    const statusOpts = statusOptions[projectType] || [];
    
    statusSelect.innerHTML = statusOpts.map(s => `<option value="${s}">${s}</option>`).join('');
}

function updateProjectTypeStatusInEdit() {
    const projectType = document.getElementById('projectType').value;
    const statusSelect = document.getElementById('statusSelect');
    const statusOpts = statusOptions[projectType] || [];
    
    if (statusSelect) {
        statusSelect.innerHTML = statusOpts.map(s => `<option value="${s}">${s}</option>`).join('');
    }
}

function updateTotalChanges() {
    const versionSelect = document.getElementById('versionSelect');
    const totalChangesDisplay = document.getElementById('totalChangesDisplay');
    
    if (versionSelect && totalChangesDisplay) {
        const version = parseInt(versionSelect.value) || 1;
        const totalChanges = version - 1;
        totalChangesDisplay.textContent = totalChanges;
    }
}

function updateCalcsStatusField() {
    const structuralCalcs = document.getElementById('structuralCalcs');
    const calcsStatus = document.getElementById('calcsStatus');
    const calcsDateRequested = document.getElementById('calcsDateRequested');
    const calcsType = document.getElementById('calcsType');
    
    if (structuralCalcs && calcsStatus && calcsDateRequested) {
        if (structuralCalcs.value === 'No') {
            calcsStatus.value = 'N/A';
            calcsStatus.disabled = true;
            calcsDateRequested.disabled = true;
            calcsDateRequested.value = '';
            if (calcsType) {
                calcsType.disabled = true;
                calcsType.value = '';
            }
        } else {
            calcsStatus.disabled = false;
            calcsDateRequested.disabled = false;
            if (calcsType) {
                calcsType.disabled = false;
            }
            if (calcsStatus.value === 'N/A') {
                calcsStatus.value = 'Requested';
            }
        }
    }
}

// Show styled notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Set icon based on type
    let icon = '✓'; // success
    if (type === 'error') icon = '✕';
    if (type === 'info') icon = 'ℹ';
    if (type === 'warning') icon = '⚠';
    
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${icon}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Custom confirm dialog
function showConfirm(message, onConfirm, onCancel = null) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
        <div class="modal-content" style="max-width: 400px;" onclick="event.stopPropagation()">
            <div class="modal-header">
                <h3 style="margin: 0; font-size: 18px;">⚠️ Confirm Action</h3>
            </div>
            <div class="modal-body">
                <p style="margin: 0; color: #374151; line-height: 1.5;">${message}</p>
            </div>
            <div class="modal-footer" style="display: flex; gap: 12px; justify-content: flex-end;">
                <button class="btn-secondary confirm-cancel">Cancel</button>
                <button class="btn-primary confirm-ok">Confirm</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Get buttons
    const cancelBtn = overlay.querySelector('.confirm-cancel');
    const confirmBtn = overlay.querySelector('.confirm-ok');
    
    // Cancel handler
    const handleCancel = () => {
        overlay.remove();
        if (onCancel) onCancel();
    };
    
    // Confirm handler
    const handleConfirm = () => {
        overlay.remove();
        if (onConfirm) onConfirm();
    };
    
    // Add event listeners
    cancelBtn.addEventListener('click', handleCancel);
    confirmBtn.addEventListener('click', handleConfirm);
    
    // Close on backdrop click
    overlay.addEventListener('click', handleCancel);
    
    // Prevent closing when clicking modal content
    overlay.querySelector('.modal-content').addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// Show detailed error modal
function showError(title, message) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    
    // Convert newlines to <br> for HTML display
    const formattedMessage = message.replace(/\n/g, '<br>');
    
    overlay.innerHTML = `
        <div class="modal-content" style="max-width: 500px;" onclick="event.stopPropagation()">
            <div class="modal-header">
                <h3 style="margin: 0; font-size: 18px;">❌ ${title}</h3>
            </div>
            <div class="modal-body">
                <p style="margin: 0; color: #374151; line-height: 1.6;">${formattedMessage}</p>
            </div>
            <div class="modal-footer" style="display: flex; gap: 12px; justify-content: flex-end;">
                <button class="btn-primary error-ok">OK</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Get button
    const okBtn = overlay.querySelector('.error-ok');
    
    // OK handler
    const handleOk = () => {
        overlay.remove();
    };
    
    // Add event listener
    okBtn.addEventListener('click', handleOk);
    
    // Close on backdrop click
    overlay.addEventListener('click', handleOk);
    
    // Prevent closing when clicking modal content
    overlay.querySelector('.modal-content').addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// =====================================================
// Loading States
// =====================================================
function showLoading(message = 'Loading...') {
    // Remove existing loading overlay if present
    const existing = document.querySelector('.loading-overlay');
    if (existing) existing.remove();
    
    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.innerHTML = `
        <div class="spinner"></div>
        <div class="loading-text">${message}</div>
    `;
    document.body.appendChild(overlay);
}

function hideLoading() {
    const overlay = document.querySelector('.loading-overlay');
    if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 300);
    }
}

// Skeleton loader for tables
function renderTableSkeleton(rows = 5, columns = 6) {
    const skeletonRows = Array(rows).fill(0).map(() => `
        <div class="skeleton-table-row">
            ${Array(columns).fill(0).map(() => '<div class="skeleton skeleton-text"></div>').join('')}
        </div>
    `).join('');
    
    return `<div class="skeleton-table">${skeletonRows}</div>`;
}

// =====================================================
// Empty States
// =====================================================
function renderEmptyState(config) {
    const {
        icon = '📭',
        title = 'No data found',
        description = 'There are no items to display.',
        actionText = null,
        actionHandler = null,
        suggestions = []
    } = config;
    
    return `
        <div class="empty-state">
            <div class="empty-state-icon">${icon}</div>
            <h3 class="empty-state-title">${title}</h3>
            <p class="empty-state-description">${description}</p>
            ${actionText && actionHandler ? `
                <div class="empty-state-action">
                    <button class="btn-primary" onclick="${actionHandler}">${actionText}</button>
                </div>
            ` : ''}
            ${suggestions.length > 0 ? `
                <div class="empty-state-suggestions">
                    <h4>Try the following:</h4>
                    <ul>
                        ${suggestions.map(s => `<li>${s}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
        </div>
    `;
}

// Empty state for projects
function renderProjectsEmptyState() {
    if (searchTerm || filterStatus || filterOrderType || filterProjectType) {
        return renderEmptyState({
            icon: '🔍',
            title: 'No projects found',
            description: 'No projects match your current filters. Try adjusting your search criteria.',
            actionText: 'Clear All Filters',
            actionHandler: 'clearAllFilters()',
            suggestions: [
                'Remove some filters',
                'Check your spelling',
                'Try a different search term'
            ]
        });
    }
    
    return renderEmptyState({
        icon: '📋',
        title: 'No projects yet',
        description: 'Get started by creating your first project. Track drawings, deadlines, and team collaboration all in one place.',
        actionText: '+ Create First Project',
        actionHandler: 'addNewProject()',
        suggestions: [
            'Projects help organize your workflow',
            'Assign designers and set due dates',
            'Track progress from start to finish'
        ]
    });
}

// Empty state for team
function renderTeamEmptyState() {
    return renderEmptyState({
        icon: '👥',
        title: 'No team members',
        description: 'Add team members to collaborate on projects and track individual performance.',
        actionText: '+ Add Team Member',
        actionHandler: 'addTeamMember()',
        suggestions: [
            'Team members can be assigned to projects',
            'Track KPIs and workload for each member',
            'Manage roles and permissions'
        ]
    });
}

// Empty state for tasks
function renderTasksEmptyState() {
    return renderEmptyState({
        icon: '✓',
        title: 'No tasks yet',
        description: 'Create tasks to break down your projects into manageable steps.',
        actionText: '+ Add Task',
        actionHandler: 'addNewTask()',
        suggestions: [
            'Tasks help track project milestones',
            'Assign tasks to team members',
            'Set priorities and due dates'
        ]
    });
}

async function saveNewProject() {
    const jobNumber = document.getElementById('jobNumber').value.trim();
    const client = document.getElementById('projectClient').value.trim();
    const salesPerson = document.getElementById('salesPerson').value.trim();
    const designer = document.getElementById('designer').value.trim();
    const orderDate = document.getElementById('orderDate').value;
    const dueDate = document.getElementById('projectDueDate').value;
    
    // Validation
    if (!jobNumber) {
        showNotification('Please enter a job number', 'error');
        document.getElementById('jobNumber').focus();
        return;
    }
    if (!client) {
        showNotification('Please enter a client name', 'error');
        document.getElementById('projectClient').focus();
        return;
    }
    if (!salesPerson) {
        showNotification('Please select a sales person', 'error');
        document.getElementById('salesPerson').focus();
        return;
    }
    if (!designer) {
        showNotification('Please select a designer', 'error');
        document.getElementById('designer').focus();
        return;
    }
    if (!orderDate) {
        showNotification('Please select a requested date', 'error');
        document.getElementById('orderDate').focus();
        return;
    }
    if (!dueDate) {
        showNotification('Please select a due date', 'error');
        document.getElementById('projectDueDate').focus();
        return;
    }
    
    // Calculate days to issue if first issue date is provided
    const firstIssueDate = document.getElementById('firstIssueDate').value;
    let daysToIssue = null;
    if (firstIssueDate && orderDate) {
        const start = new Date(orderDate);
        const end = new Date(firstIssueDate);
        daysToIssue = Math.floor((end - start) / (1000 * 60 * 60 * 24));
    }
    
    // Get version number
    const versionNumber = parseInt(document.getElementById('currentVersion').value) || 1;
    
    // Create project data for database
    const projectData = {
        job_number: jobNumber,
        name: client + ' - ' + jobNumber,
        client: client,
        order_type: document.getElementById('orderType').value,
        project_type: document.getElementById('projectType').value,
        status: document.getElementById('projectStatus').value,
        sales_person: salesPerson,
        designer: designer,
        assignee: designer,
        priority: document.getElementById('projectPriority').value,
        current_version: 'Rev ' + versionNumber,
        total_changes: versionNumber - 1,
        order_date: formatDateToDB(orderDate),
        due_date: formatDateToDB(dueDate),
        first_issue_date: firstIssueDate ? formatDateToDB(firstIssueDate) : null,
        days_to_issue: daysToIssue,
        issued_to_production: document.getElementById('issuedToProduction').value ? formatDateToDB(document.getElementById('issuedToProduction').value) : null,
        sign_off_lead_time: parseInt(document.getElementById('signOffLeadTime').value) || 0,
        structural_calcs: document.getElementById('structuralCalcs').value,
        calcs_status: document.getElementById('calcsStatus').value,
        calcs_type: document.getElementById('calcsType').value || null,
        calcs_date_requested: document.getElementById('calcsDateRequested').value ? formatDateToDB(document.getElementById('calcsDateRequested').value) : null,
        oak_m3: null,
        sw_m3: null,
        frame_price: null,
        description: document.getElementById('projectDescription').value || '',
        notes: document.getElementById('projectNotes').value || '',
        created_by: currentUser ? currentUser.id : null
    };
    
    
    try {
        // Save to database
        const savedProject = await SupabaseAPI.createProject(projectData);
        
        if (savedProject) {
            // Remove the temporary project from projectsData
            const tempIndex = projectsData.findIndex(p => p.id === currentProject.id);
            if (tempIndex !== -1) {
                projectsData.splice(tempIndex, 1);
            }
            
            // Reload all projects from database
            await loadProjectsFromDatabase();
            
            isEditing = false;
            updatePendingCount();
            showNotification('Project created successfully!');
            showView('projects');
        } else {
            showNotification('Failed to create project. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Error creating project:', error);
        showNotification('Error creating project: ' + error.message, 'error');
    }
}

async function saveProject() {
    if (currentProject) {
        // Job Information
        const jobNumber = document.getElementById('jobNumber');
        const client = document.getElementById('client');
        const orderType = document.getElementById('orderType');
        const projectType = document.getElementById('projectType');
        const versionSelect = document.getElementById('versionSelect');
        const salesPerson = document.getElementById('salesPerson');
        const designer = document.getElementById('designer');
        
        // Timeline & Dates
        const orderDate = document.getElementById('orderDate');
        const dueDate = document.getElementById('dueDate');
        const firstIssueDate = document.getElementById('firstIssueDate');
        const issuedToProduction = document.getElementById('issuedToProduction');
        const signOffLeadTime = document.getElementById('signOffLeadTime');
        const totalChanges = document.getElementById('totalChanges');
        
        // Status & Calcs
        const statusSelect = document.getElementById('statusSelect');
        const prioritySelect = document.getElementById('prioritySelect');
        const structuralCalcs = document.getElementById('structuralCalcs');
        const calcsType = document.getElementById('calcsType');
        const calcsStatus = document.getElementById('calcsStatus');
        const calcsDateRequested = document.getElementById('calcsDateRequested');
        const budget = document.getElementById('budget');
        
        // Description & Notes
        const description = document.getElementById('description');
        const notesTextarea = document.getElementById('notesTextarea');
        
        // Build updates object
        const updates = {};
        
        if (jobNumber) updates.job_number = jobNumber.value;
        if (client) updates.client = client.value;
        if (jobNumber && client) updates.name = client.value + ' - ' + jobNumber.value;
        if (orderType) updates.order_type = orderType.value;
        if (projectType) updates.project_type = projectType.value;
        if (versionSelect) {
            const versionNumber = parseInt(versionSelect.value) || 1;
            updates.current_version = 'Rev ' + versionNumber;
            updates.total_changes = versionNumber - 1;
        }
        if (salesPerson) updates.sales_person = salesPerson.value;
        if (designer) {
            updates.designer = designer.value;
            updates.assignee = designer.value;
        }
        
        if (orderDate) updates.order_date = formatDateToDB(orderDate.value);
        if (dueDate) updates.due_date = formatDateToDB(dueDate.value);
        if (firstIssueDate && firstIssueDate.value) {
            updates.first_issue_date = formatDateToDB(firstIssueDate.value);
            // Recalculate days to issue
            if (orderDate && orderDate.value) {
                const start = new Date(orderDate.value);
                const end = new Date(firstIssueDate.value);
                updates.days_to_issue = Math.floor((end - start) / (1000 * 60 * 60 * 24));
            }
        }
        if (issuedToProduction && issuedToProduction.value) {
            updates.issued_to_production = formatDateToDB(issuedToProduction.value);
        }
        if (signOffLeadTime) updates.sign_off_lead_time = parseInt(signOffLeadTime.value) || 0;
        
        if (statusSelect) updates.status = statusSelect.value;
        if (prioritySelect) updates.priority = prioritySelect.value;
        if (structuralCalcs) {
            updates.structural_calcs = structuralCalcs.value;
            // Auto-set calcsStatus to N/A if structural calcs is No
            if (structuralCalcs.value === 'No') {
                updates.calcs_status = 'N/A';
                updates.calcs_date_requested = null;
                updates.calcs_type = null;
            }
        }
        if (calcsType) updates.calcs_type = calcsType.value || null;
        if (calcsStatus) updates.calcs_status = calcsStatus.value;
        if (calcsDateRequested && calcsDateRequested.value) {
            updates.calcs_date_requested = formatDateToDB(calcsDateRequested.value);
        }
        
        // Material & Cost
        const oakM3 = document.getElementById('oakM3');
        const swM3 = document.getElementById('swM3');
        const framePrice = document.getElementById('framePrice');
        
        if (oakM3) updates.oak_m3 = oakM3.value ? parseFloat(oakM3.value) : null;
        if (swM3) updates.sw_m3 = swM3.value ? parseFloat(swM3.value) : null;
        if (framePrice) updates.frame_price = framePrice.value ? parseFloat(framePrice.value) : null;
        
        if (description) updates.description = description.value;
        if (notesTextarea) updates.notes = notesTextarea.value;
        
        // Brief Feedback
        const briefFeedback = document.getElementById('briefFeedback');
        if (briefFeedback) updates.brief_feedback = briefFeedback.value || null;
        
        // BOM Feedback
        const bomFeedback = document.getElementById('bomFeedback');
        if (bomFeedback) updates.bom_feedback = bomFeedback.value || null;
        
        // Client Review Dates
        const clientReviewSentDate = document.getElementById('clientReviewSentDate');
        const clientReviewReceivedDate = document.getElementById('clientReviewReceivedDate');
        if (clientReviewSentDate && clientReviewSentDate.value) {
            updates.client_review_sent_date = formatDateToDB(clientReviewSentDate.value);
        }
        if (clientReviewReceivedDate && clientReviewReceivedDate.value) {
            updates.client_review_received_date = formatDateToDB(clientReviewReceivedDate.value);
        }
        
        // Complexity Score
        const complexityScore = document.getElementById('complexityScore');
        if (complexityScore) updates.complexity_score = parseInt(complexityScore.value) || 3;
        
        // Track status changes
        const oldStatus = currentProject.status;
        const newStatus = statusSelect ? statusSelect.value : oldStatus;
        
        try {
            // Save to database
            const updated = await SupabaseAPI.updateProject(currentProject.id, updates);
            
            if (updated) {
                // Log status change if status changed
                if (oldStatus !== newStatus) {
                    try {
                        await SupabaseAPI.addStatusHistory(
                            currentProject.id, 
                            oldStatus, 
                            newStatus, 
                            currentUser?.name || 'User'
                        );
                    } catch (historyError) {
                        console.error('Failed to log status history:', historyError);
                        // Don't block save if history logging fails
                    }
                }
                
                // Reload projects from database
                await loadProjectsFromDatabase();
                
                // Find the updated project
                currentProject = projectsData.find(p => p.id === currentProject.id);
                
                isEditing = false;
                document.getElementById('content-area').innerHTML = renderProjectDetailPage(currentProject);
                updatePendingCount();
                showNotification('Project saved successfully!');
            } else {
                showNotification('Failed to save project. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Error saving project:', error);
            showNotification('Error saving project: ' + error.message, 'error');
        }
    }
}

// Utility functions
function calculateStats() {
    return {
        total: projectsData.length,
        inProgress: projectsData.filter(p => p.status === 'In Progress').length,
        completed: projectsData.filter(p => p.status === 'Completed').length,
        pending: projectsData.filter(p => p.status !== 'Completed' && p.status !== 'Cancelled').length
    };
}

function filterProjectsList() {
    return projectsData.filter(p => {
        // Search term filter
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            const matchesSearch = 
                p.name.toLowerCase().includes(term) ||
                p.client.toLowerCase().includes(term) ||
                p.jobNumber.toLowerCase().includes(term) ||
                p.assignee.toLowerCase().includes(term) ||
                p.projectType.toLowerCase().includes(term) ||
                p.salesPerson.toLowerCase().includes(term) ||
                p.designer.toLowerCase().includes(term) ||
                p.status.toLowerCase().includes(term) ||
                p.orderType.toLowerCase().includes(term) ||
                p.dueDate.includes(term) ||
                p.currentVersion.toLowerCase().includes(term);
            if (!matchesSearch) return false;
        }
        
        // Status filter
        if (filterStatus && p.status !== filterStatus) return false;
        
        // Order Type filter
        if (filterOrderType && p.orderType !== filterOrderType) return false;
        
        // Project Type filter
        if (filterProjectType && p.projectType !== filterProjectType) return false;
        
        // Sales Person filter
        if (filterSalesPerson && p.salesPerson !== filterSalesPerson) return false;
        
        // Designer filter
        if (filterDesigner && p.designer !== filterDesigner) return false;
        
        return true;
    });
}

function sortProjectsList(projects) {
    if (!sortColumn) return projects;
    
    return [...projects].sort((a, b) => {
        let aVal = a[sortColumn];
        let bVal = b[sortColumn];
        
        // Handle date sorting
        if (sortColumn === 'dueDate') {
            // Convert dd/mm/yyyy to comparable format
            const parseDate = (dateStr) => {
                const [day, month, year] = dateStr.split('/');
                return new Date(year, month - 1, day);
            };
            aVal = parseDate(aVal);
            bVal = parseDate(bVal);
        }
        
        // Handle version number sorting
        if (sortColumn === 'currentVersion') {
            aVal = parseInt(aVal.replace('V', '')) || 0;
            bVal = parseInt(bVal.replace('V', '')) || 0;
        }
        
        // String comparison
        if (typeof aVal === 'string') {
            aVal = aVal.toLowerCase();
            bVal = bVal.toLowerCase();
        }
        
        let comparison = 0;
        if (aVal > bVal) comparison = 1;
        if (aVal < bVal) comparison = -1;
        
        return sortDirection === 'asc' ? comparison : -comparison;
    });
}

function sortBy(column) {
    if (sortColumn === column) {
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        sortColumn = column;
        sortDirection = 'asc';
    }
    updateProjectsTable();
}

function toggleFilters() {
    const panel = document.getElementById('filtersPanel');
    if (panel) {
        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    }
}

function applyFilters() {
    filterStatus = document.getElementById('filterStatus')?.value || '';
    filterOrderType = document.getElementById('filterOrderType')?.value || '';
    filterProjectType = document.getElementById('filterProjectType')?.value || '';
    filterSalesPerson = document.getElementById('filterSalesPerson')?.value || '';
    filterDesigner = document.getElementById('filterDesigner')?.value || '';
    updateProjectsTable();
    // Update filter button text
    const filterBtn = document.getElementById('filterBtn');
    if (filterBtn) {
        const hasActiveFilters = filterStatus || filterOrderType || filterProjectType || filterSalesPerson || filterDesigner;
        filterBtn.innerHTML = hasActiveFilters ? '🔍 Filters Active' : '🔍 Filter';
    }
}

function clearAllFilters() {
    searchTerm = '';
    filterStatus = '';
    filterOrderType = '';
    filterProjectType = '';
    filterSalesPerson = '';
    filterDesigner = '';
    sortColumn = '';
    sortDirection = 'asc';
    showView('projects');
}

function updatePendingCount() {
    const count = projectsData.filter(p => 
        p.status !== 'Completed' && 
        p.status !== 'Cancelled' &&
        p.status !== 'Sent to Production'
    ).length;
    
    const badge = document.getElementById('pendingCount');
    if (badge) {
        badge.textContent = count;
    }
}

function attachProjectsEventListeners() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            searchTerm = e.target.value;
            updateProjectsTable();
        });
    }
}

function updateProjectsTable() {
    const filtered = filterProjectsList();
    const sorted = sortProjectsList(filtered);
    
    const tableContainer = document.querySelector('.table-container');
    if (!tableContainer) return;
    
    const getSortIcon = (column) => {
        if (sortColumn !== column) return '↕️';
        return sortDirection === 'asc' ? '↑' : '↓';
    };
    
    tableContainer.innerHTML = `
        <table class="projects-table">
            <thead>
                <tr>
                    <th class="sortable" onclick="sortBy('jobNumber')">
                        Job Number <span class="sort-icon">${getSortIcon('jobNumber')}</span>
                    </th>
                    <th class="sortable" onclick="sortBy('client')">
                        Client <span class="sort-icon">${getSortIcon('client')}</span>
                    </th>
                    <th class="sortable" onclick="sortBy('orderType')">
                        Order Type <span class="sort-icon">${getSortIcon('orderType')}</span>
                    </th>
                    <th class="sortable" onclick="sortBy('projectType')">
                        Task <span class="sort-icon">${getSortIcon('projectType')}</span>
                    </th>
                    <th class="sortable" onclick="sortBy('salesPerson')">
                        Sales Person <span class="sort-icon">${getSortIcon('salesPerson')}</span>
                    </th>
                    <th class="sortable" onclick="sortBy('designer')">
                        Designer <span class="sort-icon">${getSortIcon('designer')}</span>
                    </th>
                    <th class="sortable" onclick="sortBy('status')">
                        Status <span class="sort-icon">${getSortIcon('status')}</span>
                    </th>
                    <th class="sortable" onclick="sortBy('dueDate')">
                        Due Date <span class="sort-icon">${getSortIcon('dueDate')}</span>
                    </th>
                    <th class="sortable" onclick="sortBy('currentVersion')">
                        Current Version <span class="sort-icon">${getSortIcon('currentVersion')}</span>
                    </th>
                    <th class="sortable" onclick="sortBy('structuralCalcs')">
                        Calcs <span class="sort-icon">${getSortIcon('structuralCalcs')}</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                ${sorted.map(project => `
                    <tr onclick="showProjectDetail(${project.id})" style="cursor: pointer;">
                        <td class="project-name">${project.jobNumber}</td>
                        <td>${project.client}</td>
                        <td>${project.orderType}</td>
                        <td>
                            <span class="tasktype-badge ${getProjectTypeClass(project.projectType)}">
                                ${project.projectType}
                            </span>
                        </td>
                        <td>${project.salesPerson}</td>
                        <td>${project.designer}</td>
                        <td>
                            <span class="status-badge ${getStatusClass(project.status)}">
                                ${project.status}
                            </span>
                        </td>
                        <td>${project.dueDate}</td>
                        <td>${project.currentVersion}</td>
                        <td>
                            <span class="priority-badge ${project.structuralCalcs === 'Yes' ? 'priority-high' : 'priority-low'}">
                                ${project.structuralCalcs}
                            </span>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        ${sorted.length === 0 ? `
            <div class="no-results">
                <div class="empty-state-icon">📋</div>
                <div class="empty-state-title">No Projects Found</div>
                <div class="empty-state-text">Try adjusting your search criteria or create a new project</div>
            </div>
        ` : ''}
    `;
}

// Chart rendering functions for Reports Dashboard
function renderGaugeChart(value, max, color) {
    const percentage = (value / max) * 100;
    const rotation = (percentage / 100) * 180;
    return `
        <div style="margin-top: 16px; position: relative; width: 100%; height: 60px;">
            <svg width="100%" height="60" viewBox="0 0 200 100">
                <path d="M 20 80 A 80 80 0 0 1 180 80" fill="none" stroke="#e5e7eb" stroke-width="12" stroke-linecap="round"/>
                <path d="M 20 80 A 80 80 0 0 1 ${20 + Math.cos((180 - rotation) * Math.PI / 180) * 80} ${80 - Math.sin((180 - rotation) * Math.PI / 180) * 80}" 
                      fill="none" stroke="${color}" stroke-width="12" stroke-linecap="round"/>
                <text x="100" y="75" text-anchor="middle" font-size="24" font-weight="bold" fill="${color}">${value}%</text>
            </svg>
        </div>
    `;
}

function renderSparkline(data, color) {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const width = 100;
    const height = 30;
    const points = data.map((val, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((val - min) / range) * height;
        return `${x},${y}`;
    }).join(' ');
    
    return `
        <div style="margin-top: 12px;">
            <svg width="100%" height="30" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
                <polyline points="${points}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                ${data.map((val, i) => {
                    const x = (i / (data.length - 1)) * width;
                    const y = height - ((val - min) / range) * height;
                    return `<circle cx="${x}" cy="${y}" r="2" fill="${color}"/>`;
                }).join('')}
            </svg>
        </div>
    `;
}

function renderMiniBarChart(data, labels) {
    const max = Math.max(...data);
    return `
        <div style="margin-top: 12px; display: flex; align-items: flex-end; justify-content: space-around; height: 40px; gap: 4px;">
            ${data.map((val, i) => {
                const height = (val / max) * 100;
                return `
                    <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px;">
                        <div style="width: 100%; background: linear-gradient(180deg, #3b82f6 0%, #1e3a8a 100%); height: ${height}%; border-radius: 4px 4px 0 0; min-height: 2px;"></div>
                        <span style="font-size: 10px; color: #6b7280; white-space: nowrap;">${labels[i]}</span>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function renderDonutChart(data) {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = -90;
    const radius = 80;
    const centerX = 100;
    const centerY = 100;
    const strokeWidth = 30;
    
    const segments = data.map(item => {
        const percentage = (item.value / total) * 100;
        const angle = (percentage / 100) * 360;
        const startAngle = currentAngle;
        const endAngle = currentAngle + angle;
        
        const x1 = centerX + radius * Math.cos(startAngle * Math.PI / 180);
        const y1 = centerY + radius * Math.sin(startAngle * Math.PI / 180);
        const x2 = centerX + radius * Math.cos(endAngle * Math.PI / 180);
        const y2 = centerY + radius * Math.sin(endAngle * Math.PI / 180);
        
        const largeArc = angle > 180 ? 1 : 0;
        const path = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`;
        
        currentAngle = endAngle;
        
        return { ...item, path, percentage: percentage.toFixed(1) };
    });
    
    return `
        <div style="display: flex; align-items: center; gap: 24px;">
            <svg width="200" height="200" viewBox="0 0 200 200">
                <circle cx="${centerX}" cy="${centerY}" r="${radius + strokeWidth/2}" fill="none" stroke="#f3f4f6" stroke-width="${strokeWidth}"/>
                ${segments.map(seg => `
                    <path d="${seg.path}" fill="none" stroke="${seg.color}" stroke-width="${strokeWidth}" stroke-linecap="round"/>
                `).join('')}
                <circle cx="${centerX}" cy="${centerY}" r="40" fill="white"/>
                <text x="${centerX}" y="${centerY - 5}" text-anchor="middle" font-size="24" font-weight="bold" fill="#1f2937">${total}</text>
                <text x="${centerX}" y="${centerY + 15}" text-anchor="middle" font-size="12" fill="#6b7280">Total</text>
            </svg>
            <div style="flex: 1;">
                ${segments.map(seg => `
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                        <div style="width: 12px; height: 12px; border-radius: 2px; background: ${seg.color};"></div>
                        <span style="font-size: 14px; color: #1f2937; flex: 1;">${seg.label}</span>
                        <span style="font-size: 14px; font-weight: 600; color: #6b7280;">${seg.value} (${seg.percentage}%)</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderPieChart(data) {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    if (total === 0) return '<p style="text-align: center; color: #6b7280;">No data available</p>';
    
    let currentAngle = 0;
    const centerX = 100;
    const centerY = 100;
    const radius = 80;
    
    const slices = data.filter(item => item.value > 0).map(item => {
        const percentage = (item.value / total) * 100;
        const angle = (percentage / 100) * 360;
        const startAngle = currentAngle;
        const endAngle = currentAngle + angle;
        
        const x1 = centerX + radius * Math.cos(startAngle * Math.PI / 180);
        const y1 = centerY + radius * Math.sin(startAngle * Math.PI / 180);
        const x2 = centerX + radius * Math.cos(endAngle * Math.PI / 180);
        const y2 = centerY + radius * Math.sin(endAngle * Math.PI / 180);
        
        const largeArc = angle > 180 ? 1 : 0;
        const path = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
        
        currentAngle = endAngle;
        
        return { ...item, path, percentage: percentage.toFixed(1) };
    });
    
    return `
        <div style="display: flex; align-items: center; gap: 24px;">
            <svg width="200" height="200" viewBox="0 0 200 200">
                ${slices.map(slice => `
                    <path d="${slice.path}" fill="${slice.color}" opacity="0.9"/>
                `).join('')}
                <circle cx="${centerX}" cy="${centerY}" r="35" fill="white"/>
            </svg>
            <div style="flex: 1;">
                ${slices.map(slice => `
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                        <div style="width: 12px; height: 12px; border-radius: 2px; background: ${slice.color};"></div>
                        <span style="font-size: 14px; color: #1f2937; flex: 1;">${slice.label}</span>
                        <span style="font-size: 14px; font-weight: 600; color: #6b7280;">${slice.value} (${slice.percentage}%)</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderDynamicPieChart(dataObj, type) {
    const colorPalettes = {
        projectType: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899', '#06b6d4', '#f97316', '#a855f7'],
        orderType: ['#f59e0b', '#06b6d4', '#ec4899', '#8b5cf6', '#10b981', '#3b82f6', '#f97316', '#a855f7']
    };
    
    const colors = colorPalettes[type] || colorPalettes.projectType;
    
    // Filter out empty/null keys and convert to array format
    const data = Object.entries(dataObj)
        .filter(([key, value]) => key && key !== 'undefined' && value > 0)
        .map(([label, value], index) => ({
            label,
            value,
            color: colors[index % colors.length]
        }));
    
    if (data.length === 0) return '<p style="text-align: center; color: #6b7280;">No data available</p>';
    
    return renderPieChart(data);
}

function renderStackedBarChart(data, title) {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    const max = Math.max(...data.map(d => d.value));
    
    return `
        <div style="display: flex; flex-direction: column; gap: 12px;">
            ${data.map(item => {
                const percentage = (item.value / max) * 100;
                return `
                    <div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                            <span style="font-size: 14px; color: #1f2937; font-weight: 500;">${item.label}</span>
                            <span style="font-size: 14px; font-weight: 600; color: #6b7280;">£${item.value.toLocaleString()}</span>
                        </div>
                        <div style="width: 100%; background: #f3f4f6; height: 32px; border-radius: 6px; overflow: hidden;">
                            <div style="width: ${percentage}%; background: ${item.color}; height: 100%; transition: width 0.3s ease;">
                            </div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

// Date range filter functions
function refreshReportsWithDateRange() {
    const startDate = document.getElementById('reportStartDate')?.value || null;
    const endDate = document.getElementById('reportEndDate')?.value || null;
    
    // Update summary text
    const summary = document.getElementById('filterSummary');
    if (summary) {
        if (startDate && endDate) {
            const start = new Date(startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
            const end = new Date(endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
            summary.textContent = `Showing: ${start} - ${end}`;
        } else if (startDate) {
            const start = new Date(startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
            summary.textContent = `Showing: From ${start}`;
        } else if (endDate) {
            const end = new Date(endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
            summary.textContent = `Showing: Until ${end}`;
        } else {
            summary.textContent = 'Showing all time';
        }
    }
    
    // Recalculate stats with date range
    const stats = calculateDetailedStats(startDate, endDate);
    
    // Re-render the reports page with filtered data
    const reportsContainer = document.querySelector('.reports-page');
    if (reportsContainer) {
        document.getElementById('content-area').innerHTML = renderReportsPage();
        
        // Restore date inputs
        if (startDate) document.getElementById('reportStartDate').value = startDate;
        if (endDate) document.getElementById('reportEndDate').value = endDate;
        
        // Restore summary
        const newSummary = document.getElementById('filterSummary');
        if (newSummary && summary) {
            newSummary.textContent = summary.textContent;
        }
    }
}

function resetReportsDateRange() {
    document.getElementById('reportStartDate').value = '';
    document.getElementById('reportEndDate').value = new Date().toISOString().split('T')[0];
    refreshReportsWithDateRange();
}

// Helper functions
function getStatusClass(status) {
    const map = {
        'Requested': 'status-requested',
        'In Progress': 'status-in-progress',
        'Checking': 'status-checking',
        'With Client': 'status-with-client',
        'On Hold': 'status-on-hold',
        'Changing': 'status-changing',
        'Completed': 'status-completed',
        'Signed Off': 'status-signed-off',
        'Sent to Production': 'status-sent-production',
        'Cancelled': 'status-cancelled'
    };
    return map[status] || '';
}

function getStatusColor(status) {
    const colorMap = {
        'Requested': '#3b82f6',
        'In Progress': '#ef4444',
        'Checking': '#f59e0b',
        'With Client': '#8b5cf6',
        'On Hold': '#6b7280',
        'Changing': '#06b6d4',
        'Signed Off': '#10b981',
        'Sent to Production': '#059669',
        'Completed': '#22c55e',
        'Cancelled': '#9ca3af'
    };
    return colorMap[status] || '#3b82f6';
}

function getProjectTypeClass(projectType) {
    const map = {
        'Planning': 'tasktype-planning',
        'Visual': 'tasktype-visuals',
        'Order': 'tasktype-order'
    };
    return map[projectType] || '';
}

function getPriorityClass(priority) {
    const map = {
        'High': 'priority-high',
        'Medium': 'priority-medium',
        'Low': 'priority-low'
    };
    return map[priority] || '';
}

function getCalcsStatusClass(calcsStatus) {
    const map = {
        'Approved': 'status-completed',
        'In Review': 'status-changing',
        'Pending': 'status-requested',
        'Required': 'status-on-hold',
        'N/A': 'status-cancelled'
    };
    return map[calcsStatus] || '';
}

// Date formatting functions
function formatDateToDisplay(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function formatDateToInput(displayDate) {
    if (!displayDate) return '';
    const parts = displayDate.split('/');
    if (parts.length !== 3) return '';
    return `${parts[2]}-${parts[1]}-${parts[0]}`; // yyyy-mm-dd for input
}

function parseDate(displayDate) {
    if (!displayDate) return null;
    const parts = displayDate.split('/');
    if (parts.length !== 3) return null;
    // parts[0] = day, parts[1] = month, parts[2] = year
    return new Date(parts[2], parts[1] - 1, parts[0]);
}

// Time formatting functions
function formatTimeDisplay(minutes) {
    if (!minutes || minutes === 0) return '0h 0m';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
}

function getCurrentDateFormatted() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    return `${day}/${month}/${year}`;
}

function calculateSignOffLeadTime(orderDate, issuedToProduction) {
    if (!orderDate || !issuedToProduction) return 0;
    const requestedDate = parseDate(orderDate);
    const prodDate = parseDate(issuedToProduction);
    if (!requestedDate || !prodDate) return 0;
    const diffTime = Math.abs(prodDate - requestedDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

// Timer functions
let timerIntervals = {};

function startTimer(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;
    
    project.timerRunning = true;
    project.timerPaused = false;
    project.timerStartTime = Date.now();
    project.pausedTime = 0;
    
    // Save state
    saveTimerState();
    
    // Update UI
    document.getElementById('content-area').innerHTML = renderProjectDetailPage(project);
    
    // Start interval to update display
    timerIntervals[projectId] = setInterval(() => {
        updateTimerDisplay(projectId);
    }, 1000);
}

function pauseTimer(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project || !project.timerRunning) return;
    
    // Calculate elapsed time and add to paused time
    const elapsed = Date.now() - project.timerStartTime;
    project.pausedTime = (project.pausedTime || 0) + elapsed;
    
    project.timerRunning = false;
    project.timerPaused = true;
    project.timerStartTime = null;
    
    // Clear interval
    if (timerIntervals[projectId]) {
        clearInterval(timerIntervals[projectId]);
        delete timerIntervals[projectId];
    }
    
    // Save state
    saveTimerState();
    
    // Update UI
    document.getElementById('content-area').innerHTML = renderProjectDetailPage(project);
}

function resumeTimer(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project || !project.timerPaused) return;
    
    project.timerRunning = true;
    project.timerPaused = false;
    project.timerStartTime = Date.now();
    
    // Save state
    saveTimerState();
    
    // Update UI
    document.getElementById('content-area').innerHTML = renderProjectDetailPage(project);
    
    // Start interval to update display
    timerIntervals[projectId] = setInterval(() => {
        updateTimerDisplay(projectId);
    }, 1000);
}

async function stopTimer(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project || (!project.timerRunning && !project.timerPaused)) return;
    
    // Calculate total elapsed time
    let totalElapsed = project.pausedTime || 0;
    if (project.timerRunning) {
        totalElapsed += Date.now() - project.timerStartTime;
    }
    
    const minutes = Math.floor(totalElapsed / 60000);
    
    if (minutes > 0) {
        // Create time entry data for database
        const timeEntryData = {
            project_id: projectId,
            created_by: currentUser ? currentUser.id : null,
            date: formatDateToDB(getCurrentDateFormatted()),
            duration: minutes,
            type: 'auto',
            description: 'Timed work session',
            revision: project.currentVersion
        };
        
        try {
            // Save to database
            await SupabaseAPI.createTimeEntry(timeEntryData);
        } catch (error) {
            console.error('Error saving timer entry:', error);
            showNotification('Error saving timer entry: ' + error.message, 'error');
        }
    }
    
    project.timerRunning = false;
    project.timerPaused = false;
    project.timerStartTime = null;
    project.pausedTime = 0;
    
    // Clear interval
    if (timerIntervals[projectId]) {
        clearInterval(timerIntervals[projectId]);
        delete timerIntervals[projectId];
    }
    
    // Save state
    saveTimerState();
    
    // Reload project data to get updated time entries
    await loadProjectsFromDatabase();
    const updatedProject = projectsData.find(p => p.id === projectId);
    
    // Update UI
    if (updatedProject) {
        document.getElementById('content-area').innerHTML = renderProjectDetailPage(updatedProject);
    }
}

function updateTimerDisplay(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;
    
    let totalElapsed = project.pausedTime || 0;
    
    if (project.timerRunning) {
        totalElapsed += Date.now() - project.timerStartTime;
    }
    
    const seconds = Math.floor(totalElapsed / 1000);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    const display = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    
    const timerElement = document.getElementById(`timerDisplay-${projectId}`);
    if (timerElement) {
        if (project.timerPaused) {
            timerElement.textContent = display + ' (Paused)';
        } else {
            timerElement.textContent = display;
        }
    }
    
    // Save state periodically
    saveTimerState();
}

async function addManualTime(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;
    
    const durationInput = document.getElementById(`manualDuration-${projectId}`);
    const descriptionInput = document.getElementById(`manualDescription-${projectId}`);
    
    const duration = parseInt(durationInput.value);
    const description = descriptionInput.value.trim();
    
    if (!duration || duration <= 0) {
        showNotification('Please enter a valid duration in minutes', 'error');
        return;
    }
    
    if (!description) {
        showNotification('Please enter a description for this time entry', 'error');
        return;
    }
    
    // Create time entry data for database
    const timeEntryData = {
        project_id: projectId,
        created_by: currentUser ? currentUser.id : null,
        date: formatDateToDB(getCurrentDateFormatted()),
        duration: duration,
        type: 'manual',
        description: description,
        revision: null
    };
    
    try {
        // Save to database
        const saved = await SupabaseAPI.createTimeEntry(timeEntryData);
        
        if (saved) {
            // Reload project data to get updated time entries
            await loadProjectsFromDatabase();
            
            // Find the updated project
            const updatedProject = projectsData.find(p => p.id === projectId);
            if (updatedProject) {
                // Update UI
                document.getElementById('content-area').innerHTML = renderProjectDetailPage(updatedProject);
                showNotification('Time entry added successfully!');
            }
        } else {
            showNotification('Failed to add time entry. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Error adding time entry:', error);
        showNotification('Error adding time entry: ' + error.message, 'error');
    }
}

async function deleteTimeEntry(projectId, entryIndex) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project || !project.timeEntries) return;
    
    showConfirm('Are you sure you want to delete this time entry?', async () => {
        const entryToDelete = project.timeEntries[entryIndex];
        
        // The entry should have an id from the database
        if (!entryToDelete.id) {
            console.error('Time entry missing id:', entryToDelete);
            showNotification('Cannot delete time entry - missing ID', 'error');
            return;
        }
        
        try {
            // Delete from database
            await SupabaseAPI.deleteTimeEntry(entryToDelete.id);
            
            // Remove from local array immediately
            project.timeEntries.splice(entryIndex, 1);
            
            // Recalculate total time
            project.totalTimeMinutes = project.timeEntries.reduce((sum, te) => sum + te.duration, 0);
            
            // Update UI
            document.getElementById('content-area').innerHTML = renderProjectDetailPage(project);
            showNotification('Time entry deleted successfully!');
            
        } catch (error) {
            console.error('Error deleting time entry:', error);
            showNotification('Error deleting time entry: ' + error.message, 'error');
        }
    });
}

// Action functions
function addNewProject() {
    try {
        const newProject = {
            id: projectsData.length > 0 ? Math.max(...projectsData.map(p => p.id)) + 1 : 1,
            name: '',
            client: '',
            projectType: 'Planning',
            status: 'Requested',
            dueDate: '',
            startDate: new Date().toISOString().split('T')[0],
            assignee: '',
            priority: 'Medium',
            description: '',
            budget: '',
            progress: 0,
            notes: ''
        };
        
        projectsData.unshift(newProject);
        currentProject = newProject;
        isEditing = true;
        
        document.getElementById('content-area').innerHTML = renderNewProjectPage(newProject);
    } catch (error) {
        console.error('Error in addNewProject:', error);
        showNotification('Error creating new project: ' + error.message, 'error');
    }
}

function filterProjects() {
    showNotification('Filter feature coming soon!', 'info');
}

// Team Management Functions
function addTeamMember() {
    showAddTeamMemberModal();
}

function showAddTeamMemberModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content team-edit-modal">
            <div class="modal-header">
                <h2>Add New Team Member</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Full Name *</label>
                    <input type="text" id="addName" class="form-input" placeholder="Enter full name">
                </div>
                <div class="form-group">
                    <label>Username *</label>
                    <input type="text" id="addUsername" class="form-input" placeholder="Enter username">
                </div>
                <div class="form-group">
                    <label>Password *</label>
                    <input type="password" id="addPassword" class="form-input" placeholder="Enter password">
                </div>
                <div class="form-group">
                    <label>Role *</label>
                    <select id="addRole" class="form-input">
                        <option value="">Select a role</option>
                        <option value="Designer">Designer</option>
                        <option value="Senior Designer">Senior Designer</option>
                        <option value="Lead Designer">Lead Designer</option>
                        <option value="Sales">Sales</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Email *</label>
                    <input type="email" id="addEmail" class="form-input" placeholder="Enter email address">
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary add-member-cancel">Cancel</button>
                <button class="btn-primary add-member-save">Add Member</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Add event listeners
    const closeBtn = modal.querySelector('.modal-close');
    const cancelBtn = modal.querySelector('.add-member-cancel');
    const saveBtn = modal.querySelector('.add-member-save');
    
    const closeModal = () => modal.remove();
    
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    saveBtn.addEventListener('click', () => saveNewTeamMember(saveBtn));
    
    document.getElementById('addName').focus();
}

function saveNewTeamMember(buttonElement) {
    const name = document.getElementById('addName').value.trim();
    const username = document.getElementById('addUsername').value.trim();
    const password = document.getElementById('addPassword').value;
    const role = document.getElementById('addRole').value;
    const email = document.getElementById('addEmail').value.trim();
    
    if (!name || !username || !password || !role || !email) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Check if username already exists
    const existingUser = teamMembers.find(m => m.username === username);
    if (existingUser) {
        showNotification('Username already taken', 'error');
        return;
    }
    
    // Disable button to prevent double submission
    if (buttonElement) {
        buttonElement.disabled = true;
        buttonElement.textContent = 'Adding...';
    }
    
    // Save to database - password is now required to create the auth account
    const newUserData = {
        username: username,
        name: name,
        role: role,
        email: email,
        password: password // Required for Supabase Auth account creation
    };
    
    SupabaseAPI.createUser(newUserData)
        .then(user => {
            if (user) {
                // Add to local array with complete structure
                const newMember = {
                    id: user.id,
                    username: user.username,
                    password: password, // Keep locally for current session only
                    name: user.name,
                    role: user.role,
                    email: user.email,
                    active: true,
                    kpis: {
                        projectsCompleted: 0,
                        projectsInProgress: 0,
                        totalTimeLogged: 0,
                        averageCompletionTime: 0,
                        onTimeDelivery: 0
                    }
                };
                
                teamMembers.push(newMember);
                
                // Close modal
                const modalOverlay = document.querySelector('.modal-overlay');
                if (modalOverlay) {
                    modalOverlay.remove();
                }
                
                // Refresh team page if on team view
                if (currentView === 'team') {
                    document.getElementById('content-area').innerHTML = renderTeamPage();
                }
                
                showNotification('Team member added successfully!');
            } else {
                showNotification('Failed to add team member. Please try again.', 'error');
                // Re-enable button on failure
                if (buttonElement) {
                    buttonElement.disabled = false;
                    buttonElement.textContent = 'Add Member';
                }
            }
        })
        .catch(error => {
            console.error('Error adding team member:', error);
            // If error message contains newlines (detailed instructions), show in modal
            if (error.message && error.message.includes('\n')) {
                showError('Cannot Add Team Member', error.message);
            } else {
                showNotification('Error adding team member: ' + (error.message || 'Please try again'), 'error');
            }
            // Re-enable button on error
            if (buttonElement) {
                buttonElement.disabled = false;
                buttonElement.textContent = 'Add Member';
            }
        });
}

function editTeamMember(id) {
    const member = teamMembers.find(m => m.id === id);
    if (!member) return;
    
    showEditTeamMemberModal(member);
}

function showEditTeamMemberModal(member) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    
    // Escape HTML attributes to prevent XSS and syntax errors
    const escapeName = (member.name || '').replace(/"/g, '&quot;');
    const escapeUsername = (member.username || '').replace(/"/g, '&quot;');
    const escapeEmail = (member.email || '').replace(/"/g, '&quot;');
    
    modal.innerHTML = `
        <div class="modal-content team-edit-modal">
            <div class="modal-header">
                <h2>Edit Team Member</h2>
                <button class="modal-close" id="closeEditModal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Full Name</label>
                    <input type="text" id="editName" value="${escapeName}" class="form-input">
                </div>
                <div class="form-group">
                    <label>Username</label>
                    <input type="text" id="editUsername" value="${escapeUsername}" class="form-input" ${member.role === 'Admin' ? 'disabled' : ''}>
                    ${member.role === 'Admin' ? '<small style="color: #95a5a6; display: block; margin-top: 4px;">Admin username cannot be changed</small>' : ''}
                </div>
                <div class="form-group">
                    <label>Role</label>
                    <select id="editRole" class="form-input">
                        <option value="Designer" ${member.role === 'Designer' ? 'selected' : ''}>Designer</option>
                        <option value="Senior Designer" ${member.role === 'Senior Designer' ? 'selected' : ''}>Senior Designer</option>
                        <option value="Lead Designer" ${member.role === 'Lead Designer' ? 'selected' : ''}>Lead Designer</option>
                        <option value="Sales" ${member.role === 'Sales' ? 'selected' : ''}>Sales</option>
                        <option value="Admin" ${member.role === 'Admin' ? 'selected' : ''}>Admin</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" id="editEmail" value="${escapeEmail}" class="form-input">
                </div>
                <div class="form-group">
                    <label>New Password <small style="color: #95a5a6;">(leave blank to keep current)</small></label>
                    <input type="password" id="editPassword" placeholder="Enter new password" class="form-input">
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary" id="cancelEditModal">Cancel</button>
                <button class="btn-primary" id="saveEditModal">Save Changes</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Attach event listeners
    document.getElementById('closeEditModal').addEventListener('click', () => modal.remove());
    document.getElementById('cancelEditModal').addEventListener('click', () => modal.remove());
    document.getElementById('saveEditModal').addEventListener('click', () => saveTeamMemberEdit(member.id));
    
    document.getElementById('editName').focus();
}

async function saveTeamMemberEdit(memberId) {
    const member = teamMembers.find(m => m.id === memberId);
    
    if (!member) {
        console.error('Member not found in teamMembers array. Available IDs:', teamMembers.map(m => m.id));
        showNotification('Team member not found', 'error');
        return;
    }
    
    const newName = document.getElementById('editName').value.trim();
    const newUsername = document.getElementById('editUsername').value.trim();
    const newRole = document.getElementById('editRole').value;
    const newEmail = document.getElementById('editEmail').value.trim();
    const newPassword = document.getElementById('editPassword').value;
    
    if (!newName || !newUsername || !newEmail) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Check if username is already taken by another user
    if (newUsername !== member.username) {
        const existingUser = teamMembers.find(m => m.username === newUsername && m.id !== memberId);
        if (existingUser) {
            alert('Username already taken');
            return;
        }
    }
    
    // Build updates object
    const updates = {
        name: newName,
        role: newRole,
        email: newEmail
    };
    
    // Only update username if not admin
    if (member.role !== 'Admin') {
        updates.username = newUsername;
    }
    
    
    try {
        // Save to database
        const updated = await SupabaseAPI.updateUser(memberId, updates);
        
        if (updated) {
            // Reload team members from database
            await loadTeamMembersFromDatabase();
            
            // Update currentUser if editing own profile
            if (currentUser && currentUser.id === memberId) {
                currentUser = teamMembers.find(m => m.id === memberId);
                if (currentUser) {
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                    updateSidebarUser();
                }
            }
            
            // Close modal
            const modalOverlay = document.querySelector('.modal-overlay');
            if (modalOverlay) {
                modalOverlay.remove();
            }
            
            // Refresh team page if on team view
            if (currentView === 'team') {
                document.getElementById('content-area').innerHTML = renderTeamPage();
            }
            
            showNotification('Team member updated successfully!');
        } else {
            showNotification('Failed to update team member. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Error updating team member:', error);
        showNotification('Error updating team member: ' + error.message, 'error');
    }
}

async function toggleMemberStatus(id) {
    const member = teamMembers.find(m => m.id === id);
    if (!member) return;
    
    const newStatus = !member.active;
    
    try {
        // Update in database
        const updated = await SupabaseAPI.updateUser(id, { active: newStatus });
        
        if (updated) {
            // Reload team members
            await loadTeamMembersFromDatabase();
            showView('team');
            showNotification(`Team member ${newStatus ? 'activated' : 'deactivated'} successfully!`);
        } else {
            showNotification('Failed to update status. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Error updating member status:', error);
        showNotification('Error updating status: ' + error.message, 'error');
    }
}

async function deleteTeamMember(id) {
    const member = teamMembers.find(m => m.id === id);
    if (!member) return;
    
    // Prevent deleting admin
    if (member.role === 'Admin') {
        showNotification('Cannot delete administrator account', 'error');
        return;
    }
    
    // Check if member has projects assigned
    const assignedProjects = projectsData.filter(p => 
        p.designer === member.name || p.salesPerson === member.name
    );
    
    const warningMessage = assignedProjects.length > 0 
        ? `${member.name} has ${assignedProjects.length} project(s) assigned. Deleting this user will orphan these projects.\n\nAre you sure you want to permanently delete this team member?`
        : `Are you sure you want to permanently delete ${member.name}?\n\nThis action cannot be undone. Consider deactivating instead.`;
    
    showConfirm(
        warningMessage,
        async () => {
            try {
                // Delete from database
                const deleted = await SupabaseAPI.deleteUser(id);
                
                if (deleted) {
                    // Remove from local array
                    const index = teamMembers.findIndex(m => m.id === id);
                    if (index > -1) {
                        teamMembers.splice(index, 1);
                    }
                    
                    // Refresh team page
                    showView('team');
                    showNotification('Team member deleted successfully!');
                } else {
                    showNotification('Failed to delete team member. Please try again.', 'error');
                }
            } catch (error) {
                console.error('Error deleting team member:', error);
                showNotification('Error deleting team member: ' + error.message, 'error');
            }
        },
        () => {
            // User cancelled - do nothing
        }
    );
}

function updateUserKPIs() {
    // Calculate KPIs for all team members based on their role
    teamMembers.forEach(member => {
        // Designer role KPIs - based on designer field
        if (['Designer', 'Senior Designer', 'Lead Designer'].includes(member.role)) {
            // Projects completed by this designer
            const completed = projectsData.filter(p => 
                p.designer === member.name && p.status === 'Completed'
            ).length;
            
            // Projects in progress by this designer
            const inProgress = projectsData.filter(p => 
                p.designer === member.name && 
                p.status !== 'Completed' && 
                p.status !== 'Cancelled'
            ).length;
            
            // Total time logged by this designer
            const totalTime = projectsData
                .filter(p => p.designer === member.name)
                .reduce((sum, p) => sum + (p.totalTimeMinutes || 0), 0);
            
            // Update KPIs
            member.kpis.projectsCompleted = completed;
            member.kpis.projectsInProgress = inProgress;
            member.kpis.totalTimeLogged = totalTime;
            
            // Calculate average completion time (in days)
            const completedProjects = projectsData.filter(p => 
                p.designer === member.name && p.status === 'Completed' && p.orderDate && p.issuedToProduction
            );
            
            if (completedProjects.length > 0) {
                const totalDays = completedProjects.reduce((sum, p) => {
                    const start = parseDate(p.orderDate);
                    const end = parseDate(p.issuedToProduction);
                    if (start && end) {
                        return sum + Math.ceil((end - start) / (1000 * 60 * 60 * 24));
                    }
                    return sum;
                }, 0);
                member.kpis.averageCompletionTime = Math.round(totalDays / completedProjects.length);
            }
            
            // Calculate on-time delivery percentage
            const projectsWithDueDate = projectsData.filter(p => 
                p.designer === member.name && 
                p.status === 'Completed' && 
                p.dueDate && 
                p.issuedToProduction
            );
            
            if (projectsWithDueDate.length > 0) {
                const onTime = projectsWithDueDate.filter(p => {
                    const due = parseDate(p.dueDate);
                    const completed = parseDate(p.issuedToProduction);
                    return completed <= due;
                }).length;
                member.kpis.onTimeDelivery = Math.round((onTime / projectsWithDueDate.length) * 100);
            }
        } 
        // Sales role KPIs - based on salesPerson field
        else if (member.role === 'Sales') {
            // Projects sold (completed) by this sales person
            const completed = projectsData.filter(p => 
                p.salesPerson === member.name && p.status === 'Completed'
            ).length;
            
            // Projects in progress for this sales person
            const inProgress = projectsData.filter(p => 
                p.salesPerson === member.name && 
                p.status !== 'Completed' && 
                p.status !== 'Cancelled'
            ).length;
            
            // Total revenue from completed projects
            const totalRevenue = projectsData
                .filter(p => p.salesPerson === member.name && p.status === 'Completed')
                .reduce((sum, p) => sum + (parseFloat(p.saleValue) || 0), 0);
            
            // Update KPIs (reusing same fields for consistency)
            member.kpis.projectsCompleted = completed;
            member.kpis.projectsInProgress = inProgress;
            member.kpis.totalTimeLogged = totalRevenue; // Repurpose for revenue
            
            // Calculate average project value
            if (completed > 0) {
                member.kpis.averageCompletionTime = Math.round(totalRevenue / completed);
            }
            
            // Calculate conversion rate (completed / total)
            const totalProjects = projectsData.filter(p => p.salesPerson === member.name).length;
            if (totalProjects > 0) {
                member.kpis.onTimeDelivery = Math.round((completed / totalProjects) * 100);
            }
        }
        // Admin role - no KPIs calculated
        else if (member.role === 'Admin') {
            member.kpis.projectsCompleted = 0;
            member.kpis.projectsInProgress = 0;
            member.kpis.totalTimeLogged = 0;
            member.kpis.averageCompletionTime = 0;
            member.kpis.onTimeDelivery = 0;
        }
    });
}

// =====================================================
// KPI Breakdown Modal
// =====================================================
function showKPIBreakdown(kpiType) {
    const stats = calculateDetailedStats();
    let title = '';
    let content = '';
    
    switch(kpiType) {
        case 'briefQuality':
            title = '📋 Brief Quality Score Breakdown';
            const goodBriefs = projectsData.filter(p => {
                const changes = parseInt(p.totalChanges) || 0;
                return changes <= 1 && p.currentVersion === 'Rev 1';
            }).length;
            const fairBriefs = projectsData.filter(p => {
                const changes = parseInt(p.totalChanges) || 0;
                return changes === 2 || changes === 3;
            }).length;
            const poorBriefs = projectsData.filter(p => {
                const changes = parseInt(p.totalChanges) || 0;
                return changes > 3;
            }).length;
            
            content = `
                <div style="margin-bottom: 24px;">
                    <div style="font-size: 48px; font-weight: 700; color: #f59e0b; text-align: center;">${stats.briefQualityScore}%</div>
                    <div style="text-align: center; color: #6b7280; margin-top: 8px;">Overall Brief Quality Score</div>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px;">
                    <div style="padding: 16px; background: #d1fae5; border-radius: 12px; text-align: center;">
                        <div style="font-size: 32px; font-weight: 700; color: #059669;">${goodBriefs}</div>
                        <div style="font-size: 14px; color: #065f46; margin-top: 4px;">✅ Good Quality</div>
                        <div style="font-size: 12px; color: #6b7280; margin-top: 4px;">0-1 changes</div>
                    </div>
                    <div style="padding: 16px; background: #fef3c7; border-radius: 12px; text-align: center;">
                        <div style="font-size: 32px; font-weight: 700; color: #d97706;">${fairBriefs}</div>
                        <div style="font-size: 14px; color: #92400e; margin-top: 4px;">📋 Fair Quality</div>
                        <div style="font-size: 12px; color: #6b7280; margin-top: 4px;">2-3 changes</div>
                    </div>
                    <div style="padding: 16px; background: #fee2e2; border-radius: 12px; text-align: center;">
                        <div style="font-size: 32px; font-weight: 700; color: #dc2626;">${poorBriefs}</div>
                        <div style="font-size: 14px; color: #991b1b; margin-top: 4px;">⚠️ Poor Quality</div>
                        <div style="font-size: 12px; color: #6b7280; margin-top: 4px;">4+ changes</div>
                    </div>
                </div>
                
                <div style="background: #f9fafb; padding: 16px; border-radius: 12px;">
                    <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #1f2937;">Projects Needing Most Improvement:</h4>
                    <div style="max-height: 200px; overflow-y: auto;">
                        ${projectsData
                            .filter(p => (parseInt(p.totalChanges) || 0) > 3)
                            .sort((a, b) => (parseInt(b.totalChanges) || 0) - (parseInt(a.totalChanges) || 0))
                            .slice(0, 10)
                            .map(p => `
                                <div style="display: flex; justify-content: space-between; padding: 8px; border-bottom: 1px solid #e5e7eb; cursor: pointer; transition: background 0.2s;" onclick="showProjectDetail('${p.id}'); closeModal();" onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='transparent'">
                                    <span style="font-size: 14px; color: #374151;">${p.jobNumber} - ${p.client}</span>
                                    <span style="font-size: 14px; font-weight: 600; color: #dc2626;">${p.totalChanges} changes</span>
                                </div>
                            `).join('') || '<div style="padding: 12px; text-align: center; color: #6b7280;">No projects found</div>'}
                    </div>
                </div>
            `;
            break;
            
        case 'clientChanges':
            title = '📝 Projects with Client Changes';
            const changesData = projectsData.filter(p => (parseInt(p.totalChanges) || 0) > 0);
            content = `
                <div style="margin-bottom: 24px;">
                    <div style="font-size: 48px; font-weight: 700; color: #f59e0b; text-align: center;">${stats.projectsWithClientChanges}</div>
                    <div style="text-align: center; color: #6b7280; margin-top: 8px;">Projects with Client Changes</div>
                    <div style="text-align: center; color: #3b82f6; font-size: 14px; margin-top: 4px;">${((stats.projectsWithClientChanges/stats.total)*100).toFixed(1)}% of total projects</div>
                </div>
                
                <div style="background: #f9fafb; padding: 16px; border-radius: 12px; margin-bottom: 16px;">
                    <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #1f2937;">All Projects with Changes (${changesData.length}):</h4>
                    <div style="max-height: 400px; overflow-y: auto;">
                        ${changesData
                            .sort((a, b) => (parseInt(b.totalChanges) || 0) - (parseInt(a.totalChanges) || 0))
                            .map(p => `
                                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; border-bottom: 1px solid #e5e7eb; cursor: pointer; transition: background 0.2s;" onclick="showProjectDetail('${p.id}'); closeModal();" onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='transparent'">
                                    <div>
                                        <div style="font-size: 14px; font-weight: 600; color: #374151;">${p.jobNumber} - ${p.client}</div>
                                        <div style="font-size: 12px; color: #6b7280; margin-top: 2px;">Designer: ${p.designer} | Status: ${p.status}</div>
                                    </div>
                                    <div style="text-align: right;">
                                        <div style="font-size: 16px; font-weight: 700; color: ${parseInt(p.totalChanges) > 3 ? '#dc2626' : '#f59e0b'};">${p.totalChanges}</div>
                                        <div style="font-size: 11px; color: #6b7280;">changes</div>
                                    </div>
                                </div>
                            `).join('')}
                    </div>
                </div>
            `;
            break;
            
        case 'avgChanges':
            title = '📊 Average Changes per Project';
            const changeDistribution = {
                '0': projectsData.filter(p => (parseInt(p.totalChanges) || 0) === 0).length,
                '1': projectsData.filter(p => parseInt(p.totalChanges) === 1).length,
                '2-3': projectsData.filter(p => {
                    const changes = parseInt(p.totalChanges) || 0;
                    return changes >= 2 && changes <= 3;
                }).length,
                '4-5': projectsData.filter(p => {
                    const changes = parseInt(p.totalChanges) || 0;
                    return changes >= 4 && changes <= 5;
                }).length,
                '6+': projectsData.filter(p => (parseInt(p.totalChanges) || 0) >= 6).length
            };
            
            content = `
                <div style="margin-bottom: 24px;">
                    <div style="font-size: 48px; font-weight: 700; color: #f59e0b; text-align: center;">${stats.avgClientChangesPerProject}</div>
                    <div style="text-align: center; color: #6b7280; margin-top: 8px;">Average Changes per Project</div>
                </div>
                
                <div style="background: #f9fafb; padding: 16px; border-radius: 12px; margin-bottom: 16px;">
                    <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #1f2937;">Change Distribution:</h4>
                    ${Object.entries(changeDistribution).map(([range, count]) => `
                        <div style="display: flex; align-items: center; margin-bottom: 12px;">
                            <div style="width: 80px; font-size: 13px; color: #6b7280;">${range} changes</div>
                            <div style="flex: 1; margin: 0 12px;">
                                <div style="background: #e5e7eb; height: 24px; border-radius: 4px; overflow: hidden;">
                                    <div style="background: linear-gradient(90deg, #f59e0b, #d97706); height: 100%; width: ${(count/stats.total*100).toFixed(0)}%; display: flex; align-items: center; justify-content: center; font-size: 11px; color: white; font-weight: 600;">
                                        ${count > 0 ? count : ''}
                                    </div>
                                </div>
                            </div>
                            <div style="width: 60px; text-align: right; font-size: 13px; font-weight: 600; color: #374151;">${count} (${(count/stats.total*100).toFixed(0)}%)</div>
                        </div>
                    `).join('')}
                </div>
                
                <div style="background: #fef3c7; padding: 16px; border-radius: 12px;">
                    <h4 style="margin: 0 0 8px 0; font-size: 14px; color: #92400e;">💡 Insight:</h4>
                    <p style="margin: 0; font-size: 13px; color: #78350f; line-height: 1.5;">
                        ${stats.avgClientChangesPerProject < 2 
                            ? 'Excellent! Your team has a strong first-time-right rate. Keep up the good work!' 
                            : stats.avgClientChangesPerProject < 3.5 
                            ? 'Good performance, but there\'s room for improvement in upfront planning and communication.' 
                            : 'Consider improving brief quality and client communication to reduce revision cycles.'}
                    </p>
                </div>
            `;
            break;
            
        case 'firstTimeRight':
            title = '✅ First-Time-Right Rate';
            const firstTimeRight = projectsData.filter(p => {
                const changes = parseInt(p.totalChanges) || 0;
                return changes === 0 && p.currentVersion === 'Rev 1';
            });
            const needsRevision = projectsData.filter(p => (parseInt(p.totalChanges) || 0) > 0);
            
            content = `
                <div style="margin-bottom: 24px;">
                    <div style="font-size: 48px; font-weight: 700; color: #10b981; text-align: center;">${stats.firstTimeRightRate}%</div>
                    <div style="text-align: center; color: #6b7280; margin-top: 8px;">Projects Delivered Right First Time</div>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 24px;">
                    <div style="padding: 20px; background: #d1fae5; border-radius: 12px; text-align: center;">
                        <div style="font-size: 36px; font-weight: 700; color: #059669;">${firstTimeRight.length}</div>
                        <div style="font-size: 14px; color: #065f46; margin-top: 4px;">✅ First-Time-Right</div>
                        <div style="font-size: 12px; color: #6b7280; margin-top: 4px;">No revisions needed</div>
                    </div>
                    <div style="padding: 20px; background: #fee2e2; border-radius: 12px; text-align: center;">
                        <div style="font-size: 36px; font-weight: 700; color: #dc2626;">${needsRevision.length}</div>
                        <div style="font-size: 14px; color: #991b1b; margin-top: 4px;">❌ Needs Revision</div>
                        <div style="font-size: 12px; color: #6b7280; margin-top: 4px;">Required changes</div>
                    </div>
                </div>
                
                <div style="background: #f9fafb; padding: 16px; border-radius: 12px;">
                    <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #1f2937;">✅ Perfect Projects (First-Time-Right):</h4>
                    <div style="max-height: 250px; overflow-y: auto;">
                        ${firstTimeRight.slice(0, 20).map(p => `
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; border-bottom: 1px solid #e5e7eb; cursor: pointer; transition: background 0.2s;" onclick="showProjectDetail('${p.id}'); closeModal();" onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='transparent'">
                                <div>
                                    <div style="font-size: 14px; font-weight: 600; color: #374151;">${p.jobNumber} - ${p.client}</div>
                                    <div style="font-size: 12px; color: #6b7280; margin-top: 2px;">Designer: ${p.designer}</div>
                                </div>
                                <span style="font-size: 20px;">✅</span>
                            </div>
                        `).join('') || '<div style="padding: 12px; text-align: center; color: #6b7280;">No first-time-right projects yet</div>'}
                    </div>
                </div>
            `;
            break;
            
        case 'designers':
            title = '👥 Active Designers Breakdown';
            const designers = [...new Set(projectsData.map(p => p.designer))].filter(d => d);
            const designerDetails = designers.map(name => {
                const projects = projectsData.filter(p => p.designer === name && p.status !== 'Completed' && p.status !== 'Cancelled');
                const completed = projectsData.filter(p => p.designer === name && p.status === 'Completed').length;
                return { name, active: projects.length, completed, projects };
            }).sort((a, b) => b.active - a.active);
            
            content = `
                <div style="margin-bottom: 24px;">
                    <div style="font-size: 48px; font-weight: 700; color: #3b82f6; text-align: center;">${stats.activeDesigners}</div>
                    <div style="text-align: center; color: #6b7280; margin-top: 8px;">Active Designers with Projects</div>
                    <div style="text-align: center; color: #374151; font-size: 14px; margin-top: 4px;">${stats.totalTeamMembers} total team members</div>
                </div>
                
                <div style="background: #f9fafb; padding: 16px; border-radius: 12px; margin-bottom: 16px;">
                    <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #1f2937;">Workload by Designer:</h4>
                    <div style="max-height: 400px; overflow-y: auto;">
                        ${designerDetails.map(d => {
                            const workloadColor = d.active > 8 ? '#dc2626' : d.active > 5 ? '#f59e0b' : '#10b981';
                            const workloadLabel = d.active > 8 ? 'Heavy' : d.active > 5 ? 'Moderate' : 'Light';
                            return `
                                <div style="padding: 16px; border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between; align-items: center;">
                                    <div style="flex: 1;">
                                        <div style="font-size: 15px; font-weight: 600; color: #374151; margin-bottom: 8px;">👤 ${d.name}</div>
                                        <div style="display: flex; gap: 16px; font-size: 13px; color: #6b7280;">
                                            <span>Active: <strong style="color: ${workloadColor};">${d.active}</strong></span>
                                            <span>Completed: <strong style="color: #10b981;">${d.completed}</strong></span>
                                            <span style="padding: 2px 8px; background: ${workloadColor}20; color: ${workloadColor}; border-radius: 4px; font-weight: 600;">${workloadLabel}</span>
                                        </div>
                                        <div style="margin-top: 8px; background: #e5e7eb; height: 6px; border-radius: 3px;">
                                            <div style="background: ${workloadColor}; height: 6px; border-radius: 3px; width: ${Math.min((d.active / 15 * 100), 100)}%;"></div>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
            break;
            
        case 'workload':
            title = '📊 Workload Distribution';
            const workloadDesigners = [...new Set(projectsData.map(p => p.designer))].filter(d => d);
            const workloadData = workloadDesigners.map(name => {
                const activeProjects = projectsData.filter(p => p.designer === name && p.status !== 'Completed' && p.status !== 'Cancelled');
                return { 
                    name, 
                    count: activeProjects.length, 
                    projects: activeProjects,
                    inProgress: activeProjects.filter(p => p.status === 'In Progress').length,
                    checking: activeProjects.filter(p => p.status === 'Checking').length,
                    withClient: activeProjects.filter(p => p.status === 'With Client').length
                };
            }).sort((a, b) => b.count - a.count);
            
            const totalActiveProjects = workloadData.reduce((sum, d) => sum + d.count, 0);
            
            content = `
                <div style="margin-bottom: 24px;">
                    <div style="font-size: 48px; font-weight: 700; color: #3b82f6; text-align: center;">${stats.avgProjectsPerDesigner}</div>
                    <div style="text-align: center; color: #6b7280; margin-top: 8px;">Average Projects per Designer</div>
                    <div style="text-align: center; color: #374151; font-size: 14px; margin-top: 4px;">${totalActiveProjects} total active projects</div>
                </div>
                
                <div style="background: #f9fafb; padding: 16px; border-radius: 12px;">
                    <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #1f2937;">Detailed Workload Breakdown:</h4>
                    <div style="max-height: 400px; overflow-y: auto;">
                        ${workloadData.map(d => `
                            <div style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                                    <span style="font-size: 15px; font-weight: 600; color: #374151;">👤 ${d.name}</span>
                                    <span style="font-size: 20px; font-weight: 700; color: #3b82f6;">${d.count}</span>
                                </div>
                                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                                    ${d.inProgress > 0 ? `<span style="padding: 4px 10px; background: #dbeafe; color: #1e40af; border-radius: 6px; font-size: 12px;">In Progress: ${d.inProgress}</span>` : ''}
                                    ${d.checking > 0 ? `<span style="padding: 4px 10px; background: #fef3c7; color: #92400e; border-radius: 6px; font-size: 12px;">Checking: ${d.checking}</span>` : ''}
                                    ${d.withClient > 0 ? `<span style="padding: 4px 10px; background: #fce7f3; color: #9f1239; border-radius: 6px; font-size: 12px;">With Client: ${d.withClient}</span>` : ''}
                                </div>
                                <div style="margin-top: 12px; display: flex; flex-direction: column; gap: 6px;">
                                    ${d.projects.slice(0, 3).map(p => `
                                        <div style="padding: 8px; background: white; border-radius: 6px; font-size: 12px; cursor: pointer; transition: background 0.2s;" onclick="showProjectDetail('${p.id}'); closeModal();" onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='white'">
                                            <strong>${p.jobNumber}</strong> - ${p.client}
                                            <span style="float: right; padding: 2px 6px; background: ${getStatusColor(p.status)}20; color: ${getStatusColor(p.status)}; border-radius: 4px; font-size: 10px;">${p.status}</span>
                                        </div>
                                    `).join('')}
                                    ${d.projects.length > 3 ? `<div style="font-size: 11px; color: #6b7280; text-align: center; padding: 4px;">+ ${d.projects.length - 3} more projects</div>` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            break;
        
        case 'daysWithClient':
            title = '⏱️ Days "With Client" Analysis';
            const withClientProjects = projectsData.filter(p => p.status === 'With Client' || p.clientReviewSentDate);
            content = `
                <div style="margin-bottom: 24px;">
                    <div style="font-size: 48px; font-weight: 700; color: #f59e0b; text-align: center;">${stats.avgDaysInWithClient}d</div>
                    <div style="text-align: center; color: #6b7280; margin-top: 8px;">Average Days in "With Client" Status</div>
                </div>
                <div style="background: #f9fafb; padding: 16px; border-radius: 12px;">
                    <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #1f2937;">Projects Currently With Client (${withClientProjects.length}):</h4>
                    <div style="max-height: 400px; overflow-y: auto;">
                        ${withClientProjects.map(p => `
                            <div style="padding: 12px; border-bottom: 1px solid #e5e7eb; cursor: pointer;" onclick="showProjectDetail('${p.id}'); closeModal();" onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='transparent'">
                                <div style="font-size: 14px; font-weight: 600; color: #374151;">${p.jobNumber} - ${p.client}</div>
                                <div style="font-size: 12px; color: #6b7280; margin-top: 4px;">Designer: ${p.designer}</div>
                            </div>
                        `).join('') || '<div style="padding: 12px; text-align: center; color: #6b7280;">No projects currently with client</div>'}
                    </div>
                </div>
            `;
            break;
        
        case 'rework':
            title = '🔄 Projects Requiring Rework';
            const reworkProjects = projectsData.filter(p => (parseInt(p.totalChanges) || 0) > 2);
            content = `
                <div style="margin-bottom: 24px;">
                    <div style="font-size: 48px; font-weight: 700; color: #dc2626; text-align: center;">${stats.projectsRequiringRework}</div>
                    <div style="text-align: center; color: #6b7280; margin-top: 8px;">Projects Requiring Rework</div>
                    <div style="text-align: center; color: #374151; font-size: 14px; margin-top: 4px;">${((stats.projectsRequiringRework/stats.total)*100).toFixed(1)}% rework rate</div>
                </div>
                <div style="background: #f9fafb; padding: 16px; border-radius: 12px;">
                    <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #1f2937;">All Projects Requiring Rework:</h4>
                    <div style="max-height: 400px; overflow-y: auto;">
                        ${reworkProjects.map(p => `
                            <div style="padding: 12px; border-bottom: 1px solid #e5e7eb; cursor: pointer; display: flex; justify-content: space-between; align-items: center;" onclick="showProjectDetail('${p.id}'); closeModal();" onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='transparent'">
                                <div>
                                    <div style="font-size: 14px; font-weight: 600; color: #374151;">${p.jobNumber} - ${p.client}</div>
                                    <div style="font-size: 12px; color: #6b7280; margin-top: 2px;">Designer: ${p.designer}</div>
                                </div>
                                <span style="font-size: 14px; font-weight: 700; color: #dc2626;">${p.totalChanges} revisions</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            break;
        
        case 'revisions':
        case 'revisionTime':
            title = '🔄 Revision Analysis';
            content = `
                <div style="margin-bottom: 24px;">
                    <div style="font-size: 48px; font-weight: 700; color: #f59e0b; text-align: center;">${stats.avgRevisionsBeforeSignOff}</div>
                    <div style="text-align: center; color: #6b7280; margin-top: 8px;">Average Revisions Before Sign-Off</div>
                </div>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 24px;">
                    <div style="padding: 20px; background: #dbeafe; border-radius: 12px; text-align: center;">
                        <div style="font-size: 32px; font-weight: 700; color: #3b82f6;">${stats.rev1TimeHours}h</div>
                        <div style="font-size: 14px; color: #1e40af;">Initial Version Time</div>
                    </div>
                    <div style="padding: 20px; background: #fef3c7; border-radius: 12px; text-align: center;">
                        <div style="font-size: 32px; font-weight: 700; color: #f59e0b;">${stats.subsequentRevTimeHours}h</div>
                        <div style="font-size: 14px; color: #92400e;">Revision Time</div>
                    </div>
                </div>
                <div style="background: #fee2e2; padding: 16px; border-radius: 12px;">
                    <h4 style="margin: 0 0 8px 0; font-size: 14px; color: #991b1b;">⚠️ Impact:</h4>
                    <p style="margin: 0; font-size: 13px; color: #7f1d1d;">
                        Revisions add ${stats.revisionTimeRatio > 0 ? (stats.revisionTimeRatio * 100).toFixed(0) : 0}% extra time to projects.
                        Improving first-time-right rate could save significant hours.
                    </p>
                </div>
            `;
            break;
        
        case 'timeLogged':
        case 'daysToFirstIssue':
        case 'daysToComplete':
            title = kpiType === 'timeLogged' ? '⏱️ Time Logged Analysis' : 
                    kpiType === 'daysToFirstIssue' ? '🚀 Days to First Issue' : 
                    '✅ Days to Complete';
            const value = kpiType === 'timeLogged' ? `${stats.avgTimePerDesigner}h` : 
                         kpiType === 'daysToFirstIssue' ? `${stats.avgDaysToFirstIssue}d` : 
                         `${stats.avgDaysToComplete}d`;
            content = `
                <div style="margin-bottom: 24px;">
                    <div style="font-size: 48px; font-weight: 700; color: #3b82f6; text-align: center;">${value}</div>
                    <div style="text-align: center; color: #6b7280; margin-top: 8px;">${title.replace(/[🚀⏱️✅]/g, '').trim()}</div>
                </div>
                <div style="background: #f9fafb; padding: 16px; border-radius: 12px;">
                    <p style="margin: 0; font-size: 14px; color: #374151;">Detailed breakdown coming soon. Use the Projects page to drill down into specific project timelines.</p>
                </div>
            `;
            break;
        
        case 'signedOff':
        case 'sentToProduction':
            title = kpiType === 'signedOff' ? '✅ Signed Off Projects' : '🏭 Sent to Production';
            const filteredProjects = kpiType === 'signedOff' ? 
                projectsData.filter(p => p.status === 'Signed Off') :
                projectsData.filter(p => p.issuedToProduction);
            const totalValue = kpiType === 'signedOff' ? stats.signedOffValue : stats.sentToProductionValue;
            const totalVolume = kpiType === 'signedOff' ? stats.signedOffVolume : stats.sentToProductionVolume;
            content = `
                <div style="margin-bottom: 24px;">
                    <div style="font-size: 48px; font-weight: 700; color: #10b981; text-align: center;">£${totalValue.toLocaleString()}</div>
                    <div style="text-align: center; color: #6b7280; margin-top: 8px;">Total Value</div>
                    <div style="text-align: center; color: #374151; font-size: 14px; margin-top: 4px;">📦 ${totalVolume.toFixed(1)} m³ timber</div>
                </div>
                <div style="background: #f9fafb; padding: 16px; border-radius: 12px;">
                    <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #1f2937;">Projects (${filteredProjects.length}):</h4>
                    <div style="max-height: 400px; overflow-y: auto;">
                        ${filteredProjects.slice(0, 50).map(p => `
                            <div style="padding: 12px; border-bottom: 1px solid #e5e7eb; cursor: pointer;" onclick="showProjectDetail('${p.id}'); closeModal();" onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='transparent'">
                                <div style="font-size: 14px; font-weight: 600; color: #374151;">${p.jobNumber} - ${p.client}</div>
                                <div style="font-size: 12px; color: #6b7280; margin-top: 2px;">Designer: ${p.designer}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            break;
        
        case 'signOffLeadTime':
        case 'bomAccuracy':
            title = kpiType === 'signOffLeadTime' ? '⏱️ Sign-Off Lead Time' : '✅ BOM Accuracy';
            const val = kpiType === 'signOffLeadTime' ? `${stats.avgSignOffLeadTime}d` : `${stats.bomAccuracyScore}%`;
            content = `
                <div style="margin-bottom: 24px;">
                    <div style="font-size: 48px; font-weight: 700; color: #10b981; text-align: center;">${val}</div>
                    <div style="text-align: center; color: #6b7280; margin-top: 8px;">${title.replace(/[⏱️✅]/g, '').trim()}</div>
                </div>
                <div style="background: #f9fafb; padding: 16px; border-radius: 12px;">
                    <p style="margin: 0; font-size: 14px; color: #374151;">Detailed analysis available. Use filters on the Projects page for deeper insights.</p>
                </div>
            `;
            break;
        
        case 'totalTime':
        case 'avgTimeProject':
        case 'projectsTracked':
            title = kpiType === 'totalTime' ? '⏱️ Total Time Logged' : 
                    kpiType === 'avgTimeProject' ? '📊 Average Time per Project' : 
                    '✅ Projects with Time Tracking';
            const timeProjects = projectsData.filter(p => p.timeEntries && p.timeEntries.length > 0);
            content = `
                <div style="margin-bottom: 24px;">
                    <div style="font-size: 48px; font-weight: 700; color: #8b5cf6; text-align: center;">${kpiType === 'totalTime' ? formatTimeDisplay(stats.totalTimeLogged) : kpiType === 'avgTimeProject' ? formatTimeDisplay(stats.avgTimePerProject) : stats.projectsWithTime}</div>
                    <div style="text-align: center; color: #6b7280; margin-top: 8px;">${title.replace(/[⏱️📊✅]/g, '').trim()}</div>
                    <div style="text-align: center; color: #374151; font-size: 14px; margin-top: 4px;">${((stats.projectsWithTime/stats.total)*100).toFixed(0)}% of projects tracked</div>
                </div>
                <div style="background: #f9fafb; padding: 16px; border-radius: 12px;">
                    <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #1f2937;">Projects with Time Tracking:</h4>
                    <div style="max-height: 400px; overflow-y: auto;">
                        ${timeProjects.slice(0, 30).map(p => `
                            <div style="padding: 12px; border-bottom: 1px solid #e5e7eb; cursor: pointer;" onclick="showProjectDetail('${p.id}'); closeModal();" onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='transparent'">
                                <div style="font-size: 14px; font-weight: 600; color: #374151;">${p.jobNumber} - ${p.client}</div>
                                <div style="font-size: 12px; color: #6b7280; margin-top: 2px;">Designer: ${p.designer}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            break;
        
        case 'issuedMonth':
        case 'completedMonth':
        case 'startedMonth':
            title = kpiType === 'issuedMonth' ? '📤 Issued This Month' : 
                    kpiType === 'completedMonth' ? '✅ Completed This Month' : 
                    '🌟 Started This Month';
            const monthProjects = kpiType === 'issuedMonth' ? 
                projectsData.filter(p => p.firstIssueDate && new Date(p.firstIssueDate).getMonth() === new Date().getMonth()) :
                kpiType === 'completedMonth' ?
                projectsData.filter(p => p.status === 'Completed') : // Simplified
                projectsData.filter(p => p.orderDate && new Date(p.orderDate).getMonth() === new Date().getMonth());
            const count = kpiType === 'issuedMonth' ? stats.projectsIssuedThisMonth :
                         kpiType === 'completedMonth' ? stats.projectsCompletedThisMonth :
                         stats.projectsStartedThisMonth;
            content = `
                <div style="margin-bottom: 24px;">
                    <div style="font-size: 48px; font-weight: 700; color: #10b981; text-align: center;">${count}</div>
                    <div style="text-align: center; color: #6b7280; margin-top: 8px;">${title.replace(/[📤✅🌟]/g, '').trim()}</div>
                </div>
                <div style="background: #f9fafb; padding: 16px; border-radius: 12px;">
                    <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #1f2937;">Projects (${monthProjects.length}):</h4>
                    <div style="max-height: 400px; overflow-y: auto;">
                        ${monthProjects.slice(0, 50).map(p => `
                            <div style="padding: 12px; border-bottom: 1px solid #e5e7eb; cursor: pointer;" onclick="showProjectDetail('${p.id}'); closeModal();" onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='transparent'">
                                <div style="font-size: 14px; font-weight: 600; color: #374151;">${p.jobNumber} - ${p.client}</div>
                                <div style="font-size: 12px; color: #6b7280; margin-top: 2px;">Designer: ${p.designer} | Status: ${p.status}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            break;
            
        default:
            title = 'KPI Details';

            content = '<p>Details not available for this KPI.</p>';
    }
    
    // Show modal
    const modal = `
        <div class="modal-overlay" onclick="closeModal()">
            <div class="modal-content" style="max-width: 800px; max-height: 90vh; overflow-y: auto;" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h3 style="margin: 0; font-size: 20px;">${title}</h3>
                    <button class="modal-close" onclick="closeModal()">&times;</button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="closeModal()">Close</button>
                    <button class="btn-primary" onclick="showView('projects'); closeModal();">View All Projects</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modal);
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
    }
}

// Helper function for status colors in KPI modals
function getStatusColor(status) {
    const colors = {
        'Requested': '#3b82f6',
        'In Progress': '#3b82f6',
        'Checking': '#f59e0b',
        'With Client': '#ec4899',
        'Signed Off': '#10b981',
        'On Hold': '#6b7280',
        'Changing': '#1abc9c',
        'Sent to Production': '#16a085',
        'Cancelled': '#ef4444',
        'Completed': '#059669'
    };
    return colors[status] || '#6b7280';
}

// Get status icon emoji
function getStatusIcon(status) {
    const icons = {
        'Requested': '📝',
        'In Progress': '🔵',
        'Checking': '🔍',
        'With Client': '👁️',
        'Signed Off': '✅',
        'On Hold': '⏸️',
        'Changing': '🔄',
        'Sent to Production': '🏭',
        'Cancelled': '❌',
        'Completed': '✓'
    };
    return icons[status] || '📋';
}

// Generate avatar HTML with color based on name
function generateAvatar(name, size = '') {
    if (!name) return '';
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    const colors = ['blue', 'green', 'orange', 'purple', 'pink', 'red', 'teal', 'indigo'];
    const colorIndex = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    const colorClass = `avatar-${colors[colorIndex]}`;
    const sizeClass = size ? `avatar-${size}` : '';
    return `<div class="avatar ${sizeClass} ${colorClass}">${initials}</div>`;
}

// Render status badge with icon
function renderStatusBadge(status) {
    const icon = getStatusIcon(status);
    return `<span class="status-badge badge-with-icon ${getStatusClass(status)}">${icon} ${status}</span>`;
}


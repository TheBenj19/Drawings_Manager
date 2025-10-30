# Drawing Project Manager

A modern web application for managing drawing projects with an intuitive interface.

## Features

- **Project Dashboard**: View all projects in a sortable, searchable table
- **Project Details**: Click into individual projects to view and manage details
- **Status Management**: Update project status (Planning, In Progress, Review, Completed, On Hold)
- **Priority Tracking**: Set and track project priorities (Low, Medium, High)
- **Progress Monitoring**: Visual progress tracking for each project
- **Task Management**: Track individual tasks within each project
- **Activity Timeline**: View recent project activities
- **Responsive Design**: Clean, modern UI with a sidebar navigation

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── Layout.jsx          # Main layout with sidebar
│   └── Layout.css
├── pages/
│   ├── ProjectsPage.jsx    # Projects table view
│   ├── ProjectsPage.css
│   ├── ProjectDetailPage.jsx  # Individual project view
│   └── ProjectDetailPage.css
├── App.jsx                 # Main app with routing
├── main.jsx               # Entry point
└── index.css              # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Future Enhancements

- Backend API integration
- User authentication
- File attachments
- Comments system
- Calendar view
- Team management
- Export/import functionality
- Real-time collaboration

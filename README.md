# Mini Energy Management Dashboard (MEM Dashboard)

A comprehensive web application for monitoring and managing energy systems, alarms, and maintenance across multiple sites. Built with modern React and Node.js technologies.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [State Management](#state-management)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

The MEM Dashboard is a full-stack application designed for energy management facilities. It provides real-time monitoring of power systems, alarm management, site-specific analytics, and maintenance ticket tracking.

### Projects

1. **mini-energy-management-dashboard** - React frontend application
2. **mem-backend** - Node.js/Express API server

## ✨ Features

### 🔌 Power Monitoring
- Real-time Active/Reactive Power waveform visualization
- Live data polling with configurable intervals
- ECharts-powered interactive charts
- Historical data display

### 🚨 Alarm Management
- Comprehensive alarm table with search and filtering
- Severity-based color coding (Critical, Major, Minor, Warning, Info)
- Favorites system for important alarms
- Site-specific alarm details and summaries
- Real-time alarm statistics

### 🏭 Site Management
- Site-specific dashboards with detailed analytics
- Operating mode tracking (Grid Following, Microgrid, Standalone)
- Energy consumption reports and charts
- Maintenance ticket creation and tracking

### 📝 Maintenance System
- Create and manage maintenance tickets
- Priority-based ticket classification
- Assignment tracking
- Status management (Open, In-Progress, Resolved, Closed)

### 🎨 User Interface
- Modern Ant Design component library
- Responsive design for all screen sizes
- Dark/light theme support
- Intuitive navigation and user experience

## 🛠 Tech Stack

### Frontend
- **React 19.2.0** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Ant Design 6.1.1** - UI component library
- **ECharts** - Data visualization
- **Redux Toolkit** - State management
- **React Router 7.11.0** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Node.js 20.x** - Runtime environment
- **Express 5.1.0** - Web framework
- **TypeScript** - Type safety
- **Vercel** - Deployment platform

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Git** - Version control

## 📁 Project Structure

```
mem-dashboard/
├── mini-energy-management-dashboard/     # React frontend
│   ├── public/                          # Static assets
│   ├── src/
│   │   ├── api/                         # API client and types
│   │   ├── components/                  # Reusable UI components
│   │   ├── hooks/                       # Custom React hooks
│   │   ├── pages/                       # Page components
│   │   │   ├── alarms/                  # Alarm management pages
│   │   │   │   ├── index.tsx            # Alarms table page
│   │   │   │   └── details/             # Site-specific alarm details
│   │   │   └── live/                    # Live power monitoring
│   │   ├── router/                      # React Router configuration
│   │   ├── store/                       # Redux store and slices
│   │   │   └── slices/                  # Redux Toolkit slices
│   │   └── App.tsx                      # Main app component
│   ├── package.json
│   └── vite.config.ts
│
├── mem-backend/                         # Node.js backend
│   ├── api/                             # API route handlers
│   ├── lib/                             # Utility functions
│   ├── types/                           # TypeScript type definitions
│   ├── server.ts                        # Express server setup
│   ├── vercel.json                      # Vercel deployment config
│   └── package.json
│
└── README.md                            # This file
```

## 🚀 Installation & Setup

### Prerequisites

- **Node.js 20.x** or higher
- **npm** or **yarn** package manager
- **Git** for version control

### Backend Setup

1. **Clone and navigate to backend directory:**
   ```bash
   cd mem-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Development server:**
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:3000`

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Deploy to Vercel:**
   ```bash
   npm run deploy
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd mini-energy-management-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Development server:**
   ```bash
   npm run dev
   ```
   App runs on `http://localhost:5173`

4. **Build for production:**
   ```bash
   npm run build
   ```

## 📖 Usage

### Navigation

- **/** - Live power monitoring dashboard
- **/alarms** - Alarm management table
- **/site/:id** - Site-specific details and analytics

### Key Workflows

#### Monitoring Power Systems
1. Navigate to the live dashboard
2. View real-time power waveforms
3. Monitor system status and alerts

#### Managing Alarms
1. Go to the Alarms page
2. Use search and filters to find specific alarms
3. Click alarm codes to view site details
4. Mark important alarms as favorites

#### Site Management
1. Click any alarm code or navigate to `/site/{id}`
2. View alarm summaries and energy reports
3. Create maintenance tickets as needed

#### Maintenance Tickets
1. Open site details page
2. Click "Create Maintenance Ticket"
3. Fill out the form with issue details
4. Submit to create the ticket

## 🔌 API Documentation

### Endpoints

#### GET /alarms
Get all alarms with optional search filtering.

**Query Parameters:**
- `search` (optional): Search term for filtering alarms

#### GET /power
Get current power system data.


## 🗄 State Management

The application uses Redux Toolkit for state management with the following slices:

### Alarm Slice (`alarms`)
- **alarms**: Array of alarm events
- **filteredAlarms**: Search-filtered alarms
- **favorites**: Array of favorited alarm IDs
- **loading/error**: Async operation states

### Power Slice (`power`)
- **currentPower**: Current power readings
- **chartData**: Historical chart data
- **isPolling**: Polling status
- **loading/error**: Async states

### Site Slice (`site`)
- **siteInfo**: Site metadata and operating mode
- **energyStats**: Energy consumption data
- **loading/error**: Site-specific states

### Maintenance Slice (`maintenance`)
- **tickets**: Array of maintenance tickets
- **submitting**: Form submission state
- **lastSubmitted**: Most recent ticket
- **loading/error**: Ticket operation states



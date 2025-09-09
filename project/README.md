# DrimSoft Admin - Vendor Console for Planifika

A comprehensive admin interface for DrimSoft to manage organizations, projects, and system operations.

## 🚀 Features

- **Executive Dashboard** - KPI overview with charts and at-risk project monitoring
- **Organization Management** - Complete organization lifecycle with detailed views
- **Project Tracking** - Advanced project management with phases, tasks, and deliverables
- **User Directory** - DrimSoft staff management and external user lookup
- **Reports & Analytics** - KPI explorer with customizable charts and export capabilities
- **Audit Logging** - Comprehensive security audit trail with filtering
- **System Configuration** - Integration management and feature flags
- **Responsive Design** - Optimized for all devices (≥360px)
- **Dark/Light Themes** - Professional UI with theme switching

## 🛠 Tech Stack

- **Frontend**: Vite + React 18 + TypeScript
- **Routing**: React Router v6
- **Styling**: TailwindCSS + shadcn/ui components
- **State Management**: TanStack Query + Zustand
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts
- **Mocking**: MSW (Mock Service Worker)
- **Icons**: Lucide React

## 📦 Installation & Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 🔐 Authentication

- **Access**: Restricted to `@drimsoft.com` email addresses only
- **Demo Credentials**: Use any `@drimsoft.com` email with any password
- **JWT**: Mock authentication with token-based session management

## 📊 Mock Data

The application includes comprehensive mock data:
- 5 Organizations with realistic data
- 20+ Projects across different statuses and types
- 12 weeks of KPI time series data
- Extensive audit logs
- User directory with DrimSoft staff

## 🗺 Navigation

- `/login` - Authentication (DrimSoft-only)
- `/dashboard` - Executive overview with KPIs and charts
- `/institutions` - Organization management and details
- `/projects` - Project tracking and management
- `/users` - User directory and management
- `/reports` - KPI explorer and analytics
- `/audit` - Security audit logs
- `/config` - System configuration

## ⌨️ Keyboard Shortcuts

- `g d` - Go to Dashboard
- `g i` - Go to Institutions
- `g p` - Go to Projects
- `/` - Focus global search

## 🏗 Architecture

```
src/
├── app/           # App configuration (router, providers)
├── components/    # Reusable UI components
│   ├── ui/       # shadcn/ui components
│   └── layout/   # Layout components
├── pages/         # Route components
├── stores/        # Zustand state stores
├── services/      # API clients and utilities
├── mocks/         # MSW handlers and fixtures
├── types/         # TypeScript type definitions
├── lib/           # Utility functions
└── hooks/         # Custom React hooks
```

## 🔧 Development

- **Linting**: ESLint with TypeScript support
- **Code Style**: Prettier for consistent formatting
- **Type Safety**: Strict TypeScript configuration
- **Hot Reload**: Vite HMR for fast development

## 📱 Responsive Design

- **Mobile**: ≥360px with collapsible sidebar
- **Tablet**: 768px+ with optimized layouts
- **Desktop**: 1024px+ with full feature set

## 🎨 Design System

- **Colors**: Primary blues (#3B82F6, #2563EB), DrimSoft green (#22C55E)
- **Typography**: Inter (UI) + Poppins (headings)
- **Components**: Rounded corners (2xl), soft shadows, generous spacing
- **Dark Mode**: Professional dark theme as default

## 🚧 TODO: Production Integration

Replace mock functionality with real backend:

- [ ] Real authentication with DrimSoft SSO
- [ ] Database integration (PostgreSQL/Supabase recommended)
- [ ] API endpoints for all CRUD operations
- [ ] Real-time updates for collaborative features
- [ ] File upload and document management
- [ ] Email notifications and integrations
- [ ] Advanced reporting with PDF export
- [ ] Role-based permissions and RBAC

## 📄 License

Private - DrimSoft Internal Use Only
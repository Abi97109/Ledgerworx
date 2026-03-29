# Project Architecture Summary

## Overview
This is a **Vite React + React Router** portal application for a client management system (LedgerWorx).

**Tech Stack:**
- React 18.2.0
- Vite 5.2.0 (build tool & dev server)
- React Router 6.22.3 (routing)
- TanStack React Query 5.95.2 (data fetching & state management)
- React 18 with Strict Mode

---

## 1. Overall Project Structure

### Directory Layout
```
src/
├── main.jsx                          # App entry point
├── routes/
│   └── AppRouter.jsx                 # Main router with profile gating
├── components/
│   └── AppViewportFit.jsx            # View/layout wrapper
├── modules/
│   └── client/                       # Main client portal module
│       ├── api/                      # API service layer
│       ├── components/               # Shared components
│       ├── context/                  # React Context providers
│       ├── data/                     # Static data files
│       ├── hooks/                    # Custom hooks
│       ├── pages/                    # Page components
│       ├── routes/                   # Route definitions
│       ├── styles/                   # CSS files
│       └── utils/                    # Utility functions
├── assets/                           # Images, logos, etc.
└── utils/                            # Global utilities

public/
├── .htaccess                         # Apache SPA fallback config
└── client-assets/                    # Static assets
```

---

## 2. Service Management Architecture

### **API Service Layer** (`src/modules/client/api/`)

#### **portalApi.js** - Core API client
Provides base HTTP request utilities:
- `requestPortalJson(path, options)` - Generic fetch wrapper with error handling
- `requestPortalJsonWithBody(path, method, body)` - POST/PUT requests
- **Custom Error Handling:** `PortalApiError` class with status codes and payloads
- **Nonce Management:** WordPress REST API nonce handling
- **Base Configuration:** 
  - Default base URL: `https://ledgerworx.me`
  - Configurable via `VITE_WORDPRESS_BASE_URL` env var

**Key Functions:**
```javascript
fetchPortalBootstrap()          // Auth & session init
fetchPortalSession()            // Session info
fetchPortalDashboard()          // Dashboard data
fetchPortalCatalog()            // Packages & services
```

#### **clientRequestsApi.js** - Request CRUD operations
```javascript
fetchClientRequests()           // GET all requests
createClientRequest()           // POST new request
updateClientRequest()           // POST update request
deleteClientRequest()           // DELETE request
```

### **State Management**

#### **React Query (TanStack)** - Data fetching & caching
Configured in `main.jsx`:
```javascript
QueryClient {
  refetchOnReconnect: true,
  refetchOnWindowFocus: true
}
```

#### **Custom Hooks** (`src/modules/client/hooks/`)

**usePortalQueries.js:**
- `usePortalDashboardQuery()` - Stale time: 5 min, Cache: 15 min
- `usePortalCatalogQuery()` - Stale time: 15 min, Cache: 30 min

**useClientRequestsQuery.js:**
- `useClientRequestsQuery()` - Fetch all client requests
- `useCreateClientRequestMutation()` - Create & invalidate queries
- `useUpdateClientRequestMutation()` - Update & invalidate queries
- `useDeleteClientRequestMutation()` - Delete & invalidate queries

#### **React Context** (`src/modules/client/context/`)

**PortalSessionProvider.jsx:**
- Provides bootstrap query (authentication, user profile, config)
- Custom hook: `usePortalSession()`
- Query key: `['portal-bootstrap']`
- Stale time: 60 seconds

---

## 3. Notification System

### **Current Notification Implementation**

#### **Mock Data Layer** (`src/modules/client/data/notificationsData.js`)
- Contains static notification items with 6 sample notifications
- Fields: id, title, message, category, timestamp, defaultSeen, detail
- Categories: Payments, Documents, Requests, Reminders, Legal, Support

#### **Local Storage Persistence** (`src/modules/client/utils/notificationStorage.js`)
```javascript
getClientSeenNotificationsMap()     // Retrieve seen status map
setClientNotificationSeen(id)       // Mark notification as seen
// Storage key: 'ledgerworx_notifications_seen'
```

### **Notification Pages**

**ClientNotificationsPage.jsx** (`/client/notifications`)
- Lists all notifications with search & sort (newest/oldest/title)
- Merges defaultSeen status with localStorage
- Click handler sets notification as seen
- Navigates to detail page with query param

**ClientNotificationDetailPage.jsx** (`/client/notification-detail`)
- Displays individual notification details

### **Notification Settings**
In Profile Settings (`src/modules/client/data/profileSettingsData.js`):
- Email Notifications (toggle setting)
- SMS Notifications (toggle setting)
- WhatsApp Notifications (toggle setting)
- Push Notifications (toggle setting)

### **Current Limitations - NOT YET INTEGRATED:**
- ❌ No backend API integration for notifications
- ❌ No real-time notification push system
- ❌ No database persistence (only localStorage for "seen" status)
- ❌ Mock data only - not fetched from server
- ❌ Settings are UI-only, not saved to backend

---

## 4. Key Files Review

### **Entry Point** - [src/main.jsx](src/main.jsx)
- Wraps app with QueryClientProvider
- PortalSessionProvider for session management
- AppRouter handles routing

### **Router** - [src/routes/AppRouter.jsx](src/routes/AppRouter.jsx)
- BrowserRouter wrapper
- Profile completion gate (requires company name)
- Dynamic body class management per route
- Renders all client routes

### **Client Routes** - [src/modules/client/routes/clientRoutes.jsx](src/modules/client/routes/clientRoutes.jsx)
Defines 16 routes:
- Dashboard, Active Services, Documents
- Invoices, Invoices PDF, Payments, Receipts PDF
- Requests, Package, More Services, Sub Services
- Notifications, Notification Detail
- Profile Settings, Support, Signout

### **Navigation** - [src/modules/client/components/ClientPortalNavbar.jsx](src/modules/client/components/ClientPortalNavbar.jsx)
- Top navbar with logo, nav links, profile dropdown
- Theme toggle (dark/light mode)
- Session profile integration
- All 5 primary nav links: Dashboard, Requests, Payments, Documents, Notifications

### **Data Files** - [src/modules/client/data/](src/modules/client/data/)
All contain mock/static data:
- `clientNavData.js` - Navigation links
- `dashboardData.js` - Dashboard content
- `notificationsData.js` - Notification items
- `requestsData.js`, `invoicesData.js`, etc. - Page-specific data
- `profileSettingsData.js` - Settings options

### **Utilities**
- `notificationStorage.js` - seen/unseen tracking
- `routePaths.js` - centralized route constants
- `themeStorage.js` - dark/light mode preference
- `useClientPortalPage.js` - page setup hook (title, theme, Font Awesome)

---

## 5. Data Flow & State Management

### **Bootstrap Flow**
```
main.jsx
  ↓
QueryClientProvider (React Query)
  ↓
PortalSessionProvider (Context)
  ├─→ useQuery('portal-bootstrap')
  ├─→ fetchPortalBootstrap()
  ├─→ validates session
  └─→ provides to all pages via usePortalSession()
  ↓
AppRouter
  ├─→ RouteBodyClassSync (dynamic body class)
  ├─→ PortalProfileCompletionGate (requires company name)
  └─→ renders routes
```

### **Notification Flow**
```
ClientNotificationsPage
  ├─→ Reads: clientNotificationItems (data/notificationsData.js)
  ├─→ Reads: localStorage ('ledgerworx_notifications_seen')
  ├─→ User clicks notification
  ├─→ setClientNotificationSeen(id) → updates localStorage
  ├─→ navigate to detail page
  │
ClientNotificationDetailPage
  └─→ Displays from query params
```

### **Request CRUD Flow**
```
Page Component
  ↓
useClientRequestsQuery()    (fetch)
useCreateClientRequestMutation()    (create)
useUpdateClientRequestMutation()    (update)
useDeleteClientRequestMutation()    (delete)
  ↓
React Query automatically:
  - Calls API endpoints
  - Caches results
  - Invalidates related queries on mutation
```

---

## 6. Environment Configuration

### **Environment Variables** (Vite)
- `VITE_WORDPRESS_BASE_URL` - WordPress base URL (default: https://ledgerworx.me)
- `VITE_ROUTER_BASENAME` - Router base path (dev: '/', prod: '/portal')
- `VITE_APP_BASE_PATH` - Deployment base path (default: '/portal/client/')

### **Build Configuration**
- Development: `vite` (http://0.0.0.0:5173)
- Preview: `vite preview` (http://0.0.0.0:4173)
- Production: Apache with `.htaccess` SPA fallback

---

## 7. Component Architecture

### **Page Components** (16 total)
All located in `src/modules/client/pages/`:
- `ClientDashboardPage.jsx`
- `ClientActiveServicesPage.jsx`
- `ClientDocumentsPage.jsx`
- etc.

**Common pattern:**
```jsx
import { usePortalSession } from '../context/PortalSessionProvider';
import { usePortalDashboardQuery } from '../hooks/usePortalQueries';
import ClientPortalNavbar from '../components/ClientPortalNavbar';

function Page() {
  const session = usePortalSession();
  const data = usePortalDashboardQuery();
  return (
    <>
      <ClientPortalNavbar />
      {/* page content */}
    </>
  );
}
```

### **Reusable Components**
- `ClientPortalNavbar.jsx` - Navigation header
- `ClientConfirmModal.jsx` - Confirmation dialogs
- `PortalPageState.jsx` - Error & Loading states (PortalPageError, PortalPageLoader)

---

## 8. Styling Architecture

### **CSS Files** - 16 page-specific + 3 global
- Page styles: `client-invoices.css`, `client-requests.css`, etc.
- Global: `dark-mode.css`, `portal-page-state.css`, `client-breadcrumb.css`

### **Theme System**
- Dark/Light mode toggle in navbar
- Persisted in localStorage via `themeStorage.js`
- Applied to `document.documentElement` via CSS class `.dark-mode`

---

## Key Architectural Decisions

### ✅ Strengths
1. **Query-centric state management** - React Query handles caching & sync
2. **Modular structure** - Client module is self-contained & reusable
3. **Session provider pattern** - Centralized auth state
4. **Route-based CSS management** - Clean body class toggle
5. **Utility-focused data** - All static data in `data/` folder

### ⚠️ Areas for Enhancement
1. **Notification system** - Currently mock data only, needs backend integration
2. **Error handling** - Basic errors, could add toast notifications
3. **Loading states** - Could use suspense boundaries
4. **API pagination** - Not implemented (assumes all data fits)
5. **Real-time updates** - No WebSocket or polling for live notifications

---

## File Count Summary
- **Pages:** 16
- **Data Files:** 10
- **CSS Files:** 19
- **API/Hooks:** 5
- **Components:** 3
- **Context:** 1
- **Utils:** 6

Total: ~50 core React files (modular & maintainable)

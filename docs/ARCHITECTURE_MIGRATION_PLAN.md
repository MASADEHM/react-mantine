# Architecture Migration Plan

## From Current Structure to Feature-Based Modular Architecture

**Version:** 1.0  
**Date:** January 11, 2026  
**Status:** Planning

---

## Table of Contents

1. [Current vs Target Structure](#1-current-vs-target-structure)
2. [Migration Overview](#2-migration-overview)
3. [Detailed File Mapping](#3-detailed-file-mapping)
4. [Migration Steps](#4-migration-steps)
5. [Path Aliases Update](#5-path-aliases-update)
6. [Files to Create](#6-files-to-create)
7. [Files to Delete](#7-files-to-delete)

---

## 1. Current vs Target Structure

### Current Structure (Issues Highlighted)

```
src/
├── app/                          # ⚠️ Needs reorganization
│   ├── providers/                # OK - Keep
│   └── styles/                   # ⚠️ Move to styles/
├── App.tsx                       # OK
├── assets/                       # OK
├── components/                   # ❌ Should be in shared or features
│   └── ExampleComponent.tsx
├── core/                         # ⚠️ Incomplete - needs api/, query/, storage/
│   └── interceptor.ts
├── features/                     # ⚠️ Incomplete - only has types, no pages/services
│   ├── applications/types/
│   ├── auth/types/
│   └── services/types/
├── i18n.ts                       # ⚠️ Move to config/
├── interfaces/                   # ❌ Legacy - merge into types/
│   └── login.interface.ts
├── mocks/                        # OK - Keep
├── pages/                        # ⚠️ Feature pages should move to features/
│   ├── about.tsx                 # OK - Root page
│   ├── consultant/               # ❌ Move to features/consultant/pages/
│   ├── contactus.tsx             # OK - Root page
│   ├── home.tsx                  # OK - Root page
│   ├── login.tsx                 # ❌ Move to features/auth/pages/
│   └── signup.tsx                # ❌ Move to features/auth/pages/
├── routes/                       # OK
├── services/                     # ❌ Move to respective features or core/
│   ├── countryMaster.ts
│   ├── login.service.ts          # → features/auth/services/
│   ├── token.service.ts          # → core/storage/
│   └── users.service.ts          # → features/users/services/
├── shared/                       # ⚠️ Partial - needs restructuring
│   ├── components/               # OK but loose files need organizing
│   ├── footer.tsx                # → shared/components/layout/
│   ├── HeroSlider.tsx            # → shared/components/ui/
│   ├── hooks/                    # OK
│   ├── menu.tsx                  # → shared/components/layout/
│   ├── ServiceLayout.tsx         # → shared/components/layout/
│   ├── Sidebar.tsx               # → shared/components/layout/
│   ├── types/                    # ❌ Move to src/types/
│   └── utils/                    # ❌ Move to src/utils/
├── store/                        # ⚠️ Consider moving to core/ or features
└── main.tsx                      # OK
```

### Target Structure (Per Architecture Template)

```
src/
├── features/                     # Self-contained feature modules
│   ├── auth/                     # Authentication feature
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── LoginPage.tsx
│   │   │   ├── SignupPage.tsx
│   │   │   └── ForgotPasswordPage.tsx
│   │   ├── services/
│   │   │   └── auth.service.ts
│   │   ├── hooks/
│   │   │   └── useAuth.ts
│   │   ├── types/
│   │   │   └── auth.types.ts
│   │   └── index.ts
│   │
│   ├── projects/                 # Projects management (DCCJ core)
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── index.ts
│   │
│   ├── workflow/                 # Stage workflow management
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── types/
│   │   ├── utils/
│   │   └── index.ts
│   │
│   ├── documents/                # Document vault
│   │   ├── components/
│   │   ├── services/
│   │   ├── types/
│   │   └── index.ts
│   │
│   └── authority-simulator/      # Mock authority interface
│       ├── pages/
│       ├── components/
│       └── index.ts
│
├── shared/                       # Shared across features
│   ├── components/
│   │   ├── ui/                   # Generic UI (Button, Modal, etc.)
│   │   ├── layout/               # Layout (Header, Sidebar, Footer)
│   │   └── feedback/             # Feedback (Loading, Toast, Empty)
│   ├── guards/                   # Route protection
│   │   ├── PrivateRoute.tsx
│   │   └── RoleRoute.tsx
│   ├── hooks/                    # Shared hooks
│   └── index.ts
│
├── core/                         # Core infrastructure
│   ├── api/
│   │   ├── client.ts             # Axios instance
│   │   ├── interceptors.ts       # Request/response interceptors
│   │   └── api-helpers.ts        # API utilities
│   ├── query/
│   │   └── query-client.ts       # TanStack Query config
│   ├── storage/
│   │   ├── cookies.ts
│   │   └── local-storage.ts
│   ├── store/                    # Zustand stores
│   │   ├── index.ts
│   │   ├── ui.store.ts
│   │   ├── user.store.ts
│   │   └── notification.store.ts
│   └── index.ts
│
├── config/                       # App configuration
│   ├── env.ts                    # Environment variables
│   ├── routes.ts                 # Route path constants
│   ├── i18n.ts                   # i18n configuration
│   └── app.config.ts             # App settings
│
├── constants/                    # App-wide constants
│   ├── roles.ts
│   ├── statuses.ts
│   ├── stages.ts                 # DCCJ stage definitions
│   ├── api-endpoints.ts
│   └── index.ts
│
├── utils/                        # Pure utility functions
│   ├── formatters.ts
│   ├── validators.ts
│   ├── helpers.ts
│   └── index.ts
│
├── types/                        # Global TypeScript types
│   ├── common.types.ts
│   ├── api.types.ts
│   └── index.ts
│
├── pages/                        # Root-level pages only
│   ├── HomePage.tsx
│   ├── AboutPage.tsx
│   ├── ContactPage.tsx
│   └── NotFoundPage.tsx
│
├── styles/                       # Global styles
│   ├── main.css
│   ├── variables.css
│   └── theme.ts                  # Ant Design theme
│
├── assets/                       # Static assets
│   └── images/
│
├── mocks/                        # Mock data (keep for prototype)
│   └── data/
│
├── routes/                       # Route configuration
│   └── router.tsx
│
├── App.tsx
└── main.tsx
```

---

## 2. Migration Overview

### Phase 1: Core Infrastructure (Priority: HIGH)

| Task | Description |
|------|-------------|
| 1.1 | Create `core/api/` structure with client, interceptors, helpers |
| 1.2 | Create `core/query/` with TanStack Query config |
| 1.3 | Create `core/storage/` with token service |
| 1.4 | Move stores to `core/store/` |
| 1.5 | Create `core/index.ts` exports |

### Phase 2: Config & Constants (Priority: HIGH)

| Task | Description |
|------|-------------|
| 2.1 | Create `config/` folder with env.ts, routes.ts |
| 2.2 | Move i18n.ts to `config/i18n.ts` |
| 2.3 | Create `constants/` with roles, statuses, stages |
| 2.4 | Extract constants from shared/utils/constants.ts |

### Phase 3: Utils & Types (Priority: MEDIUM)

| Task | Description |
|------|-------------|
| 3.1 | Move `shared/utils/` to `src/utils/` |
| 3.2 | Move `shared/types/` to `src/types/` |
| 3.3 | Merge `interfaces/` into `types/` |
| 3.4 | Create proper index.ts exports |

### Phase 4: Shared Components (Priority: MEDIUM)

| Task | Description |
|------|-------------|
| 4.1 | Reorganize `shared/components/` into ui/, layout/, feedback/ |
| 4.2 | Move loose components (footer, menu, Sidebar) to layout/ |
| 4.3 | Create `shared/guards/` with route protection |
| 4.4 | Create `shared/index.ts` |

### Phase 5: Feature Modules (Priority: HIGH)

| Task | Description |
|------|-------------|
| 5.1 | Create `features/auth/` with pages, services, hooks, types |
| 5.2 | Create `features/projects/` structure |
| 5.3 | Create `features/workflow/` structure |
| 5.4 | Move consultant pages to appropriate features |
| 5.5 | Create index.ts for each feature |

### Phase 6: Root Pages & Cleanup (Priority: LOW)

| Task | Description |
|------|-------------|
| 6.1 | Keep only root pages in `pages/` |
| 6.2 | Move styles to `styles/` folder |
| 6.3 | Update all imports across the project |
| 6.4 | Delete legacy folders and files |
| 6.5 | Update router.tsx with new imports |

---

## 3. Detailed File Mapping

### Files to MOVE

| Current Location | New Location | Notes |
|------------------|--------------|-------|
| `src/i18n.ts` | `src/config/i18n.ts` | Move to config |
| `src/app/styles/theme.ts` | `src/styles/theme.ts` | Move to styles |
| `src/services/login.service.ts` | `src/features/auth/services/auth.service.ts` | Rename |
| `src/services/token.service.ts` | `src/core/storage/token.ts` | Move to core |
| `src/services/users.service.ts` | `src/features/users/services/user.service.ts` | New feature |
| `src/services/countryMaster.ts` | `src/core/api/country-master.ts` | Shared API |
| `src/pages/login.tsx` | `src/features/auth/pages/LoginPage.tsx` | Move to feature |
| `src/pages/signup.tsx` | `src/features/auth/pages/SignupPage.tsx` | Move to feature |
| `src/pages/consultant/*` | `src/features/projects/pages/*` | Will be replaced with new project pages |
| `src/store/*` | `src/core/store/*` | Move to core |
| `src/core/interceptor.ts` | `src/core/api/interceptors.ts` | Reorganize |
| `src/shared/footer.tsx` | `src/shared/components/layout/Footer.tsx` | Organize |
| `src/shared/menu.tsx` | `src/shared/components/layout/Header.tsx` | Rename |
| `src/shared/Sidebar.tsx` | `src/shared/components/layout/Sidebar.tsx` | Organize |
| `src/shared/HeroSlider.tsx` | `src/shared/components/ui/HeroSlider.tsx` | Organize |
| `src/shared/ServiceLayout.tsx` | `src/shared/components/layout/ServiceLayout.tsx` | Organize |
| `src/shared/utils/*` | `src/utils/*` | Move to root |
| `src/shared/types/*` | `src/types/*` | Move to root |
| `src/interfaces/*` | `src/types/*` | Merge and delete |
| `src/routes/privateroutes.tsx` | `src/shared/guards/PrivateRoute.tsx` | Move to guards |
| `src/features/auth/types/*` | `src/features/auth/types/*` | Keep |
| `src/features/applications/types/*` | `src/features/projects/types/*` | Rename folder |
| `src/features/services/types/*` | `src/features/workflow/types/*` | Reorganize |

### Files to CREATE

| File Path | Purpose |
|-----------|---------|
| `src/core/api/client.ts` | Axios HTTP client instance |
| `src/core/api/api-helpers.ts` | API call wrapper with error handling |
| `src/core/query/query-client.ts` | TanStack Query configuration |
| `src/core/storage/local-storage.ts` | Local storage utilities |
| `src/core/index.ts` | Core exports |
| `src/config/env.ts` | Environment variables |
| `src/config/routes.ts` | Route path constants |
| `src/config/app.config.ts` | App settings |
| `src/constants/roles.ts` | User roles |
| `src/constants/statuses.ts` | Status definitions |
| `src/constants/stages.ts` | DCCJ stage definitions |
| `src/constants/index.ts` | Constants exports |
| `src/utils/index.ts` | Utils exports |
| `src/types/api.types.ts` | API response types |
| `src/types/index.ts` | Types exports |
| `src/shared/guards/RoleRoute.tsx` | Role-based route guard |
| `src/shared/index.ts` | Shared exports |
| `src/features/auth/index.ts` | Auth feature exports |
| `src/features/auth/hooks/useAuth.ts` | Auth hook |
| `src/features/projects/index.ts` | Projects feature exports |
| `src/features/workflow/index.ts` | Workflow feature exports |
| `src/pages/NotFoundPage.tsx` | 404 page |

### Files to DELETE (after migration)

| File Path | Reason |
|-----------|--------|
| `src/interfaces/` folder | Merged into types/ |
| `src/components/ExampleComponent.tsx` | Not needed |
| `src/app/providers/` | Move to core/ or keep simplified |
| `src/shared/utils/` | Moved to src/utils/ |
| `src/shared/types/` | Moved to src/types/ |
| Old pages in `src/pages/consultant/` | Replaced with new project pages |

---

## 4. Migration Steps

### Step 1: Create New Folder Structure

```bash
# Core infrastructure
mkdir -p src/core/{api,query,storage,store}

# Config and constants
mkdir -p src/config
mkdir -p src/constants

# Utils and types at root
mkdir -p src/utils
mkdir -p src/types

# Styles
mkdir -p src/styles

# Shared reorganization
mkdir -p src/shared/components/{ui,layout,feedback}
mkdir -p src/shared/guards

# Features
mkdir -p src/features/auth/{components,pages,services,hooks,types}
mkdir -p src/features/projects/{components,pages,services,hooks,types}
mkdir -p src/features/workflow/{components,hooks,types,utils}
mkdir -p src/features/documents/{components,services,types}
```

### Step 2: Update Path Aliases

Update `tsconfig.json` with granular aliases:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["src/*"],
      "@/features/*": ["src/features/*"],
      "@/shared/*": ["src/shared/*"],
      "@/core/*": ["src/core/*"],
      "@/config/*": ["src/config/*"],
      "@/constants/*": ["src/constants/*"],
      "@/utils/*": ["src/utils/*"],
      "@/types/*": ["src/types/*"]
    }
  }
}
```

### Step 3: Migrate in Order

1. **Core first** - API, storage, stores (no dependencies on features)
2. **Config & Constants** - Pure configuration files
3. **Utils & Types** - Pure utilities
4. **Shared** - Components and guards
5. **Features** - Auth first, then projects, workflow
6. **Pages & Router** - Final updates

### Step 4: Update Imports

After each migration phase:
- Update imports in affected files
- Run TypeScript check: `npm run type-check`
- Fix any broken imports

### Step 5: Clean Up

- Delete empty/legacy folders
- Remove unused files
- Run full build: `npm run build`

---

## 5. Path Aliases Update

### tsconfig.json

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/features/*": ["src/features/*"],
      "@/shared/*": ["src/shared/*"],
      "@/core/*": ["src/core/*"],
      "@/config/*": ["src/config/*"],
      "@/constants/*": ["src/constants/*"],
      "@/utils/*": ["src/utils/*"],
      "@/types/*": ["src/types/*"],
      "@/styles/*": ["src/styles/*"],
      "@/assets/*": ["src/assets/*"]
    }
  }
}
```

### vite.config.ts

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/features': path.resolve(__dirname, './src/features'),
      '@/shared': path.resolve(__dirname, './src/shared'),
      '@/core': path.resolve(__dirname, './src/core'),
      '@/config': path.resolve(__dirname, './src/config'),
      '@/constants': path.resolve(__dirname, './src/constants'),
      '@/utils': path.resolve(__dirname, './src/utils'),
      '@/types': path.resolve(__dirname, './src/types'),
      '@/styles': path.resolve(__dirname, './src/styles'),
      '@/assets': path.resolve(__dirname, './src/assets'),
    },
  },
});
```

---

## 6. Import Patterns After Migration

### Feature Imports

```typescript
// Import from feature's public API
import { LoginPage, useAuth, authService } from "@/features/auth";
import { ProjectList, useProjects } from "@/features/projects";
import { StageProgress, useWorkflowGate } from "@/features/workflow";
```

### Shared Imports

```typescript
// Import shared components
import { Button, Modal } from "@/shared/components/ui";
import { Header, Sidebar, Footer } from "@/shared/components/layout";
import { Loading, EmptyState } from "@/shared/components/feedback";
import { PrivateRoute, RoleRoute } from "@/shared/guards";
import { useDebounce, useLocalStorage } from "@/shared/hooks";
```

### Core Imports

```typescript
// Import core infrastructure
import { httpClient } from "@/core/api/client";
import { apiCall } from "@/core/api/api-helpers";
import { queryClient } from "@/core/query/query-client";
import { useUserStore, useUIStore } from "@/core/store";
```

### Config & Constants

```typescript
// Import configuration
import { env } from "@/config/env";
import { ROUTES } from "@/config/routes";
import { ROLES, PERMISSIONS } from "@/constants/roles";
import { STAGES, SERVICES } from "@/constants/stages";
import { STATUS } from "@/constants/statuses";
```

### Utils & Types

```typescript
// Import utilities
import { formatDate, formatCurrency } from "@/utils/formatters";
import { validateEmail } from "@/utils/validators";

// Import global types
import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type { User, UserRole } from "@/types/common.types";
```

---

## 7. Verification Checklist

After migration, verify:

- [ ] `npm run type-check` passes with no errors
- [ ] `npm run build` succeeds
- [ ] `npm run dev` starts without errors
- [ ] All routes work correctly
- [ ] No console errors in browser
- [ ] All imports use path aliases (no relative `../../../`)
- [ ] Each feature has an `index.ts` with public exports
- [ ] No circular dependencies
- [ ] Zustand stores work correctly
- [ ] i18n translations load correctly
- [ ] Theme applies correctly

---

## Estimated Effort

| Phase | Estimated Time |
|-------|----------------|
| Phase 1: Core Infrastructure | 2-3 hours |
| Phase 2: Config & Constants | 1 hour |
| Phase 3: Utils & Types | 1 hour |
| Phase 4: Shared Components | 2 hours |
| Phase 5: Feature Modules | 3-4 hours |
| Phase 6: Cleanup & Verification | 1-2 hours |
| **Total** | **10-13 hours** |

---

## Notes

1. **Incremental Migration**: Migrate one phase at a time, verify after each
2. **Keep App Running**: Ensure the app works after each phase
3. **Git Commits**: Commit after each successful phase
4. **Import Updates**: Use IDE find/replace for bulk import updates
5. **Test Coverage**: Run tests after migration if available

---

**Document Version:** 1.0  
**Created:** January 11, 2026  
**Status:** Ready for Implementation

# Project Structure

This project follows React Native/Expo best practices with a modular, scalable folder structure.

## Folder Organization

```
maintenance_request/
├── app/                          # Main application screens (Expo Router)
│   ├── (auth)/                   # Authentication group routes
│   ├── (homeowner)/              # Homeowner-specific routes
│   ├── (admin)/                  # Admin-specific routes
│   ├── (tabs)/                   # Tab navigation screens
│   ├── _layout.tsx               # Root layout
│   ├── index.tsx                 # Main entry point
│   └── modal.tsx                 # Modal screens
│
├── components/                   # Reusable React components
│   ├── auth/                     # Authentication components
│   │   ├── SplashScreen.tsx      # Splash screen component
│   │   └── LoginForm.tsx         # Login form component
│   ├── common/                   # Shared/common components
│   │   ├── Button.tsx            # Reusable button component
│   │   ├── Input.tsx             # Reusable input component
│   │   └── BottomNavigation.tsx  # Bottom navigation component
│   ├── dashboard/                # Dashboard-specific components
│   │   ├── RequestCard.tsx       # Maintenance request card
│   │   └── CategoryGrid.tsx      # Category selection grid
│   └── ui/                       # UI components (collapsible, icons, etc.)
│
├── services/                     # API calls and external services
│   └── (future: api.ts, auth.ts)
│
├── utils/                        # Utility functions and helpers
│   └── constants.ts              # App-wide constants (categories, mock data)
│
├── types/                        # TypeScript type definitions
│   └── index.ts                  # Centralized type definitions
│
├── config/                       # App configuration
│   └── theme.ts                  # Theme configuration (colors, spacing, typography)
│
├── assets/                       # Static assets
│   ├── images/                   # Image files
│   └── fonts/                    # Font files
│
└── constants/                    # Legacy constants (to be migrated)
    └── theme.ts

```

## Architecture Principles

### 1. **Component Organization**

- **auth/**: Components related to authentication (splash, login, signup)
- **common/**: Reusable components used across the app
- **dashboard/**: Dashboard-specific components
- **ui/**: Low-level UI components

### 2. **Configuration Management**

- **config/theme.ts**: Centralized theme with colors, spacing, typography
- **utils/constants.ts**: App constants like categories, mock data
- **types/index.ts**: TypeScript interfaces and types

### 3. **Routing Structure** (Expo Router)

- **app/(auth)**: Authentication flow
- **app/(homeowner)**: Homeowner-specific features
- **app/(admin)**: Admin-specific features
- **app/(tabs)**: Tab-based navigation

### 4. **Scalability Features**

- Modular component structure
- Centralized theme management
- Type-safe development with TypeScript
- Separation of concerns (UI, logic, data)

## Key Files

### `config/theme.ts`

Centralized theme configuration:

- Colors (primary, secondary, status colors)
- Spacing system
- Typography scales
- Border radius values
- Shadow configurations

### `types/index.ts`

Type definitions for:

- User roles and data
- Maintenance requests
- Request categories and statuses
- Component props

### `utils/constants.ts`

Application constants:

- Category definitions
- Mock request data
- Enumeration values

## Component Usage Examples

### Button Component

```tsx
import { Button } from "../components/common/Button";

<Button title="Submit" onPress={handleSubmit} variant="accent" />;
```

### Input Component

```tsx
import { Input } from "../components/common/Input";

<Input
  label="Email"
  placeholder="Enter email"
  value={email}
  onChangeText={setEmail}
/>;
```

### Request Card

```tsx
import { RequestCard } from "../components/dashboard/RequestCard";

<RequestCard request={requestData} />;
```

## Benefits of This Structure

1. **Maintainability**: Clear separation of concerns
2. **Scalability**: Easy to add new features without conflicts
3. **Reusability**: Common components can be reused
4. **Type Safety**: TypeScript types prevent errors
5. **Consistency**: Centralized theme ensures consistent UI
6. **Testability**: Modular structure makes unit testing easier

## Next Steps

1. Add API service layer in `services/`
2. Implement state management (Context API or Redux)
3. Add navigation helpers
4. Create form validation utilities
5. Add error boundary components
6. Implement logging and analytics

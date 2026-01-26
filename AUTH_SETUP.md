# Production-Level Authentication & API Setup

## Overview
This document outlines the complete setup of production-level authentication and API handling using TanStack Query (React Query), Redux, and best practices.

## Architecture

### 1. **Axios Configuration** (`lib/api/axios.ts`)
- Base URL: `https://api.the-perksapp.com/api`
- Request interceptor: Automatically adds Bearer token to all requests
- Response interceptor: Handles 401 errors and token expiration
- Error handling: Comprehensive error logging and user feedback

### 2. **Authentication API Service** (`lib/api/auth.api.ts`)
Production-level API methods:
- `signIn(credentials)`: Sign in with email, password, and role
- `signOut()`: Clear authentication state
- `getCurrentUser()`: Get user from localStorage
- `getToken()`: Get auth token from localStorage
- `isAuthenticated()`: Check authentication status

### 3. **TanStack Query Configuration** (`lib/api/query-client.ts`)
Optimized settings:
- Stale time: 5 minutes
- Cache time: 10 minutes
- Retry attempts: 3 with exponential backoff
- Refetch on window focus
- Refetch on mount

### 4. **Redux Auth Slice** (`lib/slices/authSlice.ts`)
State management for:
- User data (id, name, email, role)
- Authentication token
- Authentication status
- Loading states
- Error messages

### 5. **Custom Hooks** (`lib/hooks/useAuth.ts`)
Production hooks:
- `useSignIn()`: Sign in mutation with Redux integration
- `useSignOut()`: Sign out mutation
- `useCurrentUser()`: Query current user from cache
- `useIsAuthenticated()`: Check auth status
- `useAuthToken()`: Get stored token

### 6. **Providers Setup** (`components/providers.tsx`)
- Redux Provider
- TanStack Query Provider
- Auth Initializer (restores auth state on app startup)

### 7. **Protected Routes** (`components/ProtectedRoute.tsx`, `components/PublicRoute.tsx`)
- Automatic redirection based on auth status
- Loading states during auth check
- Production-level error handling

## Sign In Flow

### Step 1: User submits credentials
```tsx
const { mutate: signIn, isPending, error } = useSignIn();
signIn({ email, password, role });
```

### Step 2: API Call
- Request sent with credentials
- Backend validates and returns user + token
- Token and user data stored in localStorage

### Step 3: Redux State Updated
```
authSlice.signInSuccess({
  user: { id, name, email, role, ... },
  token: "jwt_token_here"
})
```

### Step 4: Session Persistence
- Token stored in localStorage
- User data stored in localStorage
- Automatically restored on page reload via `AuthInitializer`

### Step 5: Protected Route Access
- Routes check Redux auth state
- If authenticated, render children
- If not, redirect to login

## Local Storage Structure

```json
{
  "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "admin"
  },
  "authTokenTime": "1706270400000"
}
```

## API Request Headers

All requests automatically include:
```
Authorization: Bearer <token>
Content-Type: application/json
```

## Error Handling

### 401 Unauthorized
- Token removed from localStorage
- User redirected to login
- Redux state cleared

### Other Errors
- Caught and displayed to user
- Proper error messages from backend
- Retry mechanism with exponential backoff

## Best Practices Implemented

✅ **Type Safety**
- Full TypeScript interfaces for all data types
- Proper error typing

✅ **Performance**
- Optimized TanStack Query settings
- Smart caching strategies
- Memoized selectors in Redux

✅ **Security**
- Bearer token in headers
- localStorage with server-side token validation
- Automatic token refresh on 401
- HTTPS recommended for production

✅ **UX**
- Loading states during operations
- Error messages to users
- Form validation
- Smooth redirects

✅ **Maintainability**
- Clear separation of concerns
- Reusable hooks
- Well-documented code
- Production-ready error handling

## Usage Example

### Sign In Page
```tsx
import { useSignIn } from "@/lib/hooks/useAuth";

export default function LoginPage() {
  const { mutate: signIn, isPending, error } = useSignIn();

  const handleSubmit = (credentials) => {
    signIn(credentials, {
      onSuccess: () => router.push("/dashboard")
    });
  };
  
  // Form renders here
}
```

### Protected Page
```tsx
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
```

### Using Auth Data
```tsx
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

export default function UserProfile() {
  const user = useSelector((state: RootState) => state.auth.user);
  
  return <div>{user?.name}</div>;
}
```

## Environment Variables

Ensure these are set in `.env.local`:
```
NEXT_PUBLIC_API_BASE_URL=https://api.the-perksapp.com/api
```

## Demo Credentials
- Email: cena1@yopmail.com
- Password: Test@123
- Role: admin

## API Response Format

The backend returns:
```json
{
  "success": true,
  "message": "admin logged in successfully",
  "data": {
    "user": {
      "id": 1,
      "name": "Admin User",
      "email": "cena1@yopmail.com",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

## Testing

### Manual Testing
1. Navigate to `/auth/login`
2. Enter demo credentials
3. Click "Sign In"
4. Should redirect to `/dashboard`
5. Reload page - auth state persists
6. Logout - redirects to `/auth/login`

### Protected Route Testing
1. Try accessing `/dashboard` while logged out
2. Should redirect to `/auth/login`
3. Try accessing `/auth/login` while logged in
4. Should redirect to `/dashboard`

## Troubleshooting

### Token not persisting
- Check localStorage in browser DevTools
- Verify `AuthInitializer` is running
- Check if localStorage is enabled

### Infinite redirects
- Ensure `AuthInitializer` completes before rendering routes
- Check Redux state in Redux DevTools

### API requests failing
- Verify base URL is correct
- Check network tab for actual requests
- Ensure backend is running and accessible

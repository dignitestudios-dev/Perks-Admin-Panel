'use client';

import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { store } from '@/lib/store';
import { queryClient } from '@/lib/api/query-client';
import { authAPI } from '@/lib/api/auth.api';
import { initializeAuth } from '@/lib/slices/authSlice';

/**
 * Auth Initializer Component
 * Restores authentication state from localStorage on app startup
 */
function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize auth state from localStorage on mount
    const user = authAPI.getCurrentUser();
    const token = authAPI.getToken();
    
    dispatch(
      initializeAuth({
        user,
        token,
      })
    );
  }, [dispatch]);

  return <>{children}</>;
}

/**
 * Root Providers Component
 * Sets up Redux and TanStack Query providers
 * Wraps the entire application with necessary context
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthInitializer>
          {children}
        </AuthInitializer>
      </QueryClientProvider>
    </Provider>
  );
}
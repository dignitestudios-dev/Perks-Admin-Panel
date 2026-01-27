'use client';

import { useEffect, ReactNode } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { store } from '@/lib/store';
import { queryClient } from '@/lib/api/query-client';
import { authAPI } from '@/lib/api/auth.api';
import { initializeAuth } from '@/lib/slices/authSlice';

/**
 * Initialize Redux store with auth data from localStorage
 * This runs synchronously before the app renders
 */
function initializeReduxStore() {
  const user = authAPI.getCurrentUser();
  const token = authAPI.getToken();
  
  if (token && user) {
    store.dispatch(
      initializeAuth({
        user,
        token,
      })
    );
  }
}

// Initialize on module load
if (typeof window !== 'undefined') {
  initializeReduxStore();
}

/**
 * Auth Initializer Component
 * Ensures auth state is properly initialized on client-side navigation
 */
function AuthInitializer({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Re-initialize on mount to ensure consistency
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
export function Providers({ children }: { children: ReactNode }) {
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
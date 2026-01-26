'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface PublicRouteProps {
  children: React.ReactNode;
}

/**
 * Public Route Component
 * Redirects authenticated users away from public pages (like login)
 * Production-level implementation with proper loading states
 */
export function PublicRoute({ children }: PublicRouteProps) {
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const isLoading = useSelector(
    (state: RootState) => state.auth.isLoading
  );

  useEffect(() => {
    // Only redirect if not loading and already authenticated
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  // Don't render children if authenticated
  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
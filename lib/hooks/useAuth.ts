import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { authAPI, SignInRequest, SignInResponse, User } from "@/lib/api/auth.api";
import {
  setLoading,
  signInSuccess,
  signInFailure,
  signOut,
} from "@/lib/slices/authSlice";

/**
 * Sign in mutation hook
 * Handles user sign in with email, password, and role
 * Integration with Redux for state management
 */
export const useSignIn = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async (credentials: SignInRequest) => {
      dispatch(setLoading(true));
      return await authAPI.signIn(credentials);
    },
    onSuccess: (response: SignInResponse) => {
      dispatch(
        signInSuccess({
          user: response.data.user,
          token: response.data.token,
        })
      );
    },
    onError: (error: any) => {
      const errorMessage =
        error?.message || "An error occurred during sign in";
      dispatch(signInFailure(errorMessage));
    },
  });
};

/**
 * Sign out mutation hook
 * Clears user session and local storage
 */
export const useSignOut = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async () => {
      return await authAPI.signOut();
    },
    onSuccess: () => {
      dispatch(signOut());
    },
    onError: (error: any) => {
      console.error("Sign out error:", error);
      // Still dispatch sign out even if API call fails
      dispatch(signOut());
    },
  });
};

/**
 * Get current user query hook
 * Fetches user data from localStorage or API
 */
export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: () => {
      const user = authAPI.getCurrentUser();
      if (!user) {
        throw new Error("No user found");
      }
      return user;
    },
    staleTime: Infinity, // Don't refetch unless invalidated
    gcTime: 24 * 60 * 60 * 1000, // Keep in cache for 24 hours
    retry: false, // Don't retry on failure
  });
};

/**
 * Check authentication status
 * Returns true if user is authenticated and has a token
 */
export const useIsAuthenticated = () => {
  return useQuery({
    queryKey: ["isAuthenticated"],
    queryFn: () => authAPI.isAuthenticated(),
    staleTime: Infinity,
    gcTime: 24 * 60 * 60 * 1000,
    retry: false,
  });
};

/**
 * Get auth token hook
 * Returns the stored authentication token
 */
export const useAuthToken = () => {
  return useQuery({
    queryKey: ["authToken"],
    queryFn: () => {
      const token = authAPI.getToken();
      if (!token) {
        throw new Error("No token found");
      }
      return token;
    },
    staleTime: Infinity,
    gcTime: 24 * 60 * 60 * 1000,
    retry: false,
  });
};

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * User interface matching backend response
 */
export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user" | "store";
  [key: string]: any;
}

/**
 * Auth state interface
 */
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

/**
 * Initial state with proper types
 */
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

/**
 * Auth slice - manages authentication state
 * Production-level implementation with proper actions
 */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * Set loading state
     */
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    /**
     * Sign in success - store user and token
     */
    signInSuccess: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },

    /**
     * Sign in failure - store error message
     */
    signInFailure: (state, action: PayloadAction<string>) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = action.payload;
    },

    /**
     * Sign out - clear all auth data
     */
    signOut: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },

    /**
     * Initialize auth from localStorage (on app startup)
     */
    initializeAuth: (
      state,
      action: PayloadAction<{ user: User | null; token: string | null }>
    ) => {
      if (action.payload.token && action.payload.user) {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      } else {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      }
      state.isLoading = false;
      state.error = null;
    },

    /**
     * Update user data
     */
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    /**
     * Clear error message
     */
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  signInSuccess,
  signInFailure,
  signOut,
  initializeAuth,
  updateUser,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;

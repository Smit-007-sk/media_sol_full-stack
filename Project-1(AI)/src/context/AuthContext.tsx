"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { UserProfile, loginApi, getMeApi } from '@/api/auth';
import { getStoredToken, setStoredToken, getStoredUser, setStoredUser } from '@/api/client';

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  isAdmin: boolean;
  isStaff: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isRefreshingRef = useRef<boolean>(false);
  const isMountedRef = useRef<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    isMountedRef.current = true;
    // Initial sync from localStorage for immediate 0ms load on refresh
    const initialToken = getStoredToken();
    const initialUser = getStoredUser();

    if (initialToken) {
      setToken(initialToken);
    }
    if (initialUser) {
      setUser(initialUser);
      setIsLoading(false);
    }

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const logout = useCallback(() => {
    setStoredToken(null);
    setStoredUser(null);
    if (isMountedRef.current) {
      setToken(null);
      setUser(null);
      setIsLoading(false);
    }
    if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
      router.push('/login');
    }
  }, [router]);

  const refreshUser = useCallback(async () => {
    if (isRefreshingRef.current) return;
    isRefreshingRef.current = true;

    const currentToken = getStoredToken();
    if (!currentToken) {
      if (isMountedRef.current) {
        setUser(null);
        setToken(null);
        setStoredUser(null);
        setIsLoading(false);
      }
      isRefreshingRef.current = false;
      return;
    }

    if (isMountedRef.current) {
      setToken(currentToken);
    }

    try {
      const res = await getMeApi();
      if (isMountedRef.current) {
        if (res && res.success && res.data) {
          setUser(res.data);
          setStoredUser(res.data);
        } else {
          setStoredToken(null);
          setStoredUser(null);
          setToken(null);
          setUser(null);
        }
      }
    } catch (err: any) {
      console.warn('Session verification failed:', err?.message || err);
      if (isMountedRef.current) {
        setStoredToken(null);
        setStoredUser(null);
        setToken(null);
        setUser(null);
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
      isRefreshingRef.current = false;
    }
  }, []);

  // Run session verification on mount
  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await loginApi({ email, password });
      if (res.success && res.data) {
        const { accessToken, user: userProfile } = res.data;
        setStoredToken(accessToken);
        setStoredUser(userProfile);
        if (isMountedRef.current) {
          setToken(accessToken);
          setUser(userProfile);
          setIsLoading(false);
        }
        router.push('/dashboard');
      } else {
        throw new Error('Login failed');
      }
    } catch (err) {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
      throw err;
    }
  };

  const isAdmin = user?.role === 'ADMIN';
  const isStaff = user?.role === 'STAFF';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        logout,
        refreshUser,
        isAdmin,
        isStaff,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

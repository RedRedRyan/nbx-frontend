'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import useAuthStore from '@/lib/auth/auth-store';

interface AuthGuardProps {
  children: React.ReactNode;
}

// Define public routes that don't require authentication
const publicRoutes = ['/', '/auth/login', '/auth/register', '/market'];

// Define route access based on account type
const routeAccess = {
  // Routes accessible by individual investors
  investor: ['/portfolio', '/market', '/market/1'],

  // Routes accessible by institutions
  institution: ['/institution-dashboard', '/portfolio', '/market', '/trade', '/bulk-transactions'],

  // Routes accessible by companies
  company: ['/dashboard', '/token-listing', '/dividends'],

  // Routes accessible by regulators
  regulator: ['/regulator-dashboard', '/approvals', '/compliance'],
};

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, accountType } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Allow access to public routes regardless of authentication status
    if (publicRoutes.includes(pathname)) {
      return;
    }

    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    // If authenticated but trying to access a route not allowed for their account type
    if (accountType && !isRouteAllowedForAccountType(pathname, accountType)) {
      // Redirect to the appropriate dashboard based on account type
      switch (accountType) {
        case 'investor':
          router.push('/portfolio');
          break;
        case 'institution':
          router.push('/institution-dashboard');
          break;
        case 'company':
          router.push('/dashboard');
          break;
        case 'regulator':
          router.push('/regulator-dashboard');
          break;
        default:
          router.push('/');
      }
    }
  }, [isAuthenticated, accountType, pathname, router]);

  // Helper function to check if a route is allowed for a specific account type
  function isRouteAllowedForAccountType(route: string, type: string): boolean {
    // Check if the route starts with any of the allowed routes for the account type
    return routeAccess[type as keyof typeof routeAccess]?.some(
      (allowedRoute) => route === allowedRoute || route.startsWith(`${allowedRoute}/`)
    ) || false;
  }

  return <>{children}</>;
}

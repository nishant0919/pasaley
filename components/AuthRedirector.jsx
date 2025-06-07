'use client';

import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthRedirector() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === 'authenticated') {
      if (pathname === '/' || pathname === '/login') {
        if (session.user?.isProfileComplete) {
          router.replace('/admin');
        } else {
          router.replace('/onboarding');
        }
      }
    }
  }, [status, session, pathname]);

  return null;
}

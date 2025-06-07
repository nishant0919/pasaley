'use client';

import LoadingScreen from '@/components/LoadingScreen';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardRedirect() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.replace('/login');
      return;
    }

    if (session.user.isProfileComplete) {
      router.replace('/admin');
    } else {
      router.replace('/onboarding');
    }
  }, [session, status, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-700 dark:text-gray-300">
      <LoadingScreen />
      <p className="text-sm">Please wait while we redirect you to the appropriate page.</p>
    </div>
  );
}

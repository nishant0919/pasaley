'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminPanel() {
  const { data: session, status } = useSession();  // Check session status
  const router = useRouter();

  // Redirect to login page if user is not authenticated
  useEffect(() => {
    if (status === 'loading') return;  // Prevent checking before session is loaded
    if (!session) {
      router.push('/login');  // Redirect unauthenticated users to login page
    }
  }, [session, status]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Admin Panel</h1>
      {/* Admin Panel content */}
    </div>
  );
}

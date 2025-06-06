'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminPanel() {
  const { data: session, status } = useSession();  
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; 
    if (!session) {
      router.push('/login');  
    }
  }, [session, status]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Admin Panel</h1>
    </div>
  );
}

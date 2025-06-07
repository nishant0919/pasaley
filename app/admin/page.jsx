'use client';

import LoadingScreen from '@/components/LoadingScreen';
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
    return <div><LoadingScreen/></div>;
  }

  return (
    router.push('/admin/home')
  );
}

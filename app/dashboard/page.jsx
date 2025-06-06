'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stores, setStores] = useState([]);

  useEffect(() => {
    if (status === 'authenticated') {
      if (!session.user.isProfileComplete) {
        router.push('/onboarding'); 
      } else {
        router.push('/admin');
      }
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return <p className="text-center p-4">Loading...</p>;
  }

  return null; 
}

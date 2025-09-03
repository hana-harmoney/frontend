'use client';

import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDelegatePageStatus } from '@/stores/useDelegatePageStatus';
import DelegateWritePage from './pages/DelegateWritePage';
import DelegateInitPage from './pages/DelegateInitPage';
import DelegateSuccessPage from './pages/DelegateSuccessPage';
import DelegateErrorPage from './pages/DelegateErrorPage';

export default function ProfileDelegatePage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const { status, setStatus } = useDelegatePageStatus((state) => state);

  useEffect(() => {
    (async () => {
      try {
        await fetch('/api/auth/delegate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: token }),
        });
      } catch (e) {
        setStatus('error');
        console.error(e);
      }
    })();
  }, [token, status, setStatus]);

  if (status === 'init') {
    return <DelegateInitPage />;
  }
  if (status === 'writing') {
    return <DelegateWritePage />;
  }
  if (status === 'success') {
    return <DelegateSuccessPage />;
  }
  if (status === 'error') {
    return <DelegateErrorPage />;
  }

  return <div></div>;
}

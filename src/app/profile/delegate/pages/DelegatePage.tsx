'use client';

import React, { useEffect } from 'react';
import { useDelegatePageStatus } from '@/stores/useDelegatePageStatus';
import DelegateWritePage from './DelegateWritePage';
import DelegateInitPage from './DelegateInitPage';
import DelegateSuccessPage from './DelegateSuccessPage';
import DelegateErrorPage from './DelegateErrorPage';

type Props = {
  token: string;
};

export default function DelegatePage({ token }: Props) {
  const { status, setStatus } = useDelegatePageStatus((state) => state);

  useEffect(() => {
    if (!token) {
      setStatus('error');
      return;
    }

    (async () => {
      try {
        const res = await fetch('/api/auth/delegate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: token }),
        });

        if (res.status !== 200) throw Error();
      } catch (e) {
        setStatus('error');
        console.error(e);
      }
    })();
  }, [setStatus]);

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

'use client';

import { fetchPocketList } from '@/lib/api/home';
import { AccountInfo } from '@/types/pocket';
import { useEffect, useMemo, useState } from 'react';

export function useAccount() {
  const [data, setData] = useState<AccountInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchPocketList()
      .then((res) => setData(res.result))
      .catch((e) => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return useMemo(
    () => ({ data, isLoading, isError }),
    [data, isLoading, isError],
  );
}

import { fetchPocketList } from '@/lib/api/home';
import { AccountInfo } from '@/types/pocket';
import { useEffect, useMemo, useState } from 'react';

export function useAccount() {
  const [data, setData] = useState<AccountInfo | null>(null);

  useEffect(() => {
    fetchPocketList()
      .then((res) => setData(res.result))
      .catch((e) => {});
  }, []);

  return useMemo(() => ({ data }), [data]);
}

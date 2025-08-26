'use client';

import { fetchProfile } from '@/lib/api/profile';
import { MyProfile } from '@/types/profile';
import { useEffect, useMemo, useState } from 'react';

export function useMyProfile() {
  const [data, setData] = useState<MyProfile | null>(null);

  useEffect(() => {
    fetchProfile()
      .then(setData)
      .catch((e) => { });
  }, []);

  return useMemo(() => ({ data }), [data]);
}

'use client';

import { fetchProfile } from '@/lib/api/profile';
import { fetchProfileResponse } from '@/types/profile';
import { useEffect, useMemo, useState } from 'react';

export function useMyProfile() {
  const [data, setData] = useState<fetchProfileResponse | null>(null);

  useEffect(() => {
    fetchProfile()
      .then(setData)
      .catch((e) => { });
  }, []);

  return useMemo(() => ({ data }), [data]);
}

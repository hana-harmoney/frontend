'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import ReviewDialog from './ReviewDialog';

type Props = {
  roomId: number;
};

export default function ReviewButton({ roomId }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button
        className="w-full text-xl font-medium"
        variant={'secondary'}
        onClick={() => setOpen(true)}
      >
        후기 쓰기
      </Button>

      <ReviewDialog roomId={roomId} open={open} onOpenChange={setOpen} />
    </div>
  );
}

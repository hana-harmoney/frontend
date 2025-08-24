import { Input } from '@/components/ui/input';
import * as React from 'react';
import { cn } from '@/lib/utils';

function CustomInput({ className, ...props }: React.ComponentProps<'input'>) {
  return (
    <Input
      className={cn(
        'placeholder:text-gray px-4 py-6 text-xl font-normal',
        className,
      )}
      {...props}
    />
  );
}

export { CustomInput };

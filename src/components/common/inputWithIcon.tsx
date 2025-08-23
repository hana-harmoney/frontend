import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import React from 'react';

interface InputWithIconProps extends React.ComponentProps<'input'> {
  icon: React.ReactNode;
}

function InputWithIcon({ icon, className, ...props }: InputWithIconProps) {
  return (
    <div className="relative w-full">
      <Input
        className={cn(
          'placeholder:text-gray px-4 py-6 pr-10 text-xl font-normal',
          className,
        )}
        {...props}
      />
      <span className="absolute top-1/2 right-3 -translate-y-1/2">{icon}</span>
    </div>
  );
}

export { InputWithIcon };

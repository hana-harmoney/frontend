'use client';

import * as React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

type HTMLInputType = React.HTMLInputTypeAttribute;

type TextFieldProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size'
> & {
  label: React.ReactNode;
  error?: string;
  description?: React.ReactNode;
  containerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
};

export function InputWithLabel({
  id,
  name,
  label,
  type = 'text',
  placeholder,
  error,
  description,
  required,
  disabled,
  className,
  containerClassName,
  inputClassName,
  labelClassName,
  ...inputProps
}: TextFieldProps) {
  const reactId = React.useId();
  const fieldId = id ?? reactId;
  const descId = description ? `${fieldId}-desc` : undefined;
  const errId = error ? `${fieldId}-err` : undefined;

  const [showPw, setShowPw] = React.useState(false);
  const isPassword = type === 'password';
  const actualType: HTMLInputType =
    isPassword && showPw ? 'text' : (type as HTMLInputType);

  return (
    <div className={cn('flex w-full flex-col gap-2.5', containerClassName)}>
      <Label
        htmlFor={fieldId}
        className={cn('px-1 text-xl font-light', labelClassName)}
      >
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>

      <div className="relative">
        <Input
          id={fieldId}
          name={name}
          type={actualType}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={
            [descId, errId].filter(Boolean).join(' ') || undefined
          }
          className={cn(
            'h-14 pr-10', // 우측 아이콘 여백
            error && 'border-destructive focus-visible:ring-destructive',
            inputClassName,
          )}
          {...inputProps}
        />

        {isPassword && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setShowPw((v) => !v)}
            className="absolute top-1/2 right-2 h-8 w-8 -translate-y-1/2"
            aria-label={showPw ? '비밀번호 숨기기' : '비밀번호 보기'}
          >
            {showPw ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>

      {description && !error && (
        <p id={descId} className="text-muted-foreground px-1 text-sm">
          {description}
        </p>
      )}

      {error && (
        <p id={errId} className="text-destructive px-1 text-sm">
          {error}
        </p>
      )}
    </div>
  );
}

export default InputWithLabel;

'use client';

import * as React from 'react';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type DatePickerProps = {
  label?: string;
  placeholder?: string;
  id?: string;
  value?: Date | undefined;
  defaultValue?: Date | undefined;
  onChange?: (date: Date | undefined) => void;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  locale?: string;
  formatOptions?: Intl.DateTimeFormatOptions;
  className?: string;
};

function formatDate(
  date: Date | undefined,
  locale = 'en-US',
  formatOptions: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  },
) {
  if (!date || Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString(locale, formatOptions);
}

function isValidDate(date: Date | undefined) {
  return !!date && !Number.isNaN(date.getTime());
}

export function DatePicker({
  label = 'Subscription Date',
  placeholder = 'June 01, 2025',
  id = 'date',
  value,
  defaultValue,
  onChange,
  name,
  disabled,
  required,
  locale = 'ko-KR',
  formatOptions,
  className,
}: DatePickerProps) {
  const isControlled = typeof value !== 'undefined';
  const [open, setOpen] = React.useState(false);
  const [innerDate, setInnerDate] = React.useState<Date | undefined>(
    isControlled ? value : defaultValue,
  );
  const date = isControlled ? value : innerDate;
  const [month, setMonth] = React.useState<Date | undefined>(date);
  const [inputValue, setInputValue] = React.useState(
    formatDate(date, locale, formatOptions),
  );

  // 외부 value가 바뀌면 인풋/달력 동기화
  React.useEffect(() => {
    if (isControlled) {
      setInputValue(formatDate(value, locale, formatOptions));
      setMonth(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, isControlled, locale]);

  const commitDate = (next?: Date) => {
    if (!isControlled) setInnerDate(next);
    onChange?.(next);
  };

  return (
    <div className={`flex flex-col gap-3 ${className ?? ''}`}>
      <Label htmlFor={id} className="px-1">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </Label>

      <div className="relative flex gap-2">
        <Input
          id={id}
          name={name}
          value={inputValue}
          placeholder={placeholder}
          className="bg-background pr-10"
          disabled={disabled}
          required={required}
          onChange={(e) => {
            const raw = e.target.value;
            setInputValue(raw);

            // 간단 파싱: 사용자가 포맷대로 입력하면 new Date가 해석
            const parsed = new Date(raw);
            if (isValidDate(parsed)) {
              commitDate(parsed);
              setMonth(parsed);
            }
          }}
          onBlur={() => {
            // 포맷 정규화: 포커스 아웃 시 보기 좋게 포맷 적용
            setInputValue(formatDate(date, locale, formatOptions));
          }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setOpen(true);
            }
            if (e.key === 'Escape') {
              setOpen(false);
            }
          }}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={`${id}-popover`}
        />

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              id={`${id}-trigger`}
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
              disabled={disabled}
              aria-label="달력 열기"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">날짜를 선택해주세요</span>
            </Button>
          </PopoverTrigger>

          <PopoverContent
            id={`${id}-popover`}
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={(d) => {
                commitDate(d);
                setInputValue(formatDate(d, locale, formatOptions));
                setOpen(false);
              }}
              disabled={disabled}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

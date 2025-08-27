import { useMemo, useState, useEffect } from 'react';
import { formatNumber } from '@/lib/utils';

type NumericKeypadProps = {
  value?: string;
  onChange?: (v: string) => void;
  onSubmit?: (v: string) => void;
  maxLength?: number;
  shuffle?: boolean;
  showWonSuffix?: boolean;
  className?: string;
  isAccount?: boolean;
};

const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

export const NumericKeypad: React.FC<NumericKeypadProps> = ({
  value,
  onChange,
  maxLength = 9,
  shuffle = false,
  showWonSuffix = true,
  className = '',
  isAccount,
}) => {
  const [internal, setInternal] = useState<string>(value ?? '');

  useEffect(() => {
    if (value !== undefined && value !== internal) setInternal(value);
  }, [value]);

  const onlyDigits = (s: string) => s.replace(/\D+/g, '');
  const stripLeadingZero = (s: string) => s.replace(/^0+(?=\d)/, '');

  const setVal = (next: string) => {
    const normalized = stripLeadingZero(onlyDigits(next)).slice(0, maxLength);
    setInternal(normalized);
    onChange?.(normalized);
  };

  const handleDigit = (d: string) => {
    if (internal.length >= maxLength) return;
    setVal(internal + d);
  };

  const handleBackspace = () => {
    setVal(internal.slice(0, -1));
  };

  const handleClear = () => {
    setVal('');
  };

  const keys = useMemo(() => {
    if (!shuffle) return digits;
    const arr = [...digits];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [shuffle, internal]); // 입력 때마다 섞이게 하려면 internal도 의존

  const display =
    internal === ''
      ? showWonSuffix
        ? '0 원'
        : '0'
      : showWonSuffix
        ? `${formatNumber(Number(internal))} 원`
        : formatNumber(Number(internal));

  return (
    <div className={`w-full ${className} `}>
      {!isAccount && (
        <div className="text-gray mb-3 rounded-md border bg-white px-4 py-2 text-right text-xl">
          {display}
        </div>
      )}

      <div className="grid grid-cols-3 gap-2 text-2xl font-semibold">
        {keys.slice(0, 9).map((k) => (
          <button key={k} onClick={() => handleDigit(k)} className="py-4">
            {k}
          </button>
        ))}

        <button onClick={handleBackspace} className="py-4">
          ⌫
        </button>

        <button onClick={() => handleDigit('0')} className="py-4">
          0
        </button>
        <button onClick={handleClear} className="py-4">
          전체삭제
        </button>
      </div>
    </div>
  );
};

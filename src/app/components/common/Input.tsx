import { Colors } from '@/constant/style';
import { useImperativeHandle, useState, forwardRef } from '@lynx-js/react';
import { useEffect, useRef } from 'react';

export interface InputRef {
  getValue: () => string;
  setValue: (newValue: string) => void;
  setError: (errorMessage: string[] | null) => void;
  getError: () => string[] | null;
}

export interface InputValidation {
  pattern: RegExp;
  message: string;
}

interface InputProps {
  title: string;
  variant?: string;
  icon?: string;
  bindChange?: () => void;
}

const Input = forwardRef<InputRef, InputProps>(
  ({ title, variant, icon, bindChange }, ref) => {
    const [focused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const timerRef = useRef<number | null>(null);
    const [debouncedValue, setDebouncedValue] = useState<string>('');
    const isFloating = focused || debouncedValue.length > 0;
    const [error, setError] = useState<string[] | null>(null);

    useEffect(() => {
      setError(null);
      setDebouncedValue('');
      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    }, []);

    useEffect(() => {
      bindChange?.();
    }, [debouncedValue]);

    useImperativeHandle(
      ref,
      () => ({
        getValue: () => debouncedValue,
        setValue: (newValue) => {
          setDebouncedValue(newValue);
          if (timerRef.current) clearTimeout(timerRef.current);
        },
        setError: (message: string[] | null) => setError(message),
        getError: () => error,
      }),
      [debouncedValue, error],
    );

    const handleInput = (res: any) => {
      const newValue = res;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        setDebouncedValue(newValue);
      }, 300) as unknown as number;
    };

    return (
      <view class="relative w-full min-h-14 ">
        {/* Floating Label */}

        <view class="z-10">
          <text
            class={`absolute  transition-all duration-300 
            ${
              isFloating
                ? '-top-3 text-sm text-gray-600  px-2 rounded left-3'
                : 'top-4 text-lg text-gray-500  left-6'
            }`}
            style={{ backgroundColor: Colors.Background }}
          >
            {title}
          </text>
        </view>

        <view
          class={`flex transition-all duration-300 items-center border border-2 ${isFloating ? 'border-blue-300' : 'border-gray-200'}  rounded-xl px-4 py-4 ${error ? 'border-red-500' : ''}`}
        >
          <input
            type={variant === 'password' && !showPassword ? 'password' : 'text'}
            bindfocus={() => setFocused(true)}
            bindblur={() => {
              if (debouncedValue.length === 0) {
                setFocused(false);
              }
            }}
            bindinput={(res: any) => {
              handleInput(res.detail.value);
            }}
            class="bg-transparent w-full h-full text-lg outline-none ml-1 relative z-20"
            style={{ color: Colors.Neutral }}
          />
          {variant === 'password' && (
            <text
              class="text-gray-500 cursor-pointer"
              bindtap={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'H' : 'S'}
            </text>
          )}
        </view>
        <view className={` py-2 ${error ? 'block' : 'hidden'}`}>
          {error && <text className="text-red-500 mt-1">{error[0]}</text>}
        </view>
      </view>
    );
  },
);

export default Input;

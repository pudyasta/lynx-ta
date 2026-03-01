import { eye, eyeClose } from '../../assets/images/icon';
import { Colors } from '../../constant/style';
import { useImperativeHandle, useState, forwardRef } from '@lynx-js/react';
import { useEffect, useRef } from 'react';
import Text from '../Text';

import style from './Input.module.css';

export interface InputRef {
  getValue: () => string;
  setValue: (newValue: string) => void;
  setError: (errorMessage: string | null) => void;
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
        setError: (message: string | null) =>
          setError(message ? [message] : null),
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
      <view className={style.container}>
        <Text
          style={{ backgroundColor: Colors.Background, marginBottom: '8px' }}
        >
          {title}
        </Text>

        <view
          className={style.input}
          style={{
            borderColor: error
              ? Colors.Error
              : isFloating
                ? Colors.Primary
                : Colors.Accent,
          }}
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
              {!showPassword ? (
                <image src={eyeClose} className="w-8 h-6" mode="aspectFit" />
              ) : (
                <image src={eye} className="w-8 h-6" mode="aspectFit" />
              )}
            </text>
          )}
        </view>
        <view className={` py-2 ${error ? 'block' : 'hidden'}`}>
          {error && <Text color="red">{error[0]}</Text>}
        </view>
      </view>
    );
  },
);

export default Input;

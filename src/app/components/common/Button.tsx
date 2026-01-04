import { useState, type ReactNode } from '@lynx-js/react';

interface ButtonProps {
  children: ReactNode;
  color?: 'red' | 'green' | 'blue' | 'yellow';
  onPress?: () => void;
  disabled?: boolean;
  variant?: 'solid' | 'outline';
}

const colorStyles: Record<NonNullable<ButtonProps['color']>, string> = {
  red: 'bg-red-500',
  green: 'bg-green-500',
  blue: 'bg-blue-500',
  yellow: 'bg-yellow-500',
};

const borderColorStyles: Record<NonNullable<ButtonProps['color']>, string> = {
  red: 'border-red-500',
  green: 'border-green-500',
  blue: 'border-blue-500',
  yellow: 'border-yellow-500',
};

const textColorStyles: Record<NonNullable<ButtonProps['color']>, string> = {
  red: 'text-red-500',
  green: 'text-green-500',
  blue: 'text-blue-500',
  yellow: 'text-yellow-500',
};

const Button: React.FC<ButtonProps> = ({
  children,
  color = 'green',
  variant = 'solid',
  onPress,
  disabled = false,
}) => {
  const [animate, setAnimate] = useState(false);

  const handleTap = () => {
    if (disabled) return;
    setAnimate(true);
    onPress?.();

    setTimeout(() => setAnimate(false), 500);
  };

  return (
    <text
      className={`
        w-full text-white text-center rounded-xl py-4 font-bold transition-all duration-500 ease-out  
        ${variant === 'solid' ? colorStyles[color] : ` bg-transparent border-2 ${borderColorStyles[color]} ${textColorStyles[color]}`} 
         ${variant === 'solid' ? 'bg-opacity-80' : ''}
        ${animate ? 'animate-press-bounce' : ''} 
        ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-400 border-gray-400' : ''}
      `}
      bindtap={handleTap}
    >
      {children}
    </text>
  );
};

export default Button;

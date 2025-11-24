import React, { useState } from 'react';

interface InputProps {
  title: string;
  variant?: string;
  icon?: string;
}

const Input: React.FC<InputProps> = ({ title, variant, icon }) => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');

  const isFloating = focused || value.length > 0;

  return (
    <view class="relative w-full h-16 mt-6 ">
      {/* Floating Label */}
      <text
        class={`absolute  transition-all duration-300 z-10 
          ${
            isFloating
              ? '-top-3 text-sm text-gray-600 bg-white px-2 rounded left-3'
              : 'top-4 text-xl text-gray-500  left-6'
          }`}
      >
        {title}
      </text>

      {/* Input container */}
      <view
        class={`flex transition-all duration-300 items-center border ${isFloating ? 'border-gray-800' : 'border-gray-200'}  rounded-xl px-4 py-4`}
      >
        {icon && <image src={icon} class="h-full w-6 mr-2 opacity-70" />}

        <input
          type="text"
          bindfocus={() => setFocused(true)}
          bindblur={() => setFocused(false)}
          //   bindinput={(e) => setValue(e.target.value)}
          class="bg-transparent w-full h-full text-lg outline-none"
        />
      </view>
    </view>
  );
};

export default Input;

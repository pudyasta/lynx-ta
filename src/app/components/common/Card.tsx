import { useState } from '@lynx-js/react';
interface CardProps {
  children: React.ReactNode;
  bindTap?: (e: any) => void;
}
const Card: React.FC<CardProps> = ({ children, bindTap }) => {
  return (
    <view className="mb-3 p-4 rounded-2xl border border-gray-200 flex flex-row justify-between items-center bg-white">
      {children}
    </view>
  );
};
export default Card;

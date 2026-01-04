import { useState } from '@lynx-js/react';

export function Tabs({
  items,
  defaultIndex = 0,
  onChange,
}: {
  items: any[];
  defaultIndex?: number;
  onChange?: (i: number) => void;
}) {
  const [active, setActive] = useState(defaultIndex);
  const handleChange = (i: number) => {
    setActive(i);
    onChange?.(i);
  };
  return (
    <view className="w-full">
      {/* content */}
      <scroll-view className="min-h-screen bg-gray-100 flex flex-col">
        <view>{items[active]?.content}</view>
      </scroll-view>

      {/* TABS */}
      <view className="flex flex-row w-full bg-white fixed bottom-0">
        {items.map((item, i) => (
          <view
            key={item.key ?? i}
            bindtap={() => handleChange(i)}
            className={`py-6 pb-10 flex items-center justify-center w-full border-b-2 ${
              i === active ? 'border-b-[#1677ff]' : ''
            }`}
          >
            <text
              style={{
                color: i === active ? '#1677ff' : '#666666',
                fontWeight: i === active ? '600' : '400',
              }}
            >
              {item.label}
            </text>
          </view>
        ))}
      </view>
    </view>
  );
}

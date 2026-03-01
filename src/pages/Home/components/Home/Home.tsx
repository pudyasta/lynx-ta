import { loginBanner } from '@/assets/images/pages';
import { Colors } from '@/constant/style';
import style from './Home.module.css';

export default function LearningDashboard() {
  return (
    <scroll-view className="flex-1 pb-20" scroll-y>
      {/* Header Section */}
      <view
        style={{
          backgroundImage: `url(${loginBanner})`,
          backgroundSize: 'cover',
          overflow: 'hidden',
          backgroundPosition: 'center',
          minHeight: '22vh',
        }}
      >
        <view className="flex flex-row  justify-center items-center px-5 py-8">
          <view className="flex-1">
            <text className="text-white/50 text-md  mb-2">Good Morning,</text>
            <text className="text-white text-2xl font-bold mb-2">
              Alex Chen
            </text>
            <view className="flex flex-row">
              <view className="px-5 py-2 rounded-lg mr-2 bg-[#E23D3D]">
                <text className="text-black text-md font-bold text-white">
                  🔥 12
                </text>
                <text className="text-black text-md font-bold text-white">
                  days streak
                </text>
              </view>
              <view className="px-3 py-1 rounded-full bg-[#F7B500] flex items-center">
                <text className="text-white text-md font-bold">
                  ✨ +2450 XP
                </text>
              </view>
            </view>
          </view>
          <view className="w-[60px] h-[60px] rounded-full  flex items-center justify-center mr-4">
            <text className="text-xl text-white  font-bold">AC</text>
          </view>
        </view>
      </view>
      <view className="px-5 " style={{ backgroundColor: '#F1F3F5' }}>
        {/* Level Card */}
        <view className="rounded-2xl p-5 mb-8 shadow-lg mt-5 bg-white">
          <text className="  text-lg font-semibold mb-4">
            Level 10 - Explorer
          </text>
          <view className="h-[10px] bg-[#E9EBF0] rounded-full overflow-hidden mb-2">
            <view
              className="h-full rounded-full w-[70%]"
              style={{ backgroundColor: Colors.Primary }}
            />
          </view>
          <text className="text-sm">2,760 / 3,500 XP</text>
        </view>

        {/* Continue Learning */}
        <SectionHeader title="Continue Learning" />
        <view className="bg-white rounded-2xl p-4 flex flex-row items-center mb-6">
          <view className="w-[70px] h-[70px] bg-[#E9EBF0] rounded-xl mr-4" />
          <view className="flex gap-2 flex-col">
            <text className="  text-base font-bold">React Mastery</text>
            <text className="text-[#4A90E2] text-sm my-0.5">
              8 of 12 lessons{' - '}
              <text className="text-[#888] text-sm mb-2">
                Advanced Hooks & Patterns
              </text>
            </text>

            <view className="h-2 bg-[#E9EBF0] rounded-full">
              <view className="h-full bg-[#4A90E2] rounded-full w-[66%]" />
            </view>
          </view>
        </view>

        {/* Recent Achievements */}
        <SectionHeader title="Recent Achievements" />
        <scroll-view scroll-x className="flex flex-row mb-6">
          {[1, 2, 3, 4].map((i) => (
            <view key={i} className="items-center mr-5">
              <view className="w-16 h-16 bg-[#E9EBF0] rounded-xl mb-2" />
              <text className="text-[#666] text-xs">Streak Master</text>
            </view>
          ))}
        </scroll-view>

        {/* Recommended */}
        <SectionHeader title="Recommended Course" />
        <view className="bg-white rounded-2xl p-6 items-start flex">
          <view className="w-[85px] h-[85px] bg-[#E9EBF0] rounded-xl mr-4" />
          <view className="flex flex-col">
            <view className="bg-[#86C38F] px-3 py-1 rounded-full mb-3 relative">
              <text className="text-white text-[12px] relative">Beginner</text>
            </view>
            <text className="  text-xl font-bold mb-2">
              Next.js Fundamentals
            </text>
            <text className="text-[#888] text-sm">24 lessons - 8h 30min</text>
          </view>
        </view>
      </view>
    </scroll-view>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <view className="flex flex-row justify-between items-center mb-4">
      <text className="  text-xl font-bold">{title}</text>
      <text className=" text-sm" style={{ color: Colors.Primary }}>
        See All &gt;
      </text>
    </view>
  );
}

// --- Imports (Conceptual, not actual imports) ---
// import { IoMdPencil, IoMdExit, IoHomeOutline, IoBookOutline, IoStatsChartOutline, IoPerson } from 'react-icons/io';
// import { FaTarget, FaFire, FaBolt } from 'react-icons/fa';
// import StatTile from './StatTile';
// import AchievementBadge from './AchievementBadge';
// import NavIcon from './NavIcon';

import { useNavigate } from 'react-router';
import Button from '../../../../components/common/Button';
import AchievementBadge from '../AchievementBadge';
import StatTile from '../StatTile';
import { useAuth } from '../../../../context/AuthProvider';

export const ProfileScreen = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  // --- Component Data ---
  const userData = {
    name: 'DemoUser',
    bio: 'Learning enthusiast!',
    streak: 7,
    level: 3,
    currentXP: 1250,
    neededXP: 1500,
    totalXP: 1250,
    lessons: 0,
    courses: 1,
  };

  const achievements = [
    {
      title: 'First Steps',
      icon: 'FaTarget',
      description: 'first lesson',
      colorClass: 'bg-red-500',
    },
    {
      title: 'On Fire',
      icon: 'FaFire',
      description: 'day streak',
      colorClass: 'bg-red-500',
    },
    {
      title: 'Week',
      icon: 'FaBolt',
      description: 'Maintain a 7-day streak',
      colorClass: 'bg-yellow-500',
    },
  ];
  // --- Helper Functions ---
  const progressPercent = (userData.currentXP / userData.neededXP) * 100;

  const UserProfileCard = () => (
    <view className="bg-blue-500 p-8 pt-4 flex flex-col items-center">
      {/* Avatar (Placeholder 'D') */}
      <view className="w-24 h-24 bg-white rounded-full flex items-center justify-center border-4 border-white shadow-lg">
        <text className="text-5xl font-bold text-blue-600">D</text>
      </view>

      <text className="text-2xl font-semibold text-white mt-4">
        {userData.name}
      </text>
      <text className="text-sm text-white opacity-90">{userData.bio}</text>

      {/* Streak Badge */}
      <view className="bg-yellow-400 rounded-full py-1 px-4 mt-3 flex items-center space-x-1 shadow-md">
        {/* <FaFire className="w-4 h-4 text-orange-700" /> */}
        <text className="text-sm font-bold text-orange-700">
          {userData.streak} days
        </text>
      </view>
    </view>
  );

  const LevelProgress = () => (
    <view className="p-4 pt-6 bg-white -mt-4 rounded-t-2xl shadow-lg">
      <view className="flex justify-between items-center mb-2">
        <text className="text-lg font-semibold text-gray-800">
          Level {userData.level}
        </text>
        <text className="text-sm text-gray-600">
          {userData.currentXP}/{userData.neededXP} XP
        </text>
      </view>

      {/* Progress Bar */}
      <view className="w-full bg-gray-200 rounded-full h-3">
        <view
          className="bg-blue-500 h-3 rounded-full"
          style={{ width: `${progressPercent}%` }}
        ></view>
      </view>
    </view>
  );

  return (
    <view className="min-h-screen bg-gray-100 flex flex-col">
      {/* <ProfileHeader /> */}

      {/* Main Content Area */}
      <view className="flex-1 overflow-y-auto">
        <UserProfileCard />
        <LevelProgress />

        {/* Stats Grid */}
        <view className="p-4 grid grid-cols-3 gap-3">
          <StatTile
            value={userData.totalXP}
            label="Total XP"
            isPrimary={true}
          />
          <StatTile
            value={userData.lessons}
            label="Lessons"
            isPrimary={false}
          />
          <StatTile
            value={userData.courses}
            label="Courses"
            isPrimary={false}
          />
        </view>

        {/* Achievements Section */}
        <view className="p-4 pt-2">
          <text className="text-xl font-bold text-gray-800 mb-4">
            Achievements
          </text>
          <view className="grid grid-cols-3 gap-4">
            {achievements.map((item, index) => (
              <AchievementBadge
                key={index}
                icon={item.icon}
                title={item.title}
                description={item.description}
                colorClass={item.colorClass}
              />
            ))}
          </view>
        </view>

        <view className="p-4 flex justify-center">
          <Button
            color="blue"
            onPress={() => {
              logout();
              navigate('/login');
            }}
            variant="solid"
          >
            Logout
          </Button>
        </view>
      </view>
    </view>
  );
};

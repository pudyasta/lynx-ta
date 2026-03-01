import Card from '../../../../../components/common/Card';
import { useState } from '@lynx-js/react';
interface CourseCardProps {
  bindTap?: (e: any) => void;
  course: {
    id: string;
    title: string;
    description: string;
    level: string;
    lessons: number;
    category: string;
    completed: boolean;
  };
}
const CourseCard: React.FC<CourseCardProps> = ({ bindTap, course }) => {
  return (
    <Card bindTap={bindTap}>
      <view className="flex flex-col gap-3 mr-3">
        <view className="flex flex-col items-start gap-2 ">
          <text className="text-xl font-semibold text-black">
            {course.title}
          </text>
          <view className="px-3 py-0.5 rounded-full bg-blue-100">
            <text className="text-sm text-gray-600">{course.level}</text>
          </view>
        </view>
        <text className="text-md text-gray-500">{course.description}</text>
        <view className="flex flex-row items-center gap-3">
          <text className="text-xs text-gray-500">
            📚 {course.lessons} lessons
          </text>
          <text className="text-xs text-gray-500">🏷 {course.category}</text>
        </view>
      </view>
      <view className="w-8 h-8 rounded-full flex items-center justify-center">
        {course.completed ? (
          <text className="text-green-500 text-xl">✔️</text>
        ) : (
          <text className="text-gray-300 text-xl">○</text>
        )}
      </view>
    </Card>
  );
};
export default CourseCard;

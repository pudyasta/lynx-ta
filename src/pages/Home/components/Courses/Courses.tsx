// Courses.tsx
import { useMemo, useState } from '@lynx-js/react';
import type { Category } from './type';
import { CATEGORIES, COURSES } from './data/courses';
import CourseCard from './components/CourseCard';
import CategoryLabel from './components/CategoryLabel';

const Courses: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [search, setSearch] = useState('');
  const filteredCourses = useMemo(
    () =>
      COURSES.filter((course) => {
        const matchCategory =
          activeCategory === 'All' || course.category === activeCategory;
        const lowered = search.toLowerCase();
        const matchSearch =
          !lowered ||
          course.title.toLowerCase().includes(lowered) ||
          course.description.toLowerCase().includes(lowered);
        return matchCategory && matchSearch;
      }),
    [activeCategory, search],
  );
  const handleSearchInput = (e: any) => {
    // Lynx input: value 在 e.detail.value
    setSearch(e?.detail?.value ?? '');
  };
  return (
    <view className="course-page h-full">
      <view className="px-4 pt-6 pb-4 flex flex-col gap-4">
        {/* Search bar */}
        <view className="w-full flex items-center bg-white rounded-xl px-3 py-3 border border-gray-300">
          <text className="text-gray-400 mr-2">🔍</text>
          <input
            className="flex-1 bg-transparent text-base text-black"
            placeholder="Search courses"
            bindinput={handleSearchInput}
          />
        </view>
        {/* Category tabs */}
        <view className="flex flex-row gap-2 mt-1">
          {CATEGORIES.map((cat) => {
            const active = cat === activeCategory;
            return (
              <CategoryLabel
                key={cat}
                isActive={active}
                category={cat}
                bindTap={() => setActiveCategory(cat)}
              />
            );
          })}
        </view>
      </view>

      {/* Course list */}
      <view className="flex-1 px-4 pb-6">
        {filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={{
              id: course.id,
              title: course.title,
              description: course.description,
              level: course.level,
              lessons: course.lessons,
              category: course.category,
              completed: true,
            }}
          />
        ))}
        {filteredCourses.length === 0 && (
          <view className="mt-8 items-center justify-center">
            <text className="text-gray-400 text-sm">
              No courses match your search.
            </text>
          </view>
        )}
      </view>
    </view>
  );
};
export default Courses;

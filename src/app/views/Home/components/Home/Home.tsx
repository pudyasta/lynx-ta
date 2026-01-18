function Home() {
  const progress = 0.6;
  return (
    <view
      style={{
        width: '100%',
        minHeight: '80vh',
        backgroundColor: '#f5f7fb',
        paddingTop: '32px',
        paddingBottom: '16px',
        paddingRight: '16px',
        paddingLeft: '16px',
      }}
    >
      {/* Top bar: greeting + notification */}
      <view
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
          display: 'flex',
        }}
      >
        <view>
          <text style={{ fontSize: '16px', color: '#888888' }}>
            Good Morning,
          </text>
          <text
            style={{
              marginTop: '4px',
              fontSize: '20px',
              fontWeight: '600',
              color: '#111827',
            }}
          >
            John Doe
          </text>
        </view>
        <view
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '16px',
            backgroundColor: '#ffffff',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
          }}
        >
          <text style={{ fontSize: '18px' }}>🔔</text>
        </view>
      </view>
      {/* Category + search */}
      <view
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '12px',
          display: 'flex',
        }}
      >
        <view className="w-full flex items-center bg-white rounded-xl px-3 py-3 border border-gray-300">
          <text className="text-gray-400 mr-2">🔍</text>
          <input
            className="flex-1 bg-transparent text-base text-black"
            placeholder="Search courses"
          />
        </view>
      </view>
      {/* Featured courses row */}
      <view
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: '16px',
          display: 'flex',
        }}
      >
        {[
          { title: 'Basic English for Class XIII', lessons: 28 },
          { title: 'General Knowledge', lessons: 28 },
        ].map((c) => (
          <view
            key={c.title}
            style={{
              width: '48%',
              borderRadius: '16px',
              backgroundColor: '#4f46e5',
              padding: '12px',
            }}
          >
            <text
              style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#ffffff',
                marginBottom: '8px',
              }}
            >
              {c.title}
            </text>
            <text style={{ fontSize: '12px', color: '#e5e7eb' }}>
              {c.lessons} Lessons
            </text>
          </view>
        ))}
      </view>
      {/* Where You Left */}
      <view
        style={{
          borderRadius: '16px',
          backgroundColor: '#ffffff',
          padding: '12px',
          marginBottom: '16px',
        }}
      >
        <text
          style={{
            fontSize: '14px',
            fontWeight: '600',
            marginBottom: '4px',
          }}
        >
          Where You Left
        </text>
        <text
          style={{ fontSize: '13px', color: '#4b5563', marginBottom: '8px' }}
        >
          How to get started
        </text>
        <view
          style={{
            height: '8px',
            borderRadius: '4px',
            backgroundColor: '#e5e7eb',
            overflow: 'hidden',
            marginBottom: '4px',
          }}
        >
          <view
            style={{
              width: `${progress * 100}%`,
              height: '100%',
              backgroundImage: 'linear-gradient(90deg,#4f46e5,#22c55e)',
            }}
          />
        </view>
        <text style={{ fontSize: '12px', color: '#6b7280' }}>
          60% completed
        </text>
      </view>
      {/* All Courses chips */}
      <view style={{ marginBottom: '16px' }}>
        <text
          style={{
            fontSize: '15px',
            fontWeight: '600',
            marginBottom: '8px',
          }}
        >
          All Courses
        </text>
        <view
          style={{ flexDirection: 'row', flexWrap: 'wrap', display: 'flex' }}
        >
          {['Literature', 'General Math', 'Language', 'Biology'].map((name) => (
            <view
              key={name}
              style={{
                padding: '6px 12px',
                borderRadius: '16px',
                backgroundColor: '#ffffff',
                marginRight: '8px',
                marginBottom: '8px',
              }}
            >
              <text style={{ fontSize: '12px' }}>{name}</text>
            </view>
          ))}
        </view>
      </view>
      {/* Recommended for You */}
      <view style={{ marginBottom: '16px' }}>
        <text
          style={{
            fontSize: '15px',
            fontWeight: '600',
            marginBottom: '8px',
          }}
        >
          Recommended for You
        </text>
        <view
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            display: 'flex',
            gap: '8px',
          }}
        >
          {[
            { title: 'Biology for Class XIII', author: 'Smith J.' },
            { title: 'Math for Class XIII', author: 'Smith J.' },
          ].map((c) => (
            <view
              key={c.title}
              style={{
                borderRadius: '14px',
                backgroundColor: '#ffffff',
                padding: '10px',
                marginBottom: '8px',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <view style={{ flex: 1, marginRight: '8px' }}>
                <text
                  style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    marginBottom: '4px',
                  }}
                >
                  {c.title}
                </text>
                <text style={{ fontSize: '12px', color: '#6b7280' }}>
                  {c.author}
                </text>
              </view>
            </view>
          ))}
        </view>
      </view>
      {/* Premium Courses */}
      <view style={{ marginBottom: '16px' }}>
        <text
          style={{
            fontSize: '15px',
            fontWeight: '600',
            marginBottom: '8px',
          }}
        >
          Premium Courses
        </text>
        <view
          style={{
            borderRadius: '16px',
            backgroundColor: '#111827',
            padding: '12px',
          }}
        >
          <text
            style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#ffffff',
              marginBottom: '6px',
            }}
          >
            Basic Math for Class XIII
          </text>
          <text
            style={{ fontSize: '12px', color: '#d1d5db', marginBottom: '6px' }}
          >
            by John Smith
          </text>
          <view style={{ flexDirection: 'row' }}>
            <text
              style={{
                fontSize: '12px',
                color: '#9ca3af',
                marginRight: '12px',
              }}
            >
              1.15 hours
            </text>
            <text style={{ fontSize: '12px', color: '#9ca3af' }}>
              12 lessons
            </text>
          </view>
        </view>
      </view>
      {/* Chat Support button */}
    </view>
  );
}
export default Home;

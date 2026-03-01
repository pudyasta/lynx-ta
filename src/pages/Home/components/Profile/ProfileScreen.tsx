import Card from '../../../../components/common/Card';
import icon from '../../../../assets/images/icon1.png';
import Button from '../../../../components/common/Button';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import type { User } from '../../../../repository/auth/type';
import { getPref, PrefKey } from '@/lib/helper/localStorage';
import { useAuth } from '../../../../context/AuthProvider';

function ProfileScreen() {
  const nav = useNavigate();
  const level = 4;
  const progress = 0.6; // 60% filled
  const { user, logout } = useAuth();

  useEffect(() => {}, []);
  return (
    <view
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#f5f7fb',
        paddingTop: '40px',
        padding: '0 20px',
      }}
    >
      <view class="flex flex-col h-[35vh] items-center  justify-center">
        {/* Avatar */}
        <view
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '60px',
            overflow: 'hidden',
            borderWidth: '3px',
            borderColor: '#ffffff',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            marginTop: '30px',
          }}
        >
          <image style={{ width: '100%', height: '100%' }} src={icon} />
        </view>
        {/* Name */}
        <text
          style={{
            marginTop: '16px',
            fontSize: '18px',
            fontWeight: '600',
            letterSpacing: '2px',
          }}
        >
          {user?.name}
        </text>
        <view style={{ marginTop: '20px', width: '100%' }}>
          <view
            style={{
              height: '40px',
              borderRadius: '20px',
              backgroundColor: '#ffffff',
              marginBottom: '10px',
            }}
          />
          <view
            style={{
              height: '40px',
              borderRadius: '20px',
              backgroundColor: '#ffffff',
              marginBottom: '10px',
            }}
          />
        </view>
      </view>

      {/* Level + progress bar */}
      <view
        style={{
          marginTop: '24px',
          width: '100%',
        }}
      >
        <view
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: '6px',
          }}
        >
          <text style={{ fontSize: '14px', fontWeight: '500' }}>
            Level {level}
          </text>
          <text style={{ fontSize: '12px', color: '#888888' }}>
            {Math.round(progress * 100)}%
          </text>
        </view>
        <view
          style={{
            height: '8px',
            borderRadius: '4px',
            backgroundColor: '#dde2f0',
            overflow: 'hidden',
          }}
        >
          <view
            style={{
              width: `${progress * 100}%`,
              height: '100%',
              backgroundImage: 'linear-gradient(90deg, #4f8cff, #6cf0ff)',
            }}
          />
        </view>
      </view>
      {/* Achievements grid */}
      <view
        style={{
          marginTop: '28px',
          width: '100%',
        }}
      >
        <text
          style={{
            fontSize: '16px',
            fontWeight: '600',
            marginBottom: '12px',
          }}
        >
          Achievements
        </text>
        <view
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          {Array.from({ length: 6 }).map((_, idx) => (
            <Card key={idx} className="w-[30%]">
              <view
                key={idx}
                style={{
                  width: '100%',
                  aspectRatio: '1',
                  borderRadius: '12px',
                  backgroundColor: '#ffffff',
                  marginBottom: '10px',
                }}
              />
            </Card>
          ))}
        </view>
        <Button
          color="blue"
          variant="solid"
          onPress={() => {
            logout();
          }}
        >
          Logout
        </Button>
      </view>
    </view>
  );
}
export default ProfileScreen;

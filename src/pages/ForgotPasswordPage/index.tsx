// ─────────────────────────────────────────────────────────────────────────────
//  views/ForgotPasswordPage/index.tsx
//  Simple email input + Primary Blue reset button.
// ─────────────────────────────────────────────────────────────────────────────

import Button from '@/components/common/Button';
import { Colors } from '@/constant/style';
import { useState } from '@lynx-js/react';
import { useNavigate, useNavigation } from 'react-router';

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleReset() {
    // setError(null);
    // setIsLoading(true);
    // setIsLoading(false);
    // if (result.success) {
    //   setSent(true);
    // } else {
    //   setError(result.error ?? 'Request failed.');
    // }
  }

  return (
    <view style={{ flex: 1, backgroundColor: Colors.Background }}>
      {/* Header */}
      <view
        style={{
          padding: '20px',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <view
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '12px',
            backgroundColor: Colors.Accent,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          bindtap={() => navigate('login')}
        >
          <text style={{ fontSize: '18px' }}>←</text>
        </view>
        <text
          style={{ fontSize: '20px', fontWeight: '700', color: Colors.Primary }}
        >
          Reset Password
        </text>
      </view>

      <scroll-view
        scroll-orientation="vertical"
        style={{ flex: 1, paddingLeft: '24px', paddingRight: '24px' }}
      >
        {/* Illustration */}
        <view
          style={{
            alignItems: 'center',
            paddingTop: '32px',
            paddingBottom: '24px',
          }}
        >
          <view
            style={{
              width: '80px',
              height: '80px',
              backgroundColor: Colors.Accent,
              borderRadius: '24px',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
            }}
          >
            <text style={{ fontSize: '36px' }}>🔒</text>
          </view>
          <text
            style={{
              fontSize: '20px',
              fontWeight: '700',
              color: Colors.Primary,
              marginBottom: '8px',
              textAlign: 'center',
            }}
          >
            Forgot Password?
          </text>
          <text
            style={{
              fontSize: '14px',
              color: Colors.Secondary,
              textAlign: 'center',
              lineHeight: 1.6,
            }}
          >
            Enter your email and we'll send you a reset link
          </text>
        </view>

        {/* Success state */}
        {sent ? (
          <view
            style={{
              backgroundColor: Colors.Success,
              borderRadius: '10px',
              padding: '16px',
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            <text style={{ fontSize: '32px', marginBottom: '8px' }}>✉️</text>
            <text
              style={{
                fontSize: '14px',
                fontWeight: '700',
                color: '#2E7D32',
                textAlign: 'center',
              }}
            >
              Check your inbox! A reset link has been sent to {email}.
            </text>
          </view>
        ) : (
          <>
            {/* Error */}
            {error && (
              <view
                style={{
                  backgroundColor: Colors.Error,
                  borderRadius: '10px',
                  padding: '12px',
                  marginBottom: '16px',
                }}
              >
                <text
                  style={{
                    fontSize: 13,
                    color: Colors.Error,
                    fontWeight: '600',
                  }}
                >
                  {error}
                </text>
              </view>
            )}

            {/* Email input */}
            <view style={{ marginBottom: '16px' }}>
              <text
                style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: Colors.Primary,
                  marginBottom: '6px',
                }}
              >
                Email Address
              </text>
              <input
                style={{
                  borderRadius: '10px',
                  borderWidth: '2px',
                  borderColor: Colors.Neutral,
                  borderStyle: 'solid',
                  paddingTop: '14px',
                  paddingBottom: '14px',
                  paddingLeft: '16px',
                  paddingRight: '16px',
                  fontSize: '15px',
                  color: Colors.Primary,
                  backgroundColor: Colors.Background,
                  width: '100%',
                }}
                type="email"
                placeholder="you@example.com"
                // value={email}
                bindinput={(e: { detail: { value: string } }) =>
                  setEmail(e.detail.value)
                }
              />
            </view>

            <Button
              children="Send Reset Link"
              onPress={handleReset}
              disabled={isLoading}
            />
          </>
        )}

        <Button
          children="Back to Login"
          onPress={() => navigate('login')}
          variant="solid"
        />
      </scroll-view>
    </view>
  );
}

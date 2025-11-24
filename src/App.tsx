import { useCallback, useEffect, useState } from '@lynx-js/react';

import './App.css';
import arrow from './public/assets/arrow.png';
import lynxLogo from './public/assets/lynx-logo.png';
import reactLynxLogo from './public/assets/react-logo.png';
import './app/styles/core.css';
import { useNavigate } from 'react-router';

export function App(props: { onRender?: () => void }) {
  const [alterLogo, setAlterLogo] = useState(false);
  const nav = useNavigate();
  useEffect(() => {
    console.info('Hello, ReactLynx');
  }, []);
  props.onRender?.();

  const onTap = useCallback(() => {
    nav('/login');
  }, []);

  return (
    <view>
      <view className="Background" />
      <view className="App">
        <view className="Banner">
          <view className="Logo" bindtap={onTap}>
            {alterLogo ? (
              <image src={reactLynxLogo} className="Logo--react" />
            ) : (
              <image src={lynxLogo} className="Logo--lynx" />
            )}
          </view>
          <text className="Title">test app</text>
          <text className="Subtitle">on Lynx</text>
        </view>
        <view className="Content">
          <image src={arrow} className="Arrow" />
          <text className="Description">Tap the logo and have fun!</text>
          <text className="Hint">
            Edit
            <text
              style={{
                fontStyle: 'italic',
                color: 'rgba(255, 255, 255, 0.85)',
              }}
            >
              {' src/App.tsx '}
            </text>
            to see updates!
          </text>
        </view>
        <view style={{ flex: 1 }} />
      </view>
    </view>
  );
}

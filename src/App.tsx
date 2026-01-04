import { useCallback, useEffect, useMemo, useState } from '@lynx-js/react';

import './app/styles/core.css';
import './App.css';
import LoginPage from './app/views/Login/LoginPages';

declare module '@lynx-js/types' {
  interface GlobalProps {
    appTheme: string;
    title: string;
  }
}
export function App(props: { onRender?: () => void }) {
  const themeClass = useMemo(
    () => `theme-${lynx.__globalProps.appTheme}`,
    [lynx.__globalProps.appTheme],
  );
  return (
    <view className={themeClass}>
      <LoginPage />
    </view>
  );
}

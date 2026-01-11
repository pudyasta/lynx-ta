import HomePage from '@/views/Home/HomePage';
import './app/styles/core.css';
import LoginPage from './app/views/Login/LoginPages';

declare module '@lynx-js/types' {
  interface GlobalProps {
    appTheme: string;
    title: string;
  }
}
export function App(props: { onRender?: () => void }) {
  return (
    <view>
      <HomePage />
    </view>
  );
}

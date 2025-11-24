import { useState } from '@lynx-js/react/legacy-react-runtime';
import Input from '../components/Input';

export default function LoginPage() {
  const [email, setEmail] = useState('demo@duolingo.com');
  const [password, setPassword] = useState('');

  return (
    <view class="flex flex-col items-center px-6 py-10 min-h-screen bg-white gap-6">
      {/* Icon */}
      {/* <image src="/assets/icons/graduate.png" class="w-20 h-20 mt-10" /> */}
      <text class="text-8xl font-bold text-center">🎓</text>

      {/* Header */}
      <text class="text-3xl font-bold text-center text-black">
        Welcome Back!
      </text>
      <text class="text-gray-500 text-center -mt-4">
        Continue your learning journey
      </text>

      {/* Email input */}
      <Input title="Email" variant="email" icon="mail" />

      {/* Password input */}

      {/* Forgot Password */}
      <text class="text-green-600 text-sm mt-1 self-end">Forgot Password?</text>

      {/* Login Button */}
      <text class="w-full bg-green-500 text-white rounded-xl py-3 mt-4">
        Login
      </text>

      {/* Signup */}
      <view class="flex flex-row gap-1 mt-6">
        <text class="text-gray-500">Don’t have an account?</text>
        <text class="text-green-600 font-semibold">Sign Up</text>
      </view>
    </view>
  );
}

import { useRef, useState, useEffect } from '@lynx-js/react';
import Input, {
  type InputRef,
  type InputValidation,
} from '../../components/common/Input';
import Button from '../../components/common/Button';
import { replace, useNavigate } from 'react-router';

import { authRepo } from '../../repository/auth/auth';
import { Alert } from '../../components/common/Alert';
import { loginSchema, type LoginSchema } from '../../validation/loginSchema';
import { useAuth } from '../../context/AuthProvider';
import type { Token } from '../../model/auth';
import Text from '../../components/Text';
import { TextType } from '@/components/Text/types';

export default function LoginPage() {
  const emailRef = useRef<InputRef>(null);
  const passwordRef = useRef<InputRef>(null);
  const [didInit, setDidInit] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const nav = useNavigate();
  const { setAccessToken, accessToken, setUser } = useAuth();

  useEffect(() => {
    if (accessToken) {
      nav('/home', { replace: true });
      return;
    }
    if (didInit) return;
    setDidInit(true);
  }, []);

  async function loginUser() {
    setIsLoading(true);
    setIsDisabled(true);
    const formValues = {
      email: emailRef.current?.getValue() || '',
      password: passwordRef.current?.getValue() || '',
    };
    emailRef.current?.setError(null);
    passwordRef.current?.setError(null);
    const result = loginSchema.safeParse(formValues);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      if (errors.email) emailRef.current?.setError(errors.email);
      if (errors.password) passwordRef.current?.setError(errors.password);
      return;
    }

    const validatedData: LoginSchema = result.data;

    try {
      const result = await authRepo.login({
        login: validatedData.email,
        password: validatedData.password,
      });
      console.log(result);

      const token: Token = {
        access_token: result.data?.access_token || '',
        refresh_token: result.data?.refresh_token || '',
      };

      setIsLoading(false);
      setIsDisabled(false);
      setAccessToken(token);
      setUser(result.data?.user || null);

      console.log(accessToken);

      nav('/home', { replace: true });
    } catch (e) {
      setIsLoading(false);
      setIsDisabled(false);
      setShowAlert(true);
    }
  }

  const handleDisabled = () => {
    setIsDisabled(
      emailRef.current?.getValue().length === 0 ||
        passwordRef.current?.getValue().length === 0,
    );
  };

  return (
    <view class="flex flex-col items-center px-6 py-10 min-h-screen bg-white gap-6 pt-20">
      <text class="text-3xl font-bold text-center text-black font-[jakarta]"></text>
      <Text size={TextType.h1} bold>
        Welcome Back!
      </Text>
      <Text size={TextType.b1}>Continue your learning journey</Text>

      <Input
        title="Email or username"
        variant="email"
        icon="mail"
        ref={emailRef}
        bindChange={handleDisabled}
      />
      <Input
        title="Password"
        variant="password"
        icon="lock"
        ref={passwordRef}
        bindChange={handleDisabled}
      />
      <view class="w-full h-full flex flex-col gap-y-2">
        <Button
          color="blue"
          variant="solid"
          onPress={loginUser}
          disabled={isDisabled}
        >
          {isLoading ? 'Loading...' : 'Login'}
        </Button>
        <text class="text-center text-md font-bold text-light-primary mt-3">
          Forgot Password
        </text>
        {/* <Button color="blue" variant="outline">
          Forgot Password?
        </Button> */}
      </view>

      {/* Signup */}
      <view class="flex flex-row gap-1 mt-6 " bindtap={() => nav('/signup')}>
        <text class="text-gray-500">Don’t have an account?</text>
        <text class="text-blue-600 font-semibold">Sign Up</text>
      </view>

      {showAlert && (
        <Alert
          message="Invalid email or password"
          type="error"
          onClose={() => setShowAlert(false)}
        />
      )}
    </view>
  );
}

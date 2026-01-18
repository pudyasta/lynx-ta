import {
  useRef,
  useState,
  useEffect,
  useLynxGlobalEventListener,
} from '@lynx-js/react';
import Input, { type InputRef } from '@/components/common/Input';
import { useNavigate } from 'react-router';

import Button from '@/components/common/Button';
import Text from '@/components/Text';
import { Alert } from '@/components/common/Alert';
import { useAuth } from '@/context/AuthProvider';
import { TextType } from '@/components/Text/types';
import { useLogin } from '@/usecase/login/useLogin';

export default function LoginPage() {
  const emailRef = useRef<InputRef>(null);
  const passwordRef = useRef<InputRef>(null);

  const [didInit, setDidInit] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const nav = useNavigate();
  const { isAuthenticated } = useAuth();
  const { execute, isLoading } = useLogin({
    onValidationError: (errors) => {
      if (errors.email) emailRef.current?.setError(errors.email);
      if (errors.password) passwordRef.current?.setError(errors.password);
    },
    onSuccess: () => {
      nav('/home', { replace: true });
    },
    onError: (error) => {
      setShowAlert(true);
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      nav('/', { replace: true });
      return;
    }
    // if (didInit) return;
    // setDidInit(true);
  }, []);

  async function loginUser() {
    emailRef.current?.setError(null);
    passwordRef.current?.setError(null);
    execute({
      login: emailRef.current?.getValue() || '',
      password: passwordRef.current?.getValue() || '',
    });
  }

  return (
    <scroll-view
      scroll-orientation="vertical"
      style={{ paddingBottom: `0px`, width: '100%', height: '100%' }}
    >
      <view class="flex flex-col items-center px-6 py-10 min-h-screen  gap-6 pt-20">
        <Text size={TextType.h1} bold>
          Selamat Datang!
        </Text>
        <Text size={TextType.b1}>
          Masuk dulu yuk, biar belajarnya makin seru.
        </Text>

        <Input
          title="Email or username"
          variant="email"
          icon="mail"
          ref={emailRef}
        />
        <Input
          title="Password"
          variant="password"
          icon="lock"
          ref={passwordRef}
        />
        <view class="w-full h-full flex flex-col gap-y-2">
          <Button
            color="blue"
            variant="solid"
            onPress={loginUser}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Login'}
          </Button>

          <Button color="white" variant="solid">
            Forgot Password?
          </Button>
        </view>

        {/* Signup */}
        <view class="w-full" bindtap={() => nav('/signup')}>
          <Button color="yellow" variant="solid">
            Udah punya akun? Daftar disini
          </Button>
        </view>

        {showAlert && (
          <Alert
            message="Invalid email or password"
            type="error"
            onClose={() => setShowAlert(false)}
          />
        )}
      </view>
    </scroll-view>
  );
}

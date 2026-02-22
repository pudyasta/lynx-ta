import { useRef, useState } from '@lynx-js/react';
import Input, { type InputRef } from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useNavigate } from 'react-router';
import Text from '../../components/Text';
import { TextType } from '../../components/Text/types';
import { useKeyboardShift } from '../../hooks/useKeyboardShift';
import { useRegister } from '@/views/Register/usecase/useRegister';

export default function RegisterPage() {
  const emailRef = useRef<InputRef>(null);
  const usernameRef = useRef<InputRef>(null);
  const nameRef = useRef<InputRef>(null);
  const passwordRef = useRef<InputRef>(null);
  const confirmPasswordRef = useRef<InputRef>(null);

  const navigate = useNavigate();
  const { kbHeight } = useKeyboardShift('panel');
  const { isLoading, error, execute } = useRegister({
    onValidationError: (errors) => {
      console.log(errors);
      if (errors) {
        emailRef.current?.setError(errors.email);
        usernameRef.current?.setError(errors.username);
        nameRef.current?.setError(errors.name);
        passwordRef.current?.setError(errors.password);
        confirmPasswordRef.current?.setError(errors.confirmPassword);
      }
    },
  });

  function registerUser() {
    emailRef.current?.setError(null);
    passwordRef.current?.setError(null);
    usernameRef.current?.setError(null);
    nameRef.current?.setError(null);
    confirmPasswordRef.current?.setError(null);

    execute({
      email: emailRef.current?.getValue() || '',
      username: usernameRef.current?.getValue() || '',
      name: nameRef.current?.getValue() || '',
      password: passwordRef.current?.getValue() || '',
      confirm_password: confirmPasswordRef.current?.getValue() || '',
    });
  }

  return (
    <scroll-view
      scroll-orientation="vertical"
      style={{
        width: '100%',
        height: '100%',
      }}
      id="panel"
      className={` z-0 ${kbHeight > 0 ? `pb-[20vh]` : ''}`}
    >
      <view
        class={`flex flex-col items-center px-6 min-h-screen gap-6 pt-20 pb-20`}
      >
        <Text size={TextType.h1} bold>
          Buat Akun Baru
        </Text>
        <Text size={TextType.b1} className="text-center">
          Cuma butuh sebentar buat mulai belajar hal baru bareng Owi
        </Text>

        <Input title="Name" variant="text" icon="user" ref={nameRef} />
        <Input title="Email" variant="email" icon="mail" ref={emailRef} />
        <Input title="Username" variant="text" icon="user" ref={usernameRef} />
        <Input
          title="Password"
          variant="password"
          icon="lock"
          ref={passwordRef}
        />
        <Input
          title="Confirm Password"
          variant="password"
          icon="lock"
          ref={confirmPasswordRef}
        />

        <view class="w-full flex flex-col gap-3">
          <Button
            color="blue"
            variant="solid"
            onPress={registerUser}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Buat Akun'}
          </Button>

          {/* Signup */}
          <view class="w-full" bindtap={() => navigate('/login')}>
            <Button color="yellow" variant="solid">
              Udah punya akun? Masuk disini
            </Button>
          </view>
        </view>
      </view>
    </scroll-view>
  );
}

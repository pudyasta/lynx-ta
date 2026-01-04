import { createRef, useRef, useState } from '@lynx-js/react';
import Input, {
  type InputRef,
  type InputValidation,
} from '../../components/common/Input';
import Button from '../../components/common/Button';
import { authRepo } from '../../repository/auth/auth';
import { useNavigate } from 'react-router';
import {
  registerSchema,
  type RegisterSchema,
} from '../../validation/registerSchema';

export default function RegisterPage() {
  const emailRef = useRef<InputRef>(null);
  const usernameRef = useRef<InputRef>(null);
  const nameRef = useRef<InputRef>(null);
  const passwordRef = useRef<InputRef>(null);
  const confirmPasswordRef = useRef<InputRef>(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();

  const handleDisabled = () => {
    setIsDisabled(
      !emailRef.current?.getValue() ||
        !passwordRef.current?.getValue() ||
        !confirmPasswordRef.current?.getValue() ||
        !nameRef.current?.getValue() ||
        !usernameRef.current?.getValue(),
    );
  };

  async function registerUser() {
    const formValues = {
      name: nameRef.current?.getValue() || '',
      username: usernameRef.current?.getValue() || '',
      email: emailRef.current?.getValue() || '',
      password: passwordRef.current?.getValue() || '',
      confirmPassword: confirmPasswordRef.current?.getValue() || '',
    };

    nameRef.current?.setError(null);
    usernameRef.current?.setError(null);
    emailRef.current?.setError(null);
    passwordRef.current?.setError(null);
    confirmPasswordRef.current?.setError(null);

    const result = registerSchema.safeParse(formValues);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      if (errors.name) nameRef.current?.setError(errors.name);
      if (errors.username) usernameRef.current?.setError(errors.username);
      if (errors.email) emailRef.current?.setError(errors.email);
      if (errors.password) passwordRef.current?.setError(errors.password);
      if (errors.confirmPassword)
        confirmPasswordRef.current?.setError(errors.confirmPassword);
      return;
    }

    const validatedData: RegisterSchema = result.data;
    try {
      await authRepo.register({
        name: validatedData.name,
        username: validatedData.username,
        email: validatedData.email,
        password: validatedData.password,
        confirm_password: validatedData.confirmPassword,
      });
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <scroll-view
      scroll-orientation="vertical"
      style={{
        width: '100%',
        height: '100%',
      }}
      className="relative z-0"
    >
      <view class="flex flex-col items-center px-6 py-10 min-h-screen bg-white gap-6 pt-20">
        <text class="text-3xl font-bold text-center text-black">
          Create Your Account!
        </text>
        <text class="text-gray-500 text-center -mt-4">
          Continue your learning journey
        </text>

        <Input
          title="Name"
          variant="text"
          icon="user"
          ref={nameRef}
          bindChange={handleDisabled}
        />
        <Input
          title="Email"
          variant="email"
          icon="mail"
          ref={emailRef}
          bindChange={handleDisabled}
        />
        <Input
          title="Username"
          variant="text"
          icon="user"
          ref={usernameRef}
          bindChange={handleDisabled}
        />
        <Input
          title="Password"
          variant="password"
          icon="lock"
          ref={passwordRef}
          bindChange={handleDisabled}
        />
        <Input
          title="Confirm Password"
          variant="password"
          icon="lock"
          ref={confirmPasswordRef}
          bindChange={handleDisabled}
        />

        <Button
          color="blue"
          variant="solid"
          onPress={registerUser}
          disabled={isDisabled}
        >
          Register
        </Button>

        {/* Signup */}
        <view
          class="flex flex-row gap-1 mt-6"
          bindtap={() => navigate('/login')}
        >
          <text class="text-gray-500">Already have an account? </text>
          <text class="text-blue-600 font-semibold">Login</text>
        </view>
      </view>
    </scroll-view>
  );
}

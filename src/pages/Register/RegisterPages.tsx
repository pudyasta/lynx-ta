import { useRef, useState } from '@lynx-js/react';
import Input, { type InputRef } from '@/components/Input/Input';
import Button from '@/components/common/Button';
import { useNavigate } from 'react-router';
import Text from '@/components/Text';
import { TextType } from '@/components/Text/types';
import { useKeyboardShift } from '@/hooks/useKeyboardShift';
import { useRegister } from '@/pages/Register/usecase/useRegister';
import { hiMascot, searchMascot } from '@/assets/images/mascot';
import { loginBanner } from '@/assets/images/pages/';
import { Colors } from '@/constant/style';
import style from './RegisterPage.module.css';
import { SIGNIN_ROUTE } from '@/constant/route';
import { Modal, ModalTemplate } from '@/components/Modal/Modal.view';

export default function RegisterPage() {
  const emailRef = useRef<InputRef>(null);
  const usernameRef = useRef<InputRef>(null);
  const nameRef = useRef<InputRef>(null);
  const passwordRef = useRef<InputRef>(null);
  const confirmPasswordRef = useRef<InputRef>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const nav = useNavigate();

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
        style={{
          backgroundImage: `url(${loginBanner})`,
        }}
        className={style.banner}
      >
        <view className={style.header}>
          <view className={style.headerLogo}>
            <Text size={TextType.h1}>📖</Text>
          </view>

          <Text size={TextType.h1} color="white" bold>
            Welcome Explorer!
          </Text>
          <Text size={TextType.b2} color="white">
            Discover a new world with Levl!
          </Text>
        </view>
        <view className={style.mascotContainer}>
          <image src={searchMascot} className={style.mascot} />
        </view>
      </view>
      <view className={style.formContainer}>
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

        <Button
          color="blue"
          variant="solid"
          onPress={registerUser}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Sign Up'}
        </Button>
        {/* Signup */}
        <Text typeof={TextType.b1} onClick={() => nav(SIGNIN_ROUTE)}>
          Udah punya akun?{' '}
          <Text typeof={TextType.b1} style={{ color: Colors.Primary }}>
            Daftar disini
          </Text>
        </Text>
      </view>

      <Modal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Oops! Something went wrong"
        body="We're sorry, something went wrong. Please try again."
        template={ModalTemplate.Sad}
      />
    </scroll-view>
  );
}

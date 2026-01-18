import { useMutation } from '@tanstack/react-query';
import { loginSchema, type LoginSchema } from './loginValidation';
import { authRepo } from '@/repository/auth';
import type { LoginRequest } from '@/repository/auth/type';
import { useNavigate } from 'react-router';
import { useAuth } from '@/context/AuthProvider';
import { PrefKey, setPref } from '@/helper/localStorage';

interface UseLoginOptions {
  onValidationError?: (errors: any) => void;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export const useLogin = (options?: UseLoginOptions) => {
  const nav = useNavigate();
  const { setAccessToken, setUser } = useAuth();

  const mutation = useMutation({
    mutationFn: async (rawValues: LoginRequest) => {
      const result = loginSchema.safeParse(rawValues);
      if (!result.success) {
        const flattenedErrors = result.error.flatten().fieldErrors;
        throw { type: 'VALIDATION_ERROR', errors: flattenedErrors };
      }

      const validatedData: LoginSchema = result.data;
      return authRepo.login({
        login: validatedData.login,
        password: validatedData.password,
      });
    },
    onSuccess: (data) => {
      if (!data.data?.access_token || !data.data?.refresh_token) {
        throw new Error('Invalid token response');
      }

      options?.onSuccess?.(data);
      setAccessToken({
        access_token: data.data.access_token,
        refresh_token: data.data.refresh_token,
        expires_in: data.data.expires_in,
      });
      setUser({
        id: data.data.user.id,
        name: data.data.user.name,
        username: data.data.user.username,
        email: data.data.user.email,
        status: data.data.user.status,
        email_verified_at: data.data.user.email_verified_at,
        created_at: data.data.user.created_at,
        updated_at: data.data.user.updated_at,
        roles: data.data.user.roles,
      });

      nav('/', { replace: true });
    },
    onError: (error: any) => {
      if (error.type === 'VALIDATION_ERROR') {
        options?.onValidationError?.(error.errors);
      }
      options?.onError?.(error);
    },
  });

  return {
    execute: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
    data: mutation.data,
  };
};

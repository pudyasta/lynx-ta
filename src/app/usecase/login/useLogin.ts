import { useMutation } from '@tanstack/react-query';
import { loginSchema, type LoginSchema } from '../../usecase/login/loginSchema';
import { authRepo } from '@/repository/auth';
import type { LoginRequest } from '@/model/auth';

interface UseLoginOptions {
  onValidationError?: (errors: any) => void;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export const useLogin = (options?: UseLoginOptions) => {
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
      options?.onSuccess?.(data);
      console.log(data);
    },
    onError: (error: any) => {
      console.log(error);
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

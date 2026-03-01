import { registerSchema } from './registerValidation';
import { registerApi } from '@/repository/auth';
import { useMutation } from '@tanstack/react-query';
import type { RegisterRequest } from '@/repository/auth/type';
import { validateSafely } from '@/lib/helper/validate';

interface UseRegisterOptions {
  onValidationError?: (errors: any) => void;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export const useRegister = (options?: UseRegisterOptions) => {
  const mutation = useMutation({
    mutationFn: async (rawValues: RegisterRequest) => {
      const result = await validateSafely(registerSchema, rawValues);
      if (!result.success) {
        throw { type: 'VALIDATION_ERROR', errors: result.errors };
      }

      return registerApi({
        name: rawValues.name,
        username: rawValues.username,
        email: rawValues.email,
        password: rawValues.password,
        confirm_password: rawValues.confirm_password,
      });
    },
    onSuccess: (data) => {
      options?.onSuccess?.(data);
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

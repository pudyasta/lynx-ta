import { useState, useCallback } from 'react';
import { registerSchema, type RegisterSchema } from './registerSchema';
import { authRepo } from '@/repository/auth';
import { useMutation } from '@tanstack/react-query';
import type { RegisterRequest } from '@/model/auth';

interface UseRegisterOptions {
  onValidationError?: (errors: any) => void;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export const useRegister = (options?: UseRegisterOptions) => {
  const mutation = useMutation({
    mutationFn: async (rawValues: RegisterRequest) => {
      const result = registerSchema.safeParse(rawValues);
      if (!result.success) {
        const flattenedErrors = result.error.flatten().fieldErrors;
        throw { type: 'VALIDATION_ERROR', errors: flattenedErrors };
      }

      return authRepo.register({
        name: result.data.name,
        username: result.data.username,
        email: result.data.email,
        password: result.data.password,
        confirm_password: result.data.confirm_password,
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

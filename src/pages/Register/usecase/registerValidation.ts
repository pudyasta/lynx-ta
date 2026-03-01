import * as yup from 'yup';

export const registerSchema = yup.object({
  name: yup
    .string()
    .max(50, 'Name must be less than 50 characters')
    .matches(/^[A-Za-z ]+$/, 'Name can only contain letters and spaces')
    .min(2, 'Name must be at least 2 characters'),

  username: yup
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .matches(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores',
    ),

  email: yup.string().email('Please enter a valid email address'),

  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[@$!%*?&-_]/, 'Password must contain a special character'),

  confirm_password: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Please confirm your password'),
});

export type RegisterSchema = yup.InferType<typeof registerSchema>;

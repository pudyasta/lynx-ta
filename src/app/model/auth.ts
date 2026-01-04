export interface LoginRequest {
  login: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  username: string;
  password: string;
  confirm_password: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  status: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  roles: string[];
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    access_token: string;
    refresh_token: string;
    expires_in: number;
    verification_uuid: string;
  } | null;
  meta: any | null;
  errors: any | null;
}


export interface Token {
  access_token: string;
  refresh_token: string;
}

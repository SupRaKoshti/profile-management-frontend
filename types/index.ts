  export interface User {
    id: string;
    email: string;
    name: string | null;
    bio: string | null;
  }
  
  export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface SignupRequestResponse {
    email: string;
    password: string;
    name: string;
  }
  
  export interface TokenResponse {
    access_token: string;
    token_type: string;
  }
  
  export interface ApiError {
    detail: string;
  }
import { CommonResponse } from 'responses';

export interface LoginResponse extends CommonResponse {
  token?: string;
}

export interface GoogleSignInResponse extends CommonResponse {
  token?: string;
}

export interface RenewTokenResponse extends CommonResponse {
  token?: string;
  user?: any;
}

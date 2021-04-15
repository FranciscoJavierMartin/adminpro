import { CommonResponse } from 'responses';

export interface GetUsersResponse extends CommonResponse {
  users: any[];
  total: number;
}

export interface CreateUserResponse extends CommonResponse {
  token?: string;
}

export interface UpdateUserReponse extends CommonResponse {
  user?: any;
}

export interface DeleteUserResponse extends CommonResponse {}

export interface LoginResponse extends CommonResponse {
  token?: string;
}

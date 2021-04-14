import { CommonResponse } from 'responses';

export interface GetUsersResponse extends CommonResponse {
  users: any[];
}

export interface CreateUserResponse extends CommonResponse {
  user?: any;
}

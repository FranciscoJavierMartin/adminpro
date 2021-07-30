import { User } from '../models/user.model';

interface CommonResponse {
  ok: boolean;
  message: string;
}

export interface RegisterResponse extends CommonResponse {
  token?: string;
}

export interface LoadUsers extends CommonResponse {
  users: User[];
  total: number;
}
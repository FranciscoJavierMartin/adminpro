import { UserRoles } from 'constants/userRoles';

export interface CreateUserRequestBody {
  name: string;
  password: string;
  email: string;
}

export interface UpdateUserRequestBody {
  name: string;
  email: string;
  role: UserRoles;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface GoogleSignInrRequestBody {
  token: string;
}

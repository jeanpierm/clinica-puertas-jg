import { User } from '../../dashboard/interfaces/user';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  userData: User;
}

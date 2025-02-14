export interface User extends UserCredentials {
  id?: number;
  nickname: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserSessionData {
  id?: number;
  nickname: string;
  email: string;
  // TODO: add token later
}

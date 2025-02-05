export interface User extends UserCredentials {
  nickname: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserSessionData {
  nickname: string;
  email: string;
  // TODO: add token later
}

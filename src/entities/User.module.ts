export interface User extends UserCredentials {
  nickname: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface User extends UserSessionData {
  password: string;
}

//TODO: think about this
export interface UserSessionData {
  id: number;
  nickname: string;
  email: string;
}

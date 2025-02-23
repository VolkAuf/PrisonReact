export interface UserCredentials {
  email: string;
  password: string;
  nickname?: string;
}

export interface UserSessionData extends Omit<UserCredentials, "password"> {
  id: number;
  nickname: string;
}

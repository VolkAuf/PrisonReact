export interface UserCredentials {
  email: string;
  password: string;
  nickname?: string;
}

export interface UserSessionData extends Omit<UserCredentials, "password">, UserCosmetics {
  id: number;
  nickname: string;
}

export interface UserCosmetics {
  nickname: string;
  avatar: number;
}

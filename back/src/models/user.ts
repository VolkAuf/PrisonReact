export interface User extends UserSessionData {
  password: string;
}

//TODO: think about this
export interface UserSessionData extends UserCosmetics {
  id: number;
  email: string;
}

export interface UserCosmetics {
  nickname: string;
  avatar: number;
}

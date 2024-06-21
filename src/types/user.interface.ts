interface ReqLogin {
  email: string;
  password: string;
}

interface ReqRegister {
  username: string;
  email: string;
  password: string;
  role: [string];
  active: boolean;
}

interface ReqUpdateUser {
  email?: string;
  password?: string;
  username?: string;
}

interface ResLoginApi extends Res {
  data: {
    id: string;
    username: string;
    email: string;
    password: string;
  };
}

interface IUser {
  _id: string;
  username: string;
  email: string;
  role: [string];
  active: boolean;
  accessToken?: string;
}

interface DispatchAuth {
  type: string;
  payload?: any;
}

type CreateUserDto = Omit<IUser, 'id'>;

type UpdateUserDto = Partial<IUser>;

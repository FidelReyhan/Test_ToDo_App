export type User = {
  username: string;
};

export type UserCredentials = User & {
  password: string;
};

export type HttpResponse<T> = {
  status: number;
  data: T;
};

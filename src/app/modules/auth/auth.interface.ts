export type TUser = {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  createdAt?: Date;
  updatedAt?: Date;
};

export type TRegisterInput = {
  name: string;
  email: string;
  password: string;
};

export type TLoginInput = {
  email: string;
  password: string;
};

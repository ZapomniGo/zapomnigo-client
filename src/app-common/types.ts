export type DataError = {
  hasError: boolean;
  message: string;
};

export type UserData = {
  name: string;
  username: string;
  password: string;
  repeatPassword: string;
  organisation: string;
  gender: string;
  age: number | null;
  email: string;
};

import { DataError } from "../../../app-common/types";

type LoginData = {
  username: string;
  password: string;
};

type LoginErrorRecord = Record<keyof LoginData, DataError>;

export type { LoginData, LoginErrorRecord };

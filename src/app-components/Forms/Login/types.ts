import { DataError } from "../../../app-common/types";

export type LoginData = {
  username: string;
  password: string;
};

export type LoginErrorRecord = Record<keyof LoginData, DataError>;

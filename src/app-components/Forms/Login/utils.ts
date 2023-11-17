import { LoginErrorRecord } from "./types";

export const initialErrors: LoginErrorRecord = {
  username: { hasError: false, message: "" },
  password: { hasError: false, message: "" },
};

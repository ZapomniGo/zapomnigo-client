import { LoginErrorRecord } from "./types";

const initialErrors: LoginErrorRecord = {
  username: { hasError: false, message: "" },
  password: { hasError: false, message: "" },
};

export { initialErrors };

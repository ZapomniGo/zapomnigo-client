import { LoginErrorRecord } from "./types";

const initialErrors: LoginErrorRecord = {
  email_or_username: { hasError: false, message: "" },
  password: { hasError: false, message: "" },
};

export { initialErrors };

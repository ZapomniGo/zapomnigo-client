import { UserData, DataError } from "../../../app-common/types";

const initialErrors: Record<keyof UserData, DataError> = {
  name: { hasError: false, message: "" },
  username: { hasError: false, message: "" },
  password: { hasError: false, message: "" },
  repeatPassword: { hasError: false, message: "" },
  organisation: { hasError: false, message: "" },
  gender: { hasError: false, message: "" },
  age: { hasError: false, message: "" },
  email: { hasError: false, message: "" },
};

const initialUserState: UserData = {
  name: "",
  username: "",
  password: "",
  repeatPassword: "",
  organisation: "",
  gender: "",
  age: null,
  email: "",
};
const emailPattern: RegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export { initialErrors, initialUserState, emailPattern };

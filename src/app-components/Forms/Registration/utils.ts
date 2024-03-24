// import { boolean } from "yup";
import { UserData, DataError } from "../../../app-common/types";

const initialErrors: Record<keyof UserData, DataError> = {
  name: { hasError: false, message: "" },
  username: { hasError: false, message: "" },
  password: { hasError: false, message: "" },
  repeatPassword: { hasError: false, message: "" },
  organization: { hasError: false, message: "" },
  gender: { hasError: false, message: "" },
  age: { hasError: false, message: "" },
  email: { hasError: false, message: "" },
  privacy_policy: { hasError: false, message: "" },
  terms_and_conditions: { hasError: false, message: "" },
  marketing_consent: { hasError: false, message: "" },
  user_type: { hasError: false, message: "" },
};

const initialUserState: UserData = {
  name: "",
  username: "",
  password: "",
  repeatPassword: "",
  organization: "",
  gender: "",
  age: null,
  email: "",
  privacy_policy: false,
  terms_and_conditions: false,
  marketing_consent: false,
  user_type: "",
};
const emailPattern: RegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export { initialErrors, initialUserState, emailPattern };

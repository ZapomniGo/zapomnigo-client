type DataError = {
  hasError: boolean;
  message: string;
};

type UserData = {
  name: string;
  username: string;
  password: string;
  repeatPassword: string;
  organization: string;
  gender: string;
  age: number | null;
  email: string;
  privacy_policy: boolean;
  marketing_consent: boolean;
  terms_and_conditions: boolean;
  user_type: string;
};

export type { DataError, UserData };

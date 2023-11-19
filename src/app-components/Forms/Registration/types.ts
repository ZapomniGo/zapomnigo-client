import { DataError, UserData } from "../../../app-common/types";

type RegisterErrorRecord = Record<keyof UserData, DataError>;

export type { RegisterErrorRecord };

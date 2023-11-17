import { DataError, UserData } from "../../../app-common/types";

export type RegisterErrorRecord = Record<keyof UserData, DataError>;

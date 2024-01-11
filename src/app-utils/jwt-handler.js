import { jwtDecode } from "jwt-decode";

export const getJwtPayload = (token) => {
  if (!token) return null;
  return jwtDecode(token);
};

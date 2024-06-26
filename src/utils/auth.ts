import jwt from "jsonwebtoken";
import User from "../models/user.model";

const {
  JWT_ACCESS_SECRET,
  JWT_ACCESS_EXPIRY,
  JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRY,
} = process.env;

/**
 *
 */
export const generateToken = (user: User, tokenType: string): string | null => {
  const secret: string =
    (tokenType === "refresh" ? JWT_REFRESH_SECRET : JWT_ACCESS_SECRET) ||
    "secret";
  const expiry: string =
    (tokenType === "refresh" ? JWT_REFRESH_EXPIRY : JWT_ACCESS_EXPIRY) || "1d";

  const token: string | null = jwt.sign(
    { id: user.id, user_type: user.name },
    secret,
    {
      expiresIn: expiry,
    }
  );

  return token || null;
};

export const getUserReqObject = (user: User) => {
  return {
    id: user.id,
    name: user.name,
    role: user.role,
  };
};

export const { verify } = jwt;

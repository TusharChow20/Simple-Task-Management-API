import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

export type TJwtPayload = {
  userId: string;
  email: string;
  role: string;
};

const createToken = (
  payload: TJwtPayload,
  secret: string,
  expiresIn: string,
): string => {
  return jwt.sign(payload, secret, { expiresIn } as SignOptions);
};

const verifyToken = (token: string, secret: string): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};

export { createToken, verifyToken };

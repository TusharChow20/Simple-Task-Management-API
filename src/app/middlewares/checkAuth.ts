import { NextFunction, Request, Response } from "express";
import AppError from "../../utils/AppError";
import { verifyToken, TJwtPayload } from "../../utils/jwt";
import varEnv from "../config/env";

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: TJwtPayload;
    }
  }
}

const checkAuth = (req: Request, _res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("You are not logged in. Please log in.", 401));
  }

  const token = authHeader.split(" ")[1];
  const jwtSecret = varEnv.JWT_SECRET;

  if (!token) {
    return next(new AppError("Invalid authorization header. Please log in.", 401));
  }

  if (!jwtSecret) {
    return next(new AppError("JWT secret is not configured.", 500));
  }

  try {
    const decoded = verifyToken(token, jwtSecret) as TJwtPayload;
    req.user = decoded;
    next();
  } catch {
    next(new AppError("Invalid or expired token. Please log in again.", 401));
  }
};

export default checkAuth;

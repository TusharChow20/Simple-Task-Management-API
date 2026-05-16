import { NextFunction, Request, Response } from "express";
import AppError from "../../utils/AppError";

const notFound = (req: Request, _res: Response, next: NextFunction): void => {
  next(
    new AppError(
      `Cannot find ${req.method} ${req.originalUrl} on this server`,
      404,
    ),
  );
};

export default notFound;

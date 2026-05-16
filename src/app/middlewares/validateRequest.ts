import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";
import AppError from "../../utils/AppError";

const validateRequest =
  (schema: AnyZodObject) =>
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const message = err.errors.map((e) => e.message).join(", ");
        next(new AppError(message, 400));
      } else {
        next(err);
      }
    }
  };

export default validateRequest;

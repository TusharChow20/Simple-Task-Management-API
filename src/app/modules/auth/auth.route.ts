import { Router } from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";

const router = Router();

router.post(
  "/register",
  validateRequest(AuthValidation.registerValidation),
  AuthController.register,
);

router.post(
  "/login",
  validateRequest(AuthValidation.loginValidation),
  AuthController.login,
);

export const AuthRoutes = router;

import AppError from "../../../utils/AppError";
import { createToken } from "../../../utils/jwt";
import varEnv from "../../config/env";
import { TLoginInput, TRegisterInput } from "./auth.interface";
import UserModel from "./auth.model";

const register = async (payload: TRegisterInput) => {
  const existingUser = await UserModel.findOne({ email: payload.email });
  if (existingUser) {
    throw new AppError(
      "Email already registered. Please use a different email.",
      409,
    );
  }

  const user = await UserModel.create(payload);

  const token = createToken(
    { userId: user._id.toString(), email: user.email, role: user.role },
    varEnv.JWT_SECRET,
    varEnv.JWT_EXPIRES_IN,
  );

  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

const login = async (payload: TLoginInput) => {
  const user = await UserModel.findOne({ email: payload.email }).select(
    "+password",
  );
  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordCorrect = await user.comparePassword(payload.password);
  if (!isPasswordCorrect) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = createToken(
    { userId: user._id.toString(), email: user.email, role: user.role },
    varEnv.JWT_SECRET,
    varEnv.JWT_EXPIRES_IN,
  );

  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

export const AuthServices = { register, login };

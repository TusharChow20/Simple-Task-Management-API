import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { TaskRoutes } from "../modules/task/task.route";

const router = Router();

const moduleRoutes = [
  { path: "/auth", route: AuthRoutes },
  { path: "/tasks", route: TaskRoutes },
];

moduleRoutes.forEach(({ path, route }) => router.use(path, route));

export default router;

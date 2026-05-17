import { Router } from "express";
import checkAuth from "../../middlewares/checkAuth";
import validateRequest from "../../middlewares/validateRequest";
import { TaskController } from "./task.controller";
import { TaskValidation } from "./task.validation";

const router = Router();

// All task routes require authentication
router.use(checkAuth);

router
  .route("/")
  .post(
    validateRequest(TaskValidation.createTaskValidation),
    TaskController.createTask,
  )
  .get(TaskController.getAllTasks);

router
  .route("/:id")
  .get(TaskController.getSingleTask)
  .patch(
    validateRequest(TaskValidation.updateTaskValidation),
    TaskController.updateTask,
  )
  .delete(TaskController.deleteTask);
export const TaskRoutes = router;

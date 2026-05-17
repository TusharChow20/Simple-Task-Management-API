import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { TaskServices } from "./task.service";
import { TTaskQuery } from "./task.interface";
import AppError from "../../../utils/AppError";

const createTask = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) throw new AppError("Unauthorized", 401);

  const task = await TaskServices.createTask(req.user.userId, req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Task created successfully",
    data: task,
  });
});

const getAllTasks = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) throw new AppError("Unauthorized", 401);

  const { tasks, meta } = await TaskServices.getAllTasks(
    req.user.userId,
    req.query as TTaskQuery,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Tasks fetched successfully",
    meta,
    data: tasks,
  });
});

const getSingleTask = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) throw new AppError("Unauthorized", 401);

  const task = await TaskServices.getSingleTask(req.user.userId, req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Task fetched successfully",
    data: task,
  });
});

const updateTask = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) throw new AppError("Unauthorized", 401);

  const task = await TaskServices.updateTask(
    req.user.userId,
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Task updated successfully",
    data: task,
  });
});

const deleteTask = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) throw new AppError("Unauthorized", 401);

  await TaskServices.deleteTask(req.user.userId, req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Task deleted successfully",
    data: null,
  });
});

export const TaskController = {
  createTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  deleteTask,
};

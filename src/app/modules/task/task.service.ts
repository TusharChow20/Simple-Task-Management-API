import { Types } from "mongoose";
import AppError from "../../../utils/AppError";
import {
  TTaskCreateInput,
  TTaskQuery,
  TTaskUpdateInput,
} from "./task.interface";
import TaskModel from "./task.model";

const createTask = async (userId: string, payload: TTaskCreateInput) => {
  const task = await TaskModel.create({
    ...payload,
    user: new Types.ObjectId(userId),
  });
  return task;
};

const getAllTasks = async (userId: string, query: TTaskQuery) => {
  const { status, priority, search, page = "1", limit = "10" } = query;

  const filter: Record<string, unknown> = {
    user: new Types.ObjectId(userId),
  };

  // Filter by status
  if (status) filter.status = status;

  // Filter by priority
  if (priority) filter.priority = priority;

  // Search by title
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
  const skip = (pageNum - 1) * limitNum;

  const [tasks, total] = await Promise.all([
    TaskModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
    TaskModel.countDocuments(filter),
  ]);

  return {
    tasks,
    meta: {
      total,
      page: pageNum,
      limit: limitNum,
      totalPage: Math.ceil(total / limitNum),
    },
  };
};

const getSingleTask = async (userId: string, taskId: string) => {
  const task = await TaskModel.findOne({
    _id: new Types.ObjectId(taskId),
    user: new Types.ObjectId(userId),
  });

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  return task;
};

const updateTask = async (
  userId: string,
  taskId: string,
  payload: TTaskUpdateInput,
) => {
  const task = await TaskModel.findOneAndUpdate(
    {
      _id: new Types.ObjectId(taskId),
      user: new Types.ObjectId(userId),
    },
    payload,
    { new: true, runValidators: true },
  );

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  return task;
};

const deleteTask = async (userId: string, taskId: string) => {
  const task = await TaskModel.findOneAndDelete({
    _id: new Types.ObjectId(taskId),
    user: new Types.ObjectId(userId),
  });

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  return null;
};

export const TaskServices = {
  createTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  deleteTask,
};

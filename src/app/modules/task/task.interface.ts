import { Types } from "mongoose";

export type TTaskStatus = "todo" | "in-progress" | "done";
export type TTaskPriority = "low" | "medium" | "high";

export type TTask = {
  title: string;
  description?: string;
  status: TTaskStatus;
  priority: TTaskPriority;
  dueDate?: Date;
  user: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TTaskCreateInput = {
  title: string;
  description?: string;
  status?: TTaskStatus;
  priority?: TTaskPriority;
  dueDate?: string;
};

export type TTaskUpdateInput = Partial<TTaskCreateInput>;

export type TTaskQuery = {
  status?: TTaskStatus;
  priority?: TTaskPriority;
  search?: string;
  page?: string;
  limit?: string;
};

import mongoose, { Schema, Document } from "mongoose";
import { TTaskStatus, TTaskPriority } from "./task.interface";
import { Types } from "mongoose";

export interface ITaskDocument extends Document {
  title: string;
  description?: string;
  status: TTaskStatus;
  priority: TTaskPriority;
  dueDate?: Date;
  user: Types.ObjectId;
}

const taskSchema = new Schema<ITaskDocument>(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    status: {
      type: String,
      enum: {
        values: ["todo", "in-progress", "done"],
        message: "Status must be todo, in-progress, or done",
      },
      default: "todo",
    },
    priority: {
      type: String,
      enum: {
        values: ["low", "medium", "high"],
        message: "Priority must be low, medium, or high",
      },
      default: "medium",
    },
    dueDate: {
      type: Date,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Task must belong to a user"],
    },
  },
  { timestamps: true },
);

// Index for faster queries
taskSchema.index({ user: 1, status: 1, priority: 1 });
taskSchema.index({ title: "text" }); // for text search

const TaskModel = mongoose.model<ITaskDocument>("Task", taskSchema);
export default TaskModel;

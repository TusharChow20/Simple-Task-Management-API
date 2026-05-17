import { z } from "zod";

const statusEnum = z.enum(["todo", "in-progress", "done"], {
  errorMap: () => ({ message: "Status must be todo, in-progress, or done" }),
});

const priorityEnum = z.enum(["low", "medium", "high"], {
  errorMap: () => ({ message: "Priority must be low, medium, or high" }),
});

const createTaskValidation = z.object({
  body: z.object({
    title: z
      .string({ required_error: "Title is required" })
      .min(3, "Title must be at least 3 characters")
      .max(100, "Title cannot exceed 100 characters"),
    description: z
      .string()
      .max(500, "Description cannot exceed 500 characters")
      .optional(),
    status: statusEnum.optional(),
    priority: priorityEnum.optional(),
    dueDate: z
      .string()
      .datetime({ message: "Invalid date format. Use ISO 8601" })
      .optional(),
  }),
});

const updateTaskValidation = z.object({
  body: z.object({
    title: z
      .string()
      .min(3, "Title must be at least 3 characters")
      .max(100, "Title cannot exceed 100 characters")
      .optional(),
    description: z
      .string()
      .max(500, "Description cannot exceed 500 characters")
      .optional(),
    status: statusEnum.optional(),
    priority: priorityEnum.optional(),
    dueDate: z
      .string()
      .datetime({ message: "Invalid date format. Use ISO 8601" })
      .optional(),
  }),
});

export const TaskValidation = { createTaskValidation, updateTaskValidation };

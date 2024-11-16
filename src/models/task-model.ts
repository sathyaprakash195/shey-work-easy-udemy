import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    referenceFiles: {
      type: Array,
      required: false,
      default: [],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "projects",
      required: true,
    },
  },
  { timestamps: true }
);

if (mongoose.models && mongoose.models.tasks) {
  delete mongoose.models.tasks;
}

const TaskModel = mongoose.model("tasks", taskSchema);
export default TaskModel;

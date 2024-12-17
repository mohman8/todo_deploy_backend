// import { required } from "joi";
import mongoose from "mongoose";

const TasksSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    date: {
      type: String,
    },
    status: {
      type: Boolean,
      default: false,
    },
    // createdBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "user",
    //   required: [true, "Provide user"],
    // },
  },
  { timestamps: true }
);
const Tasks = mongoose.model("Task", TasksSchema);

export default Tasks;

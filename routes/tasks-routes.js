import Tasks from "../models/Tasks.js";
// import express from "express";
// import { Router } from "express";

// //create a new todo

// router.post('/',async(req,res)=>{
//     try
// })
import express from "express";
import {
  postTasks,
  getTasks,
  getTask,
  updateTasks,
  deleteTasks,
} from "../controllers/task-controller.js";

const router = express.Router();
router.post("/", postTasks);
router.get("/", getTasks);
router.get("/:id", getTask);
router.put("/:id", updateTasks);
router.delete("/:id", deleteTasks);

export default router;

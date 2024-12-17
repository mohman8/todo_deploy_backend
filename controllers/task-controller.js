import Tasks from "../models/Tasks.js";
import { Router } from "express";
// //create a new todo

export const postTasks = async (req, res) => {
  console.log("hi");

  try {
    const todo = new Tasks({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
    });
    await todo.save();
    res.status(201).json({ data: todo, message: "task created" });
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
};

//get all todos
export const getTasks = async (req, res) => {
  const { title, description, createdBy } = req.body;
  try {
    const todos = await Tasks.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

///get single todo by id
export const getTask = async (req, res) => {
  try {
    const task = await Tasks.findById(req.params.id, req.body);
    if (!task) {
      return res
        .status(404)
        .json({ message: `task with ${req.params.id} not found` });
    }
    task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
///update todo by id
export const updateTasks = async (req, res) => {
  try {
    console.log("hi");
    const task = await Tasks.findByIdAndUpdate(req.params.id, req.body);
    if (!task) {
      return res
        .status(404)
        .json({ message: `task with ${req.params.id} not found` });
    }
    task.save();
    res.status(201).send("Successfully update");
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

////delete todo by id
export const deleteTasks = async (req, res) => {
  try {
    const task = await Tasks.findByIdAndDelete({ _id: req.params.id });
    if (!task) {
      return res.status(404).json({ message: "Task Not found" });
    }
    // task.save();
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error.message);
  }
};
// task.save();

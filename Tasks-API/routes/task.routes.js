import express from "express";
import {
  addTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../controller/task.controller.js";

const router = express.Router();

router.get("/getTasks", getTasks);
router.post("/addTask", addTask);
router.delete("/deleteTask", deleteTask);
router.put("/updateTask", updateTask);

export default router;

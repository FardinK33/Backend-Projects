import Task from "../model/task.model.js";
import User from "../model/user.model.js";

export const getTasks = async (req, res) => {
  try {
    const { _id } = req.body;

    if (!_id) {
      return res.status(400).json({ message: "Missing _id" });
    }

    const tasks = await Task.find({ userId: _id });

    res.status(200).json(tasks);
  } catch (error) {
    console.log("Error in GetTasks Route: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addTask = async (req, res) => {
  try {
    const { _id, task } = req.body;

    const user = await User.findOne({ _id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newTask = new Task({
      userId: _id,
      task,
    });

    user.tasks.push(newTask);
    await newTask.save();
    await user.save();

    res.status(201).json({ message: "Task added successfully" });
  } catch (error) {
    console.log("Error in Add Task Route: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { _id, taskId } = req.body;

    const user = await User.findOne({ _id });
    const tasks = user.tasks.filter((id) => id != taskId);
    user.tasks = tasks;
    await user.save();
    const task = await Task.findByIdAndDelete({ _id: taskId });

    if (!task) {
      return res.status(401).json({ error: "Task Not Found" });
    }

    res.status(200).json({ message: "Request Success" });
  } catch (error) {
    console.log("Error in Delete Task Route: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { _id, userId, task, status } = req.body;

    let oldTask = await Task.findById({ _id });
    if (!oldTask) {
      return res.status(401).json({ error: "Task Not Found" });
    }

    if (oldTask.userId != userId) {
      return res
        .status(401)
        .json({ error: "You are not authorized to update this task" });
    }

    oldTask.task = task?.trim() ? task : oldTask.task;
    oldTask.status = status ? status : oldTask.status;

    await oldTask.save();
    res.status(200).json({ message: "Updated Task Successfully" });
  } catch (error) {
    console.log("Error in Update Task Route: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// import express from 'express';
import Task from '../models/taskModel.js';

// Controller function to create a new task
export async function createTask(req, res) {
  try {
    const { title, description, dueDate } = req.body;
    const task = new Task({ title, description, dueDate });
    await task.save(); // Use the Mongoose 'save' method to insert a new task
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error });
  }
}

// Controller function to get all tasks
export async function getAllTasks(req, res) {
  try {
    const tasks = await Task.find(); // Use the Mongoose 'find' method to get all tasks
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
}

// Controller function to get a specific task by its ID
export async function getTaskById(req, res) {
  try {
    const task = await Task.findById(req.params.id); // Use the Mongoose 'findById' method to get a specific task
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching task', error });
  }
}

// Controller function to update a specific task by its ID
export async function updateTaskById(req, res) {
  try {
    const { title, description, dueDate } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, dueDate },
      { new: true } // Return the updated task
    ); // Use the Mongoose 'findByIdAndUpdate' method to update a task
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error });
  }
}

// Controller function to delete a specific task by its ID
export async function deleteTaskById(req, res) {
  try {
    const task = await Task.findByIdAndDelete(req.params.id); // Use the Mongoose 'findByIdAndDelete' method to delete a task
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error });
  }
}

export async function updateCompleted(req, res) {
  try {
    const { completed } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { completed },
      { new: true } // Return the updated task
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error });
  }
}

// Export the controller functions
// module.exports = {
//   createTask,
//   getAllTasks,
//   getTaskById,
//   updateTaskById,
//   deleteTaskById,
//   updateCompleted,
// };

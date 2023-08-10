import express from 'express';
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
  updateCompleted,
} from '../controller/taskController.js';

const tasksRouter = express.Router();

tasksRouter.post('/add', createTask);
tasksRouter.delete('/remove/:id', deleteTaskById);
tasksRouter.get('/', getAllTasks);
tasksRouter.get('/getBy/:id', getTaskById);
tasksRouter.put('/update/:id', updateTaskById);
tasksRouter.patch('/updateCom/:id', updateCompleted);
export default tasksRouter;

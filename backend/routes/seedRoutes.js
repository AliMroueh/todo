import express from 'express';
import Task from '../models/taskModel.js';
import data from '../data.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  await Task.deleteMany({});
  const createdTasks = await Task.insertMany(data.tasks);
  res.send({ createdTasks });
});
export default seedRouter;

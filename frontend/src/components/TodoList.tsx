
import React from "react";
import Task from "./Task";
import { ITask } from "@/types/tasks";

interface TodoListProps {
  tasks: ITask[] | undefined;
}

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
  // const TodoList = ({ tasks }) => {
  return (
    <div className='overflow-x-auto'>
      <table className='table w-full'>
        {/* head */}
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>DueDate</th>
            <th>IsComplete</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks!.map((task) => (
            <Task key={task._id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;

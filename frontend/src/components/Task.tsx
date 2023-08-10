"use client";

import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
// import { deleteTodo, editTodo } from "@/api";
import { useFormik } from "formik";
import { basicSchema } from "../schema";
import { ITask } from "@/types/tasks";
import { useDeleteTodoMutation, useUpdateCompleteTodoMutation, useUpdateTodoMutation } from "@/redux/features1/api/apiSlice";
// import { useGetTodosQuery } from "../redux/features/api/apiSlice";
interface TaskProps {
  task: ITask;
}
const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
  const [deleteTodo] = useDeleteTodoMutation()
  const [updateTodo] = useUpdateTodoMutation()
  const [updateCompleteTodo]= useUpdateCompleteTodoMutation();
  const onSubmit = async (values: any, actions: any) => {
    await updateTodo({
      _id: task._id,
      title: values.title,
      description: values.description,
      dueDate: new Date(values.dueDate),
    });
    console.log('hello')
    router.refresh();
    setOpenModalEdit(false);
  };
  const check = async(e: any,values: any, actions: any) =>{
e.preventDefault()
    console.log(values)
    console.log('hello')
  }
  const changeComplete = async(id: string, isComplete: boolean) => {
    await updateCompleteTodo({
      _id: id,
      completed: isComplete
    })
    router.refresh();
  }

  console.log(task._id)
  const initialValues: ITask = {
    _id: task._id,
    title: task.title,
    description: task.description,
    dueDate: new Date(task.dueDate),
  };
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema: basicSchema,
    onSubmit,
  });
  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setOpenModalDeleted(false);
    router.refresh();
  };
  return (
    
    <tr key={task._id}>
      <td className='w-full'>{task.title}</td>
      <td className='w-full'>{task.description}</td>
      <td className='w-full'>{new Date(task.dueDate) ? new Date(task.dueDate).toISOString().split('T')[0] : ''}</td>
      <td className='w-full'>{task.completed ? <span className="cursor-pointer" onClick={() => changeComplete(task._id!,!task.completed)}>completed</span> : <span className="cursor-pointer" onClick={() => changeComplete(task._id!,!task.completed)}>not completed</span>}</td>
      <td className='flex gap-5'>
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          cursor='pointer'
          className='text-blue-500'
          size={25}
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
      <form autoComplete="off" className="flex flex-col" onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input
        value={values.title}
        onChange={handleChange}
        id="title"
        type="text"
        placeholder="Enter your title"
        onBlur={handleBlur}
        className={errors.title && touched.title ? "input-error" : ""}
      />
      {errors.title && touched.title && <p className="error">{errors.title}</p>}
      <label htmlFor="description">Description</label>
      <input
        id="description"
        type="text"
        placeholder="Enter description"
        value={values.description}
        onChange={handleChange}
        onBlur={handleBlur}
        className={errors.description && touched.description ? "input-error" : ""}
      />
      {errors.description && touched.description && <p className="error">{errors.description}</p>}
      <label htmlFor="dueDate">Date</label>
      <input
        id="dueDate"
        type="date"
        placeholder="Enter your dueDate"
        value={new Date(values.dueDate).toISOString().split('T')[0]}
        onChange={handleChange}
        onBlur={handleBlur}
        className={errors.dueDate && touched.dueDate ? "input-error" : ""}
      />
      <button disabled={isSubmitting} type="submit">
        Submit
      </button>
    </form>
        </Modal>
        <FiTrash2
          onClick={() => setOpenModalDeleted(true)}
          cursor='pointer'
          className='text-red-500'
          size={25}
        />
        <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
          <h3 className='text-lg'>
            Are you sure, you want to delete this task?
          </h3>
          <div className='modal-action'>
            <button onClick={() => task._id && handleDeleteTask(task._id)} className='btn'>
              Yes
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;

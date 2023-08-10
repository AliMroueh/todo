"use client";

import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
// import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { useFormik } from "formik";
import { basicSchema } from "../schema";
import { ITask } from "@/types/tasks";
import { useAddTodoMutation } from "@/redux/features1/api/apiSlice";

const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTitleValue, setNewTitleValue] = useState<string>("");
  const [newDescriptionValue, setNewTaskValue] = useState<string>("");
  const [newDueDateValue, setNewDueDateValue] = useState<Date>(new Date());
  const [newIsCompleteValue, setNewIsCompleteValue] = useState<string>("");
  const [addTodo] = useAddTodoMutation()
  const onSubmit = async (values: any, actions: any) => {
    console.log('hello from add')
    await addTodo({
        title: values.title,
        description: values.description,
        dueDate: new Date(values.dueDate),
        isComplete: false,
      });
    actions.resetForm();
    setNewTaskValue("");
    setModalOpen(false);
    router.refresh();
  }
  
  const initialValues: ITask = {
    title: "",
    description: "",
    dueDate: new Date(),
    completed: false,
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
  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className='btn btn-primary w-full'
      >
        Add new task <AiOutlinePlus className='ml-2' size={18} />
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
    <form onSubmit={handleSubmit} autoComplete="off" className="flex flex-col">
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
    </div>
  );
};

export default AddTask;

import { ITask } from "@/types/tasks";
import * as yup from "yup";

export const basicSchema: yup.Schema<ITask> = yup.object().shape({
    title: yup.string().required("Please enter a title").min(3,'Please give more than 3 character').max(10,'Please give less than 10 characters.'),
    description: yup.string().required("Please enter a description").min(10,'Please give more than 10 character').max(50,'Please give less than 50 characters.'),
    isComplete: yup.string().required("Please enter a complete").min(3,'Please give more than 3 character').max(10,'Please give less than 10 characters.'),
    dueDate: yup.date().required('Due Date is required'),
    
  });
  
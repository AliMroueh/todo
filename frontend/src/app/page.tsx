"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetTodosQuery } from "@/redux/features1/api/apiSlice";
import AddTask from "@/components/AddTask";
import TodoList from "@/components/TodoList";

export default function Home() {
  const { isLoading: loading, isFetching: fetching, data:data1, error: second_error } = useGetTodosQuery(null);

  return (
    <main className='max-w-4xl mx-auto mt-4'>
      <div className='text-center my-5 flex flex-col gap-4'>
        <h1 className='text-2xl font-bold'>Todo List App</h1>
        <AddTask />
      </div>
      {loading
      ?
      <div>loading ...</div>
      :
      <TodoList tasks={data1} />
      }
    </main>
  );
}

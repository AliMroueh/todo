import { ITask } from '@/types/tasks';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type Todo = {
    id?: string,
    title: string;
    description: string;
    dueDate: Date;
    isComplete: string;
  };

export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    refetchOnFocus: true,
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
    tagTypes: ['Todos'],
    endpoints: (builder) => ({
        getTodos: builder.query<ITask[],null>({
            query: () => '/task',
            // transformResponse: res => res.sort((a, b) => b.id - a.id),
            providesTags: ['Todos']
        }),
        addTodo: builder.mutation({
            query: (todo) => ({
                url: '/task/add',
                method: 'POST',
                body: todo
            }),
            invalidatesTags: ['Todos']
        }),
        updateTodo: builder.mutation({
            query: (todo) => ({
                url: `/task/update/${todo._id}`,
                method: 'PUT',
                body: todo
            }),
            invalidatesTags: ['Todos']
        }),
        updateCompleteTodo: builder.mutation({
            query: (todo) => ({
                url: `/task/updateCom/${todo._id}`,
                method: 'PATCH',
                body: todo
            }),
            invalidatesTags: ['Todos']
        }),
        deleteTodo: builder.mutation({
            query: ( id ) => ({
                url: `/task/remove/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['Todos']
        }),
    })
})

export const {
    useGetTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useUpdateCompleteTodoMutation,
    useDeleteTodoMutation
} = apiSlice
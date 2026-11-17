import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type Todo } from "../types/todo";



type TodoStore = {
    todos: Todo[];
    addTodo: (text: string) => void;
    toggleTodo: (id: number) => void;
    removeTodo: (id: number) => void;
};

export const useTodoStore = create<TodoStore>()(
    persist(
        (set) => ({
            todos: [],

            addTodo: (text) => set((state) => {
               const newTask = { id: Date.now(), text, done: false };
               return { todos: [...state.todos, newTask] }; 
            }),

            toggleTodo: (id) => set((state) => {
                const newTodos = state.todos.map((todo) => {
                    if(todo.id === id){
                        return {...todo, done : !todo.done};
                    }

                    return todo
                });
                return { todos: newTodos };
            }),

            removeTodo: (id) => set((state) => {
                const newTodos = state.todos.filter((todo) => todo.id !== id)
                return { todos: newTodos };
            }),
        }),
        {
            name: 'todo-storage',
        }
    ),
)
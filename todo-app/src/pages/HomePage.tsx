import { useState } from "react";
import { type Todo } from "../types/todo";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { TodoList } from "../components/TodoList";
import { AddTodoForm } from "../components/AddTodoForm";



export function HomePage() {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", [])
  const [filter, setFilter] = useState("all")
  const activeCount = todos.filter((todo) => !todo.done).length
  
  let filteredTodos = todos
  if(filter === "active"){
    filteredTodos = todos.filter((todo) => !todo.done)
  }else if(filter === "done"){
    filteredTodos = todos.filter((todo) => todo.done)
  }

  return (
    <>
      <TodoList tasks={filteredTodos} 
      onDelete={(id) => {
        const newTodos = todos.filter((todo) => todo.id !== id)
        setTodos(newTodos)
      }}
      onToggle={(id) => {
        const newTodos = todos.map((todo) => {
          if(todo.id === id){
            return {...todo, done : !todo.done};
          }

          return todo;
        });
        setTodos(newTodos);
      }}/>
        
      <AddTodoForm onAdd={(text) => {
        const newTask = {
          id: Date.now(),
          text: text,
          done: false
        };
        setTodos([...todos, newTask]);
      }} />

      <div>Залишилось: {activeCount}</div>

      <button onClick={() => setFilter("all")}>all</button>
      <button onClick={() => setFilter("active")}>active</button>
      <button onClick={() => setFilter("done")}>done</button>
    </>
  )
}
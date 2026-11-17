import { TodoList } from "../components/TodoList";
import { AddTodoForm } from "../components/AddTodoForm";
import { useSearchParams } from "react-router-dom";
import { useTodoStore } from "../store/todoStore";
import { RemoteTodoList } from "../components/RemoteTodoList";



export function HomePage() {
  const todos = useTodoStore((state) => state.todos);
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("filter") || 'all'
  const activeCount = todos.filter((todo) => !todo.done).length
  
  let filteredTodos = todos
  if(filter === "active"){
    filteredTodos = todos.filter((todo) => !todo.done)
  }else if(filter === "done"){
    filteredTodos = todos.filter((todo) => todo.done)
  }

  return (
    <>
      <TodoList tasks={filteredTodos} />
        
      <AddTodoForm />

      <div className="mt-4">Залишилось: {activeCount}</div>

      <div className="flex gap-2 mt-2">
        <button onClick={() => setSearchParams({ filter: "all" })} className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded">all</button>
        <button onClick={() => setSearchParams({ filter: "active" })} className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded">active</button>
        <button onClick={() => setSearchParams({ filter: "done" })} className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded">done</button>
      </div>

      <RemoteTodoList />
    </>
  )
}
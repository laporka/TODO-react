import { type Todo } from "../types/todo";
import { useTodoStore } from "../store/todoStore";

type TodoItemProps = {
  task : Todo
}

export function TodoItem({ task } : TodoItemProps) {
  const toggleTodo = useTodoStore((state) => state.toggleTodo)
  const removeTodo = useTodoStore((state) => state.removeTodo)

  return (
    <div className="space-y-2 mb-2 p-3 bg-gray-50 dark:bg-gray-800 rounded shadow-sm">
      {task.text}
      <input type="checkbox" checked={task.done} onChange={() =>
        toggleTodo(task.id)
      } className="ml-2 mr-4 mb-0" />
      <button onClick={() =>
        removeTodo(task.id)
      } className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded">
        Видалити
      </button>
    </div>
  )
}
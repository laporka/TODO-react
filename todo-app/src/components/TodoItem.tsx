import { type Todo } from "../types/todo";

type TodoItemProps = {
  task : Todo,
  onToggle : (id : number) => void,
  onDelete : (id : number) => void 
}

export function TodoItem({ task, onToggle, onDelete } : TodoItemProps) {
  return (
    <div>
      {task.text}
      <input type="checkbox" checked={task.done} onChange={() =>
        onToggle(task.id)
      }/>
      <button onClick={() =>
        onDelete(task.id)
      }>
        Видалити
      </button>
    </div>
  )
}
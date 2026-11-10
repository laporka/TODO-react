import { type Todo } from "../types/todo";
import { TodoItem } from "./TodoItem";

type TodoListProps = { 
  tasks : Todo[],
  onToggle : (id : number) => void,
  onDelete : (id : number) => void 
}

export function TodoList({ tasks, onToggle, onDelete } : TodoListProps) {
  return (
    <div>
      {tasks.map((task) => 
        (<TodoItem key={task.id} onDelete={onDelete} onToggle={onToggle} task={task} />
      ))}
    </div>
  )
}
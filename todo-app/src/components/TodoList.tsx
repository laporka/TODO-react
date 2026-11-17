import { type Todo } from "../types/todo";
import { TodoItem } from "./TodoItem";

type TodoListProps = { 
  tasks : Todo[],
}

export function TodoList({ tasks } : TodoListProps) {
  return (
    <div>
      {tasks.map((task) => 
        (<TodoItem key={task.id} task={task} />
      ))}
    </div>
  )
}
import { useState } from 'react'
import './App.css'



type Todo = { id: number; text: string; done: boolean }
type TodoListProps = { 
  tasks : Todo[],
  onToggle : (id : number) => void,
  onDelete : (id : number) => void 
}
type TodoItemProps = {
  task : Todo,
  onToggle : (id : number) => void,
  onDelete : (id : number) => void 
}
type AddTodoFormProps = { 
  onAdd : (text : string) => void 
}



function TodoItem({ task, onToggle, onDelete } : TodoItemProps) {
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

function TodoList({ tasks, onToggle, onDelete } : TodoListProps) {
  return (
    <div>
      {tasks.map((task) => 
        (<TodoItem key={task.id} onDelete={onDelete} onToggle={onToggle} task={task} />
      ))}
    </div>
  )
}

function AddTodoForm({onAdd} : AddTodoFormProps) {
  const [text, setText] = useState("")

  return (
    <div>
      <input type="text" value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={() => {
        if(text.trim() != ""){
          onAdd(text)
          setText("")
        }
      }}>
        Додати
      </button>
    </div>
  )
}



function App() {
  const [todos, setTodos] = useState<Todo[]>([])

 return (
    <>
      <TodoList tasks={todos} onDelete={(id) => {
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
    </>
  )
}

export default App

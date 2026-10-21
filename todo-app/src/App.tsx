import { useEffect, useState } from 'react'
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



function useLocalStorage<T>(key : string, initialValue : T) {
  const [value, setValue] = useState<T>(() => {
    const saved = localStorage.getItem(key);
    if(saved){
      return JSON.parse(saved);
    }
    
    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}



function App() {
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

export default App

import { useState } from 'react'
import { useTodoStore } from '../store/todoStore'



export function AddTodoForm() {
  const [text, setText] = useState("")
  const addTodo = useTodoStore((state) => state.addTodo)

  return (
    <div>
      <input type="text" value={text}
        onChange={(e) => setText(e.target.value)}
      className="p-1 bg-gray-50 dark:bg-gray-800 rounded shadow-sm mr-2" />
      <button onClick={() => {
        if(text.trim() != ""){
          addTodo(text)
          setText("")
        }
      }}className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded" >
        Додати
      </button>
    </div>
  )
}
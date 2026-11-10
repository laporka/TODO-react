import { useState } from 'react'

type AddTodoFormProps = { 
  onAdd : (text : string) => void 
}

export function AddTodoForm({onAdd} : AddTodoFormProps) {
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
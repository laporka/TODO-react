import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";



type RemoteTodo = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
};



const fetchRemoteTodos = async (): Promise<RemoteTodo[]> => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");

    if(!response.ok){
        throw new Error("не вдалося завантажити задачі");
    }

    return response.json();
}


const addRemoteTodo = async (title: string): Promise<RemoteTodo> => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        body: JSON.stringify({
            title: title,
            completed: false,
            userId: 1,
        }),
        headers: {
            "COntent-type": "application/json; charset=UTF-8", 
        },
    });

    if(!response.ok){
        throw new Error("Помилка при додаванні")
    }

    return response.json();
}



export function RemoteTodoList() {
    const queryClient = useQueryClient();
    const [newTitle, setNewTitle] = useState("");

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["remoteTodos"],
        queryFn: fetchRemoteTodos,
    });


    const mutation = useMutation({
        mutationFn: addRemoteTodo,
        onSuccess: (newTodo) => {
            queryClient.setQueryData(["remoteTodos"], (oldData: RemoteTodo[] | undefined) => {
                if(!oldData){
                    return [newTodo];
                }

                return [newTodo, ...oldData];
            });

            setNewTitle("");
        },
    });


    if(isLoading){
        return <div className="mt-8 text-blue-500 font-bold">Завантаження серверних задач</div>
    }

    if(isError){
        return <div className="mt-8 text-red-500 font-bold">Помилка {error.message}</div>
    }


    return (
        <div className="mt-8 p-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Задачі з сервера</h2>

            <div className="flex gap-2 mb-4">
                <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="border text-gray-900 p-2 rounded dark:bg-gray-800 dark:text-white flex-grow" placeholder="Введіть нову задачу" />
                <button onClick={() => {
                    if(newTitle.trim()){
                        mutation.mutate(newTitle);
                    }
                }}
                disabled={mutation.isPending}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    {mutation.isPending ? "Додавання..." : "Додати задачу"}
                </button>
            </div>

            <ul className="space-y-2">
                {data?.map((todo) => (
                    <li key={todo.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded shadow-sm">
                        <span className="mr-2">{todo.completed ? "Виконано" : "Очікується"}</span>
                        {todo.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}
import { useQuery, useMutation, useQueryClient } from "react-query"
import { getTodos, addTodos, updateTodos, deleteTodos } from "../api/todosApi"

import { FcUpload } from 'react-icons/fc'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'

import { useState } from "react"
import Link from "next/link"
const TodoList = () => {
    const [newTodo, setNewTodo] = useState('')
    const [description, setDescription] = useState('');
    const queryClient = useQueryClient()

    const {
        data: todos,
        isLoading,
        isError,
        error } = useQuery('todos', getTodos, {
            select: data => data.sort((a, b) => b.id - a.id)
        })

    const addTodoMutation = useMutation(addTodos, {
        onSuccess: () => {
            //invalid cach
            queryClient.invalidateQueries("todos")
        }
    })

    const deleteTodoMutation = useMutation(deleteTodos, {
        onSuccess: () => {
            //invalid cach
            queryClient.invalidateQueries("todos")
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        addTodoMutation.mutate({
            title: newTodo,
            description: description,
        })
        setNewTodo('')
    }

    const newItemSection = (
        <form onSubmit={handleSubmit}>
            <label htmlFor="new-todo">
                Add new feature
            </label>
            <div>
                <input
                    type="text"
                    id="new-todo"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="name"
                />
                <br />
                <br />
                <input
                    type="text"
                    id="new-todo"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="description"
                />
        
            </div>
            <br />
            <button className="submit" style={{display:'flex'}}>
               upload <FcUpload size={30}/>
            </button>
        </form>
    )

    let content
    if (isLoading) {
        content = <p>Loading...</p>
    } else if (isError) {
        content = <p>{error.message}</p>
    } else {
        // content = JSON.stringify(todos)
        content = todos.map((todo) => {
            return (
                <article key={todo.id}>
                    <div className="todo">

                        
                        <label htmlFor={todo.id}>
                            {todo.title} <br />
                            {todo.description}
                        </label>

                    </div>
                    <button  onClick={() => deleteTodoMutation.mutate({ id: todo.id })}>
                        <AiFillDelete size={35} className="text-red-600" />
                    </button>
                    <Link href={`todos/${todo.id}`}>
                    <AiFillEdit  size={35}/>
                            </Link>
                </article>
            )
        })
    }

    return (
        <main>
            <h1>Feature List</h1>
            {newItemSection}
            {content}
        </main>
    )
}

export default TodoList
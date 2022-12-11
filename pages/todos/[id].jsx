import axios from "axios";
import { useRouter } from "next/router"
import { useMutation, useQuery, useQueryClient } from "react-query";
import { updateTodos } from "../api/todosApi";

const Todo = () => {
    const router = useRouter();
    const {id}  = router.query;
    const queryClient = useQueryClient()

    const updateTodoMutation = useMutation(updateTodos, {
      onSuccess: () => {
          //invalid cach
          queryClient.invalidateQueries("todos")
      }
  })

    const { data:todo, isLoading, isError,} = useQuery(['todo'], async () => axios.get(`http://localhost:3500/todos/${id}`));
    if(isLoading) return
    
    const handleSubmit = (e) => {
      e.preventDefault();
      updateTodoMutation.mutate({id: id, title: e.target.title.value, description: e.target.description.value})
    }

  return (
    <form onSubmit={handleSubmit}>
      <input name='title' type={'text'} defaultValue={todo?.data.title}/>
      <br />
      <input name='description' type={'text'} defaultValue={todo?.data.description}/>
      <br />
        <input type={'submit'} value="update" />
      
    </form>
  )
}

export default Todo
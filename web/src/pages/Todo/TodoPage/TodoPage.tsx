import TodoCell from 'src/components/Todo/TodoCell'

type TodoPageProps = {
  id: number
}

const TodoPage = ({ id }: TodoPageProps) => {
  return <TodoCell id={id} />
}

export default TodoPage

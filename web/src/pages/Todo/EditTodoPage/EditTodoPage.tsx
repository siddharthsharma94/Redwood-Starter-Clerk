import EditTodoCell from 'src/components/Todo/EditTodoCell'

type TodoPageProps = {
  id: number
}

const EditTodoPage = ({ id }: TodoPageProps) => {
  return <EditTodoCell id={id} />
}

export default EditTodoPage

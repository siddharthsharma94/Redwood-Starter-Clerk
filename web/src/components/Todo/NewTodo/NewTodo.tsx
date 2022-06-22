import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import TodoForm from 'src/components/Todo/TodoForm'

const CREATE_TODO_MUTATION = gql`
  mutation CreateTodoMutation($input: CreateTodoInput!) {
    createTodo(input: $input) {
      id
    }
  }
`

const NewTodo = () => {
  const [createTodo, { loading, error }] = useMutation(CREATE_TODO_MUTATION, {
    onCompleted: () => {
      toast.success('Todo created')
      navigate(routes.todos())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    createTodo({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Todo</h2>
      </header>
      <div className="rw-segment-main">
        <TodoForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewTodo

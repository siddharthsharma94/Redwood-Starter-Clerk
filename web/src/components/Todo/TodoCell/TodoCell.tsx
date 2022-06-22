import type { FindTodoById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Todo from 'src/components/Todo/Todo'

export const QUERY = gql`
  query FindTodoById($id: Int!) {
    todo: todo(id: $id) {
      id
      name
      date
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Todo not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ todo }: CellSuccessProps<FindTodoById>) => {
  return (
    <div>
      <p className="text-blue-500 font-bold"> Hello!</p>
      <Todo todo={todo} />
    </div>
  )
}

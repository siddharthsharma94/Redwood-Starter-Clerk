import type { FindTodos } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Todos from 'src/components/Todo/Todos'

export const QUERY = gql`
  query FindTodos {
    todos {
      id
      name
      date
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No todos yet. '}
      <Link
        to={routes.newTodo()}
        className="rw-link"
      >
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ todos }: CellSuccessProps<FindTodos>) => {
  return <Todos todos={todos} />
}

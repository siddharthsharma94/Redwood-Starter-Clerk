import type { FindTodos } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Todos from 'src/components/Todo/Todos'
import { SignInButton, useAuth, UserButton } from '@clerk/clerk-react'

export const QUERY = gql`
  query FindTodos {
    todos {
      id
      name
      date
    }
  }
`

const UserInfo = () => {
  const { isSignedIn, sessionId, userId } = useAuth()
  return (
    <>
      {isSignedIn ? (
        <UserButton afterSignOutUrl={window.location.href} />
      ) : (
        <SignInButton mode="modal" redirectUrl={window.location.pathname}>
          <button>Log in</button>
        </SignInButton>
      )}
    </>
  )
}

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      <UserInfo />
      {'No todos yet. '}
      <Link to={routes.newTodo()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <>
    <UserInfo />
    <div className="rw-cell-error">{error.message}</div>
  </>
)

export const Success = ({ todos }: CellSuccessProps<FindTodos>) => {
  const { isSignedIn, sessionId, userId } = useAuth()

  return (
    <>
      <UserInfo />
      <Todos todos={todos} />
    </>
  )
}

import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type TodoLayoutProps = {
  children: React.ReactNode
}

const TodosLayout = ({ children }: TodoLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link
            to={routes.todos()}
            className="rw-link"
          >
            Todos
          </Link>
        </h1>
        <Link
          to={routes.newTodo()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New Todo
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default TodosLayout

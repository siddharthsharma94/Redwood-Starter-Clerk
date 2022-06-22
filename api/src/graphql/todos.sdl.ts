export const schema = gql`
  type Todo {
    id: Int!
    name: String
    date: DateTime!
  }

  type Query {
    todos: [Todo!]! @requireAuth
    todo(id: Int!): Todo @requireAuth
  }

  input CreateTodoInput {
    name: String
    date: DateTime!
  }

  input UpdateTodoInput {
    name: String
    date: DateTime
  }

  type Mutation {
    createTodo(input: CreateTodoInput!): Todo! @requireAuth
    updateTodo(id: Int!, input: UpdateTodoInput!): Todo! @requireAuth
    deleteTodo(id: Int!): Todo! @requireAuth
  }
`

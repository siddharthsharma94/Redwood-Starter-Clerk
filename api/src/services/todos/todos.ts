import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const todos: QueryResolvers['todos'] = () => {
  return db.todo.findMany({ where: { userId: context.currentUser.id } })
}

export const todo: QueryResolvers['todo'] = ({ id }) => {
  return db.todo.findFirst({
    where: { id, userId: context.currentUser.id },
  })
}

export const createTodo: MutationResolvers['createTodo'] = ({ input }) => {
  return db.todo.create({
    data: { ...input, userId: context.currentUser.id },
  })
}

export const updateTodo: MutationResolvers['updateTodo'] = ({ id, input }) => {
  return db.todo.update({
    data: input,
    where: { id },
  })
}

export const deleteTodo: MutationResolvers['deleteTodo'] = ({ id }) => {
  return db.todo.delete({
    where: { id },
  })
}

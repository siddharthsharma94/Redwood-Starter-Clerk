import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.TodoCreateArgs>({
  todo: {
    one: { data: { date: '2022-06-22T02:04:22Z' } },
    two: { data: { date: '2022-06-22T02:04:22Z' } },
  },
})

export type StandardScenario = typeof standard

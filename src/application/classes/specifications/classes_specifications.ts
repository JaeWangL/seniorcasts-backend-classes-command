import type { Prisma } from '@prisma/client';

export function likeTitle(query: string): Prisma.ClassesWhereInput {
  return {
    title: {
      contains: query,
    },
  };
}

export function likeDescription(query: string): Prisma.ClassesWhereInput {
  return {
    OR: [
      {
        about: {
          contains: query,
        },
        what_learn: {
          contains: query,
        },
      },
    ],
  };
}

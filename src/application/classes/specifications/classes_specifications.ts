import type { Prisma } from '@prisma/client';
import type { ClassesRelationInclude } from '../classes_interfaces';

export function filterInclude(
  include?: ClassesRelationInclude
): Prisma.ClassesInclude | undefined {
  if (!include) {
    return undefined;
  }

  return {
    categories: include.includeCategories,
    owner: include.includeOwner,
    sessions: include.includeSessions,
  };
}

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

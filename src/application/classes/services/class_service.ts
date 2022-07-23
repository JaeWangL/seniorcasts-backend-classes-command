import type { Edge } from '@devoxa/prisma-relay-cursor-connection';
import {
  type Connection,
  findManyCursorConnection,
} from '@devoxa/prisma-relay-cursor-connection';
import { DatabaseService } from '@infrastructure/database/services/database_service';
import { Injectable } from '@nestjs/common';
import type {
  Classes,
  Classes_Category,
  Classes_Sessions,
  Owners,
  Prisma,
} from '@prisma/client';
import type { ClassesRelationInclude } from '../classes_interfaces';
import {
  filterInclude,
  likeDescription,
  likeTitle,
} from '../specifications/classes_specifications';

export type ReturnClasses = Classes & {
  categories?: Classes_Category[];
  owner?: Owners;
  sessions?: Classes_Sessions[];
};

@Injectable()
export class ClassService {
  constructor(private dbSvc: DatabaseService) {}

  findByIdAsync(
    id: string,
    include?: ClassesRelationInclude
  ): Promise<ReturnClasses | null> {
    return this.dbSvc.classes.findUnique({
      where: {
        id,
      },
      include: filterInclude(include),
    });
  }

  async searchByQueryAsync(
    query: string,
    pageSize = 10,
    lastId?: string
  ): Promise<Connection<ReturnClasses, Edge<ReturnClasses>>> {
    const baseArgs: Prisma.ClassesFindManyArgs = {
      where: {
        OR: [likeTitle(query), likeDescription(query)],
      },
    };

    return findManyCursorConnection<ReturnClasses>(
      (args) => this.dbSvc.classes.findMany({ ...args, ...baseArgs }),
      () => this.dbSvc.classes.count({ where: baseArgs.where }),
      { first: pageSize, after: lastId }
    );
  }

  createAsync(data: Prisma.ClassesCreateInput): Promise<ReturnClasses> {
    return this.dbSvc.classes.create({
      data,
      include: {
        categories: true,
        sessions: true,
        owner: true,
      },
    });
  }

  updateByIdAsync(
    id: string,
    data: Prisma.ClassesUpdateInput
  ): Promise<ReturnClasses> {
    return this.dbSvc.classes.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteyIdAsync(id: string): Promise<void> {
    await this.dbSvc.classes.delete({
      where: {
        id,
      },
    });
  }
}

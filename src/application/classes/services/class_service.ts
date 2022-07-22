import type { Edge } from '@devoxa/prisma-relay-cursor-connection';
import {
  type Connection,
  findManyCursorConnection,
} from '@devoxa/prisma-relay-cursor-connection';
import { DatabaseService } from '@infrastructure/database/services/database_service';
import { Injectable } from '@nestjs/common';
import type { Classes, Prisma } from '@prisma/client';
import {
  likeDescription,
  likeTitle,
} from '../specifications/classes_specifications';

@Injectable()
export class ClassService {
  constructor(private dbSvc: DatabaseService) {}

  findByIdAsync(id: string): Promise<Classes | null> {
    return this.dbSvc.classes.findUnique({
      where: {
        id,
      },
    });
  }

  async searchByQueryAsync(
    query: string,
    pageSize = 10,
    lastId?: string
  ): Promise<Connection<Classes, Edge<Classes>>> {
    const baseArgs: Prisma.ClassesFindManyArgs = {
      where: {
        OR: [likeTitle(query), likeDescription(query)],
      },
    };

    return findManyCursorConnection<Classes>(
      (args) => this.dbSvc.classes.findMany({ ...args, ...baseArgs }),
      () => this.dbSvc.classes.count({ where: baseArgs.where }),
      { last: pageSize, after: lastId }
    );
  }

  createAsync(data: Prisma.ClassesCreateInput): Promise<Classes> {
    return this.dbSvc.classes.create({
      data,
    });
  }

  updateByIdAsync(
    id: string,
    data: Prisma.ClassesUpdateInput
  ): Promise<Classes> {
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

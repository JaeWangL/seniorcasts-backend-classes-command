import { DatabaseService } from '@infrastructure/database/services/database_service';
import { Injectable } from '@nestjs/common';
import type { Classes_Sessions, Prisma } from '@prisma/client';

@Injectable()
export class SessionService {
  constructor(private dbSvc: DatabaseService) {}

  findByIdAsync(id: string): Promise<Classes_Sessions | null> {
    return this.dbSvc.classes_Sessions.findUnique({
      where: {
        id,
      },
    });
  }

  createAsync(
    data: Prisma.Classes_SessionsUncheckedCreateInput
  ): Promise<Classes_Sessions> {
    return this.dbSvc.classes_Sessions.create({
      data,
    });
  }

  updateByIdAsync(
    id: string,
    data: Prisma.Classes_SessionsUpdateInput
  ): Promise<Classes_Sessions> {
    return this.dbSvc.classes_Sessions.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteyIdAsync(id: string): Promise<void> {
    await this.dbSvc.classes_Sessions.delete({
      where: {
        id,
      },
    });
  }
}

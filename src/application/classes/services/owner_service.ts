import { DatabaseService } from '@infrastructure/database/services/database_service';
import { Injectable } from '@nestjs/common';
import type { Owners, Prisma } from '@prisma/client';

@Injectable()
export class OwnerService {
  constructor(private dbSvc: DatabaseService) {}

  findByIdAsync(id: number): Promise<Owners | null> {
    return this.dbSvc.owners.findUnique({
      where: {
        id,
      },
    });
  }

  findByUserIdAsync(userId: string): Promise<Owners | null> {
    return this.dbSvc.owners.findUnique({
      where: {
        user_id: userId,
      },
    });
  }

  createAsync(data: Prisma.OwnersUncheckedCreateInput): Promise<Owners> {
    return this.dbSvc.owners.create({
      data,
    });
  }

  updateByIdAsync(id: number, data: Prisma.OwnersUpdateInput): Promise<Owners> {
    return this.dbSvc.owners.update({
      where: {
        id,
      },
      data,
    });
  }

  updateByUserIdAsync(
    userId: string,
    data: Prisma.OwnersUpdateInput
  ): Promise<Owners> {
    return this.dbSvc.owners.update({
      where: {
        user_id: userId,
      },
      data,
    });
  }

  async deleteyIdAsync(id: number): Promise<void> {
    await this.dbSvc.owners.delete({
      where: {
        id,
      },
    });
  }

  async deleteyUserIdAsync(userId: string): Promise<void> {
    await this.dbSvc.owners.delete({
      where: {
        user_id: userId,
      },
    });
  }
}

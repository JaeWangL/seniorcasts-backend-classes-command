import { DatabaseService } from '@infrastructure/database/services/database_service';
import { Injectable } from '@nestjs/common';
import type { Classes, Prisma } from '@prisma/client';

@Injectable()
export class ClassService {
  constructor(private dbSvc: DatabaseService) {}

  async findByIdAsync(classId: string): Promise<Classes | null> {
    const tt = await this.dbSvc.classes.findUnique({
      where: {
        class_id: classId,
      },
    });

    return tt;
  }

  createAsync(data: Prisma.ClassesCreateInput): Promise<Classes> {
    return this.dbSvc.classes.create({
      data,
    });
  }
}

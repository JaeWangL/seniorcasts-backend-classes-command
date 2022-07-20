import { DatabaseService } from '@infrastructure/database/services/database_service';
import { Injectable } from '@nestjs/common';
import type { Classes, Prisma } from '@prisma/client';

@Injectable()
export class ClassService {
  constructor(private dbSvc: DatabaseService) {}

  findByIdAsync(classId: string): Promise<Classes | null> {
    return this.dbSvc.classes.findUnique({
      where: {
        class_id: classId,
      },
    });
  }

  createAsync(data: Prisma.ClassesCreateInput): Promise<Classes> {
    return this.dbSvc.classes.create({
      data,
    });
  }
}

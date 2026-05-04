import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { softDeleteExtension } from './prisma.extension';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  readonly extended;

  constructor() {
    super();
    this.extended = this.$extends(softDeleteExtension);
  }

  async onModuleInit() {
    await this.$connect();
  }

  get client() {
    return this.extended;
  }
}

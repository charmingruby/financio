import { Injectable } from '@nestjs/common'
import { type Prisma } from '@prisma/client'

import { PrismaService } from '../prisma.service'

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(dto: Prisma.UserCreateArgs) {
    return this.prismaService.user.create(dto)
  }

  findUnique(dto: Prisma.UserFindUniqueArgs) {
    return this.prismaService.user.findUnique(dto)
  }
}

import { Controller, Get } from '@nestjs/common'

import { ActiverUserId } from '@/shared/decorators/activer-user-id'

import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  me(@ActiverUserId() userId: string) {
    return this.usersService.getUserById(userId)
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcryptjs'

import { UsersRepository } from '@/shared/database/repositories/users.repositories'

import { AuthenticateDto } from './dto/authenticate.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersRepo: UsersRepository,
  ) {}

  async authenticate(dto: AuthenticateDto) {
    const { email, password } = dto

    const user = await this.usersRepo.findUnique({
      where: { email },
    })

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.')
    }

    const isPasswordValid = await compare(password, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials.')
    }

    const accessToken = await this.jwtService.signAsync({ sub: user.id })

    return { accessToken }
  }
}

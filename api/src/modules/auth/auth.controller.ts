import { Body, Controller, Post } from '@nestjs/common'

import { IsPublic } from '@/shared/decorators/is-public'

import { AuthService } from './auth.service'
import { SigninDto } from './dto/signin.dto'
import { SignupDto } from './dto/signup.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('signin')
  authenticate(@Body() dto: SigninDto) {
    return this.authService.signin(dto)
  }

  @IsPublic()
  @Post('signup')
  create(@Body() dto: SignupDto) {
    return this.authService.signup(dto)
  }
}

import { Body, Controller, Post } from '@nestjs/common'

import { AuthService } from './auth.service'
import { AuthenticateDto } from './dto/authenticate.dto'
import { RegisterDto } from './dto/register'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  authenticate(@Body() dto: AuthenticateDto) {
    return this.authService.authenticate(dto)
  }

  @Post('signup')
  create(@Body() registerDto: RegisterDto) {
    return this.authService.create(registerDto)
  }
}

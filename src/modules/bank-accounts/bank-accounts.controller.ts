import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common'

import { ActiverUserId } from '@/shared/decorators/activer-user-id'

import { CreateBankAccountDto } from './dto/create-bank-account.dto'
import { UpdateBankAccountDto } from './dto/update-bank-account.dto'
import { BankAccountsService } from './services/bank-accounts.service'

@Controller('bank-accounts')
export class BankAccountsController {
  constructor(private readonly bankAccountsService: BankAccountsService) {}

  @Post()
  create(@ActiverUserId() userId: string, @Body() dto: CreateBankAccountDto) {
    return this.bankAccountsService.create(userId, dto)
  }

  @Get()
  findAll(@ActiverUserId() userId: string) {
    return this.bankAccountsService.findAllByUserId(userId)
  }

  @Put(':bankAccountId')
  update(
    @ActiverUserId() userId: string,
    @Param('bankAccountId', ParseUUIDPipe) bankAccountId: string,
    @Body() dto: UpdateBankAccountDto,
  ) {
    return this.bankAccountsService.update(userId, bankAccountId, dto)
  }

  @Delete(':bankAccountId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @ActiverUserId() userId: string,
    @Param('bankAccountId', ParseUUIDPipe) bankAccountId: string,
  ) {
    return this.bankAccountsService.remove(userId, bankAccountId)
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common'

import { ActiverUserId } from '@/shared/decorators/activer-user-id'
import { OptionalParseEnumPipe } from '@/shared/pipes/optional-parse-enum-pipe'
import { OptionalParseUUIDPipe } from '@/shared/pipes/optional-parse-uuid-pipe'

import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'
import { TransactionType } from './entities/transaction'
import { TransactionsService } from './services/transactions.service'

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(@ActiverUserId() userId: string, @Body() dto: CreateTransactionDto) {
    return this.transactionsService.create(userId, dto)
  }

  @Get()
  findAll(
    @ActiverUserId() userId: string,
    @Query('year', ParseIntPipe) year: number,
    @Query('month', ParseIntPipe) month: number,
    @Query('bankAccountId', OptionalParseUUIDPipe) bankAccountId?: string,
    @Query('type', new OptionalParseEnumPipe(TransactionType))
    type?: TransactionType,
  ) {
    console.log(type)
    return this.transactionsService.findAllByUserId(userId, {
      year,
      month,
      bankAccountId,
      type,
    })
  }

  @Put(':transactionId')
  update(
    @ActiverUserId() userId: string,
    @Param('transactionId', ParseUUIDPipe) transactionId: string,
    @Body() dto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(userId, transactionId, dto)
  }

  @Delete(':transactionId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @ActiverUserId() userId: string,
    @Param('transactionId', ParseUUIDPipe) transactionId: string,
  ) {
    return this.transactionsService.remove(userId, transactionId)
  }
}

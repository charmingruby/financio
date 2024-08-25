import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common'

import { ActiverUserId } from '@/shared/decorators/activer-user-id'

import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'
import { TransactionsService } from './services/transactions.service'

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(@ActiverUserId() userId: string, @Body() dto: CreateTransactionDto) {
    return this.transactionsService.create(userId, dto)
  }

  @Get()
  findAll(@ActiverUserId() userId: string) {
    return this.transactionsService.findAllByUserId(userId)
  }

  @Put(':transactionId')
  update(
    @ActiverUserId() userId: string,
    @Param('transactionId', ParseUUIDPipe) transactionId: string,
    @Body() dto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(userId, transactionId, dto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(+id)
  }
}

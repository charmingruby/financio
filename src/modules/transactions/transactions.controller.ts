import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'

import { ActiverUserId } from '@/shared/decorators/activer-user-id'

import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'
import { TransactionsService } from './transactions.service'

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(@Body() dto: CreateTransactionDto) {
    return this.transactionsService.create(dto)
  }

  @Get()
  findAll(@ActiverUserId() userId: string) {
    return this.transactionsService.findAllByUserId(userId)
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(+id, updateTransactionDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(+id)
  }
}

import { Controller, Get } from '@nestjs/common'

import { ActiverUserId } from '@/shared/decorators/activer-user-id'

import { TransactionCategoriesService } from './transaction-categories.service'

@Controller('transaction-categories')
export class TransactionCategoriesController {
  constructor(
    private readonly transactionCategoriesService: TransactionCategoriesService,
  ) {}

  @Get()
  findAll(@ActiverUserId() userId: string) {
    return this.transactionCategoriesService.findAllByUserId(userId)
  }
}

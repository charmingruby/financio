import { ConflictException, Injectable } from '@nestjs/common'
import { hash } from 'bcryptjs'

import { UsersRepository } from '@/shared/database/repositories/users.repositories'

import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async create(dto: CreateUserDto) {
    const { email, password } = dto

    const emailTaken = await this.usersRepo.findUnique({
      where: { email },
      select: { id: true },
    })
    if (emailTaken) {
      throw new ConflictException('This email is already in use.')
    }

    const hashedPassword = await hash(password, 12)

    const user = await this.usersRepo.create({
      data: {
        ...dto,
        password: hashedPassword,
        transactionCategories: {
          createMany: {
            data: [
              // Income
              { name: 'Salário', icon: 'salary', type: 'INCOME' },
              { name: 'Trabalho', icon: 'work', type: 'INCOME' },
              { name: 'Freelance', icon: 'freelance', type: 'INCOME' },
              { name: 'Outro', icon: 'other', type: 'INCOME' },
              // Expense
              { name: 'Casa', icon: 'home', type: 'EXPENSE' },
              { name: 'Alimentação', icon: 'food', type: 'EXPENSE' },
              { name: 'Educação', icon: 'education', type: 'EXPENSE' },
              { name: 'Lazer', icon: 'fun', type: 'EXPENSE' },
              { name: 'Mercado', icon: 'grocery', type: 'EXPENSE' },
              { name: 'Roupas', icon: 'clothes', type: 'EXPENSE' },
              { name: 'Transporte', icon: 'transport', type: 'EXPENSE' },
              { name: 'Viagem', icon: 'travel', type: 'EXPENSE' },
              { name: 'Outro', icon: 'other', type: 'EXPENSE' },
            ],
          },
        },
      },
    })

    return user
  }
}

import { plainToInstance } from 'class-transformer'
import { IsNotEmpty, IsString, validateSync } from 'class-validator'

class Env {
  @IsString()
  @IsNotEmpty()
  jwtSecret: string

  @IsString()
  @IsNotEmpty()
  databaseUrl: string
}

export const env: Env = plainToInstance(Env, {
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
})

const errors = validateSync(env)

if (errors.length > 0) {
  throw new Error(JSON.stringify(errors, null, 2))
}

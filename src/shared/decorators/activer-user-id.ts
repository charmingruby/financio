import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common'

export const ActiverUserId = createParamDecorator(
  (_, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()

    const userId = request.userId

    if (!userId) {
      throw new UnauthorizedException()
    }

    return userId
  },
)

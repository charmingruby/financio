import { ArgumentMetadata, ParseEnumPipe } from '@nestjs/common'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class OptionalParseEnumPipe<T = any> extends ParseEnumPipe<T> {
  override async transform(value: T, metadata: ArgumentMetadata) {
    if (typeof value === 'undefined') {
      return undefined
    }

    return super.transform(value, metadata)
  }
}

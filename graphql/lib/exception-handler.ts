import { HttpStatus, Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';

@Injectable()
export class ExceptionHandler {
  graphqlErrorHandler(message: string, e: any) {
    let internalMessageError = '';
    if (typeof e === 'string') {
      internalMessageError = e.toUpperCase(); // `e` narrowed to string
    } else if (e instanceof Error) {
      internalMessageError = e.message; // `e` narrowed to Error
    }
    console.error(`message: ${message}`, `error: ${e}`);
    throw new GraphQLError(message, {
      extensions: {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
      },
    });
  }
}

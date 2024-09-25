import { ArgumentsHost, Catch, WsExceptionFilter } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { ErrorDetails, ServerErrorResponse } from '@qj/shared/dist/types';

function isCustomErrorDetails(error: any): error is ErrorDetails {
  return !!error.code && !!error.message && !!error.details;
}

@Catch(WsException)
export class CustomWsExceptionFilter implements WsExceptionFilter {
  error: object;

  catch(exception: WsException, host: ArgumentsHost) {
    const client = host.switchToWs().getClient<Socket>();
    const error = exception.getError(); // Get the error message or object
    let response: ServerErrorResponse;

    if (isCustomErrorDetails(error)) {
      response = {
        status: 'error',
        error: error,
      };
    } else {
      response = {
        status: 'error',
        error: {
          code: 'WS_INTERNAL_SERVER_ERROR',
          message: 'Something went wrong on our side',
          details: 'Please try again after some time. If issue persists report it at fixmeqj@gmail.com',
          timestamp: new Date(),
        },
      };
    }

    client.emit('WS_SERVER_ERROR', response);
  }
}

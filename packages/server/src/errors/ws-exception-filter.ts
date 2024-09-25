import { ArgumentsHost, Catch, WsExceptionFilter } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { ErrorDetails, ServerErrorResponse } from '@qj/shared/dist/types';
import { ERRORS } from '@qj/shared';

function isCustomErrorDetails(error: any): error is Exclude<ErrorDetails, 'timestamp'> {
  return !!error.code && !!error.message && !!error.details;
}

@Catch(WsException)
export class CustomWsExceptionFilter implements WsExceptionFilter {
  error: object;

  catch(exception: WsException, host: ArgumentsHost) {
    const client = host.switchToWs().getClient<Socket>();
    const error = exception.getError(); // Get the error message or object
    let response: ServerErrorResponse;

    const errorTimeStamp = {
      timestamp: new Date(),
    };

    if (isCustomErrorDetails(error)) {
      response = {
        status: 'error',
        error: Object.assign(errorTimeStamp, error),
      };
    } else {
      response = {
        status: 'error',
        error: Object.assign(errorTimeStamp, ERRORS.WS_INTERNAL_SERVER_ERROR),
      };
    }

    client.emit('WS_SERVER_ERROR', response);
  }
}

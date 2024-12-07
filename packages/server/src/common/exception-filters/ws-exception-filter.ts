import { ArgumentsHost, Catch, HttpStatus, WsExceptionFilter } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { ErrorDetails, ServerErrorResponse } from '@qj/shared/dist/types';
import { ERRORS } from '../../../../shared';

function isCustomErrorDetails(error: any): error is Exclude<ErrorDetails, 'timestamp'> {
  return !!error.code && !!error.message && !!error.details;
}

@Catch(WsException)
export class CustomWsExceptionFilter implements WsExceptionFilter {
  catch(exception: WsException, host: ArgumentsHost) {
    const client = host.switchToWs().getClient<Socket>();
    const error = exception.getError(); // Get the error message or object

    const errorTimeStamp = {
      timestamp: new Date(),
    };

    const response: ServerErrorResponse = {
      status: 'error',
      error: isCustomErrorDetails(error)
        ? Object.assign(errorTimeStamp, error)
        : Object.assign(errorTimeStamp, ERRORS.WS_INTERNAL_SERVER_ERROR),
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    };

    client.emit('WS_SERVER_ERROR', response);
  }
}

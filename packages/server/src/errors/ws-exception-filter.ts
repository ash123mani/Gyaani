import { ArgumentsHost, Catch, WsExceptionFilter } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Catch(WsException)
export class CustomWsExceptionFilter implements WsExceptionFilter {
  catch(exception: WsException, host: ArgumentsHost) {
    const client = host.switchToWs().getClient<Socket>();
    const data = exception.getError(); // Get the error message or object
    const response = {
      status: 'error',
      message: data,
    };

    // Emit a custom event named "EXCEPTION" to the client
    client.emit('EXCEPTION', response);
  }
}

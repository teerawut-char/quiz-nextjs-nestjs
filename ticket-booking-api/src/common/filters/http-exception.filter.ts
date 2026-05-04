import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Internal server error';
    let code = '500';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse: any = exception.getResponse();
      message = typeof exceptionResponse === 'string' ? exceptionResponse : (exceptionResponse.message || exceptionResponse.error || exception.message);
      code = status.toString();
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    const finalMessage = Array.isArray(message) ? message.join(', ') : message;

    response
      .status(status)
      .json({
        code: code,
        message: finalMessage,
        data: null,
      });
  }
}

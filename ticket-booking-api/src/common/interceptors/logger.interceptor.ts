import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, headers, body, user } = request;
    const requestId = headers['x-request-id'] || 'no-request-id';

    return next.handle().pipe(
      tap((data) => {
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode;
        
        try {
          this.log(method, url, statusCode, requestId, user, body, 'info', 'Request successful');
        } catch (e) {
          console.error('Logging failed:', e.message);
        }
      }),
      catchError((error) => {
        const statusCode =
          error instanceof HttpException
            ? error.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;
        
        try {
          this.log(method, url, statusCode, requestId, user, body, 'error', error.message || 'Request failed');
        } catch (e) {
          console.error('Logging failed:', e.message);
        }
        return throwError(() => error);
      }),
    );
  }

  private log(
    method: string,
    url: string,
    statusCode: number,
    requestId: string,
    user: any,
    body: any,
    level: string,
    message: string,
  ) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      requestId,
      userId: user?.id || body?.userId || null,
      concertId: body?.concertId || body?.id || null,
      method,
      url,
      statusCode,
    };

    // แสดงเฉพาะฟิลด์ที่จำเป็นใน Console
    process.stdout.write(JSON.stringify(logEntry) + '\n');
  }
}

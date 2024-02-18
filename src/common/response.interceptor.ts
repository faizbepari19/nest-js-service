import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    HttpStatus,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  import { ResponseDto } from './response.dto';
  
  @Injectable()
  export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
        map(data => {
          // Check if the data is already in the desired format
          if (data instanceof ResponseDto) {
            return data;
          }
  
          // Customize the status code based on your requirements
          const statusCode = context.switchToHttp().getResponse().statusCode || HttpStatus.OK;
  
          return new ResponseDto({
            statusCode,
            message: 'Success',
            data,
          });
          
        }),
      );
    }
  }
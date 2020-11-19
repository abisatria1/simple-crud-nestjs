import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface WebResponse<T> {
  data: T;
  message: string;
  statusCode: number;
}

@Injectable()
export class WrapperResponseInterceptor<T>
  implements NestInterceptor<T, WebResponse<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<WebResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          data: data ? data : null,
          message: data.message ? data.message : 'Berhasil',
          statusCode: context.switchToHttp().getResponse().statusCode,
        };
      }),
    );
  }
}

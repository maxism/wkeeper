import { ExecutionContext, NestInterceptor, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RedirectInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, stream$: Observable<any>): Observable<any> {
    const response = context.switchToHttp().getResponse();
    response.redirect('/');
    return stream$;
  }
}

// auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptorFn: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('jwt');
  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq);
};

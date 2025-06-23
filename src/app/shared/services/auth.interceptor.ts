import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptorFn: HttpInterceptorFn = (req, next) => {
  const isApiRequest = req.url.startsWith('https://api.seudominio.com'); // ou '/api' se usar proxy

  if (!isApiRequest) {
    // 👇 não modifica, só repassa
    return next(req);
  }

  const token = 'Bearer PT123abc...'; // seu token fixo

  const authReq = req.clone({
    setHeaders: {
      Authorization: token
    }
  });

  console.log('[INTERCEPTOR] Adicionado token à requisição:', req.url);
  return next(authReq);
};

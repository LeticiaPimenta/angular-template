import { HttpInterceptorFn } from '@angular/common/http';

const API_BASE_URL = 'https://api.exemplo.com';

export const authInterceptorFn: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('jwt');

  // Filtra para só alterar chamadas da API (que começam com /api, por exemplo)
  const isApiRequest = req.url.includes('/api/');

  if (!isApiRequest) {
    // Não altera requisições para assets (ex: traduções)
    return next(req);
  }

  // Atualiza a URL (se precisar) e adiciona o token
  const updatedReq = req.clone({
    url: API_BASE_URL + req.url, // concatena base URL
    setHeaders: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  });

  return next(updatedReq);
};

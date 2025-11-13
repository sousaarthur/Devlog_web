import { HttpInterceptorFn } from '@angular/common/http';

export const i18nInteceptor: HttpInterceptorFn = (req, next) => {
  const language = localStorage.getItem('lang');
  const newReq = req.clone({
    setHeaders: {
      'Accept-Language': `${language}`
    }
  })
  return next(newReq);
};

import { HttpInterceptorFn } from '@angular/common/http';

export const i18nInteceptor: HttpInterceptorFn = (req, next) => {
  const language = localStorage.getItem('lang');
  const newReq = req.clone({
    setHeaders: {
      'Accept-Language': `${language}`
    }
  })
  console.log(language)
  return next(newReq);
};

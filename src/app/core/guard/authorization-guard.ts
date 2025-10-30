import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '../service/auth';

export const authorizationGuard: CanActivateFn = (route, state) => {
  const service = inject(Auth);
  const router = inject(Router);

  if(service.isLoggedIn()) {
    return true;
  } else {
     return router.parseUrl('/admin/login');
  }
};

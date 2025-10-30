import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Panel } from './features/admin/panel/panel';
import { authorizationGuard } from './core/guard/authorization-guard';

export const routes: Routes = [
  {
    path: "admin/login",
    component: Login
  },
  {
    path: "admin/panel",
    component: Panel,
    canActivate: [authorizationGuard],
  },
  {
    path: "**",
    redirectTo: ''
  }
];

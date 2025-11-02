import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Panel } from './features/admin/layout/panel';
import { authorizationGuard } from './core/guard/authorization-guard';
import { Settings } from './features/admin/pages/settings/settings';

export const routes: Routes = [
  {
    path: "admin/login",
    component: Login
  },
  {
    path: 'admin',
    component: Panel,
    canActivate: [authorizationGuard],
    children: [
      {
        path: 'settings',
        component: Settings
      }
    ]
  },
  {
    path: "**",
    redirectTo: 'admin/login'
  },
  
];

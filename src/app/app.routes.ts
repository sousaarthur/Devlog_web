import { Routes } from '@angular/router';
import { Login } from './domain/auth/login/login';
import { Panel } from './domain/admin/layout/panel';
import { authorizationGuard } from './core/guard/authorization-guard';
import { Settings } from './domain/admin/pages/settings/settings';
import { Users } from './domain/admin/pages/users/users';
import { Articles } from './domain/admin/pages/articles/articles';
import { Dashboard } from './domain/admin/pages/dashboard/dashboard';
import { News } from './domain/admin/pages/news/news';

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
      },
      {
        path: 'users',
        component: Users
      },
      {
        path: 'articles',
        component: Articles
      },
      {
        path: 'dashboard',
        component: Dashboard
      }, 
      {
        path: 'news',
        component: News
      }
    ]
  },
  {
    path: "**",
    redirectTo: 'admin/login'
  },
  
];

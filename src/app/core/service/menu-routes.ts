import { Injectable } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { User } from './user';
import { combineLatest, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuRoutes {
  constructor(
    private translocoService: TranslocoService,
    private userService: User
  ) {}

  private menuConfig: Record<string, any[]> = {
    ADMIN: [
      { key: 'NEWS', icon: 'pi pi-megaphone', router: '/admin/news' },
      { key: 'DASHBOARD', icon: 'pi pi-th-large', router: '/admin/dashboard' },
      { key: 'ARTICLES', icon: 'pi pi-file-edit', router: '/admin/articles' },
      { key: 'USERS', icon: 'pi pi-users', router: '/admin/users' },
      { key: 'SETTINGS', icon: 'pi pi-cog', router: '/admin/settings' },
    ],
    WRITER: [
      { key: 'NEWS', icon: 'pi pi-megaphone', router: '/admin/news' },
      { key: 'ARTICLES', icon: 'pi pi-file-edit', router: '/admin/articles' },
      { key: 'SETTINGS', icon: 'pi pi-cog', router: '/admin/settings' },
    ],
  };

  getMenu() {
    return combineLatest([
      this.userService.get(),
      this.translocoService.selectTranslateObject('LAYOUT.SIDEBAR.ITEMS', { bindLang: true })
    ]).pipe(
      map(([user, items]) => {
        const role = user.role;
        const userMenu = this.menuConfig[role] || [];
        return userMenu.map(m => ({
          name: items[m.key],
          icon: m.icon,
          router: m.router
        }));
      })
    );
  }
}

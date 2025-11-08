import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Logo } from "../../../../shared/components/logo/logo";
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { Avatar } from "../../../../shared/components/avatar/avatar";
import { DrawerModule } from 'primeng/drawer';
import { User } from '../../../../core/service/user';
import { UserInterface } from '../../../../core/interface/userInterface';
import { UserInfo } from '../user-info/user-info';
import { Logout } from '../logout/logout';
import { MenuRoutes } from '../../../../core/service/menu-routes';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-drawer-menu',
  imports: [Logo, ButtonModule, CommonModule, DividerModule, Avatar, DrawerModule, UserInfo, Logout, RouterModule],
  standalone: true,
  templateUrl: './drawer-menu.html',
  styleUrl: './drawer-menu.css',
})
export class DrawerMenu implements OnInit {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  menu: any[] = []
  user: UserInterface = {};

  isMobile = window.innerWidth < 1023;

  @HostListener('window:resize')
  onResize() {
    this.isMobile = window.innerWidth < 1023;
  }

  constructor(
    private service: User,
    private menuRouter: MenuRoutes
  ) { }

  ngOnInit(): void {
    this.loadMenu();
  }

  toggleDrawer() {
    this.visible = !this.visible;
    this.visibleChange.emit(this.visible);
  }

  loadMenu() {
    this.menuRouter.getMenu().subscribe(menu => {
      this.menu = menu;
    });
  }
}

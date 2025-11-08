import { Component, OnInit } from '@angular/core';
import { Logo } from "../../../../shared/components/logo/logo";
import { DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { Avatar } from '../../../../shared/components/avatar/avatar';
import { UserInfo } from "../user-info/user-info";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RouterModule } from '@angular/router';
import { Logout } from "../logout/logout";
import { MenuRoutes } from '../../../../core/service/menu-routes';

@Component({
  selector: 'app-sidebar',
  imports: [Logo, DividerModule, CommonModule, ButtonModule, AvatarModule, AvatarGroupModule, Avatar, UserInfo, ConfirmDialogModule, Logout, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar implements OnInit {
  menu: any[] = []
  constructor(
    private menuRoutes: MenuRoutes
  ) { }

  ngOnInit(): void {
    this.loadMenu();
  }

  private loadMenu() {
    this.menuRoutes.getMenu().subscribe(menu => {
      this.menu = menu;
    })
  }
}
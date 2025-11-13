import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { DrawerModule } from 'primeng/drawer';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import { Avatar } from "../../../../shared/components/avatar/avatar";
import { DrawerMenu } from "../drawer-menu/drawer-menu";
import { TooltipModule, Tooltip } from 'primeng/tooltip';

@Component({
  selector: 'app-navbar',
  imports: [AvatarGroupModule, AvatarModule, ButtonModule, DividerModule, DrawerModule, IconFieldModule, InputIconModule, InputTextModule, CommonModule, MenuModule, DrawerMenu, Tooltip],
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  visible: boolean = false;

  toggleDrawer() {
    this.visible = !this.visible;
  }

  menu = [
    {
      name: "Dashboard",
      icon: "pi pi-th-large",
      router: ""
    },
    {
      name: "Artigos",
      icon: "pi pi-file-edit",
      router: ""
    },
    {
      name: "Usuários",
      icon: "pi pi-users",
      router: ""
    },
    {
      name: "Categorias",
      icon: "pi pi-tag",
      router: ""
    },
    {
      name: "Configurações",
      icon: "pi pi-cog",
      router: ""
    }
  ]
}

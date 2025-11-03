import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Logo } from "../../../../shared/components/logo/logo";
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { Avatar } from "../../../../shared/components/avatar/avatar";
import { DrawerModule } from 'primeng/drawer';
import { User } from '../../../../core/service/user';
import { UserInterface } from '../../../../core/interface/userInterface';
import { UserInfo } from '../user-info/user-info';
import { Login } from "../../../auth/login/login";
import { Logout } from '../logout/logout';

@Component({
  selector: 'app-drawer-menu',
  imports: [Logo, ButtonModule, CommonModule, DividerModule, Avatar, DrawerModule, UserInfo, Logout],
  standalone: true,
  templateUrl: './drawer-menu.html',
  styleUrl: './drawer-menu.css',
})
export class DrawerMenu implements OnInit {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  user: UserInterface = {};

  constructor(private service:User){}

  ngOnInit(): void {
      this.service.get().subscribe({
        next: (data) => {
          this.user = {
            name: data.name,
            email: data.email
          }
        }
      })
  }

  toggleDrawer() {
    this.visible = !this.visible;
    this.visibleChange.emit(this.visible);
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

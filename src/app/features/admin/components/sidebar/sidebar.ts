import { Component } from '@angular/core';
import { Logo } from "../../../../shared/components/logo/logo";
import { DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { Avatar } from '../../../../shared/components/avatar/avatar';
import { UserInfo } from "../user-info/user-info";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Logout } from "../logout/logout";
import { Login } from "../../../auth/login/login";

@Component({
  selector: 'app-sidebar',
  imports: [Logo, DividerModule, CommonModule, ButtonModule, AvatarModule, AvatarGroupModule, Avatar, UserInfo, ConfirmDialogModule, Logout, Login],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) { }
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

  logout(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Você tem certeza que deseja sair?',
      header: 'Sair da conta',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancelar',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Sair',
        severity: 'danger',
      },

      accept: () => {
        this.messageService.add({ severity: 'warn', summary: 'Aviso', detail: 'Você saiu da sua conta' });
        localStorage.removeItem('token');
        this.router.navigate(['/admin/login']);
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejeitado', detail: 'Você rejeitou a ação' });
      },
    });
  }

}
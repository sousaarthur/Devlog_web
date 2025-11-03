import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-logout',
  imports: [ButtonModule, ConfirmDialogModule],
  standalone: true,
  templateUrl: './logout.html',
  styleUrl: './logout.css',
})
export class Logout {
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) { }

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

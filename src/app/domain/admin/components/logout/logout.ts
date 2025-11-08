import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
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
    private router: Router,
    private transloco: TranslocoService
  ) { }

  logout(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: this.transloco.translate('DIALOGS.CONFIRM_LOGOUT.MESSAGE'),
      header: this.transloco.translate('DIALOGS.CONFIRM_LOGOUT.TITLE'),
      icon: 'pi pi-info-circle',
      rejectLabel: this.transloco.translate('GENERIC.BUTTONS.CANCEL'),
      rejectButtonProps: {
        label: this.transloco.translate('GENERIC.BUTTONS.CANCEL'),
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: this.transloco.translate('DIALOGS.CONFIRM_LOGOUT.CONFIRM_BUTTON'),
        severity: 'danger',
      },

      accept: () => {
        this.messageService.add({ severity: 'warn', summary: 'Aviso', detail: 'Você saiu da sua conta' });
        localStorage.removeItem('token');
        this.router.navigate(['/admin/login']);
      }
    });
  }
}

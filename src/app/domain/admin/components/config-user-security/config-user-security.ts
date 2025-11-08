import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { User } from '../../../../core/service/user';
import { ChangePassInterface } from '../../../../core/interface/changePassInterface';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
@Component({
  selector: 'app-config-user-security',
  imports: [
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    ToastModule,
    InputTextModule,
    TextareaModule,
    FormsModule,
    ReactiveFormsModule,
    TranslocoModule
  ],
  templateUrl: './config-user-security.html',
  styleUrl: './config-user-security.css',
})
export class ConfigUserSecurity {
  changePass!: ChangePassInterface;
  changePasswordForm = new FormGroup({
    currentPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  constructor(
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private userService: User,
    private transloco: TranslocoService
  ) { }

  onSubmit() {
    const pass = this.changePasswordForm.value;
    if (pass.newPassword !== pass.confirmPassword) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'As senhas devem ser iguais!' });
      return;
    }
    this.changePass = {
      currentPassword: pass.currentPassword ?? undefined,
      newPassword: pass.newPassword ?? undefined
    }
    this.userService.changePassword(this.changePass).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Senha alterado com sucesso!' });
      }, 
      error: (err) => {
        console.error(err);
      }
    })
  }

  deactivateUser(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: this.transloco.translate('DIALOGS.DISABLE_ACCOUNT.MESSAGE'),
      header: this.transloco.translate('DIALOGS.DISABLE_ACCOUNT.TITLE'),
      icon: 'pi pi-info-circle',
      rejectLabel: this.transloco.translate('GENERIC.BUTTONS.CANCEL'),
      rejectButtonProps: {
        label: this.transloco.translate('GENERIC.BUTTONS.CANCEL'),
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: this.transloco.translate('DIALOGS.DISABLE_ACCOUNT.CONFIRM_BUTTON'),
        severity: 'danger',
      },
      accept: () => {
        this.disable();
      },
    });
  }

  disable() {
    this.userService.delete().subscribe({
      next: () => {
        this.router.navigate(['/admin/login']);
        localStorage.removeItem('token');
        this.messageService.add({ severity: 'warn', summary: 'Aviso', detail: 'Sua conta foi desativada' });
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}

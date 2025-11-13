import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { EditorModule } from 'primeng/editor';
import { UserInterface } from '../../../../core/interface/userInterface';
import { SelectModule } from 'primeng/select';
import { Admin } from '../../../../core/service/admin';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { TranslocoModule } from '@jsverse/transloco';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-users',
  imports: [ButtonModule, CardModule, IconFieldModule, InputIconModule, InputTextModule, TableModule, CommonModule, FileUploadModule, EditorModule, ButtonModule, SelectModule, TagModule, AvatarGroupModule, AvatarModule, TranslocoModule, TooltipModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  totalRecords: number = 0;
  loading: boolean = false;
  users!: UserInterface[];
  constructor(private adminService: Admin, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.listUsers({ first: 0, rows: 10 });
  }

  onDisable(id: number) {
    this.confirmationService.confirm({
      message: 'Você deseja desativar este usuário?',
      header: 'Zona de Perigo',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancelar',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Desativar',
        severity: 'danger',
      },

      accept: () => {
        this.disableOrActive(id);
        this.listUsers({ first: 0, rows: 10 });
      }
    });
  }

  onActive(id: number) {
    this.confirmationService.confirm({
      message: 'Você deseja ativar este usuário?',
      header: 'Ativar Usuário',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancelar',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Ativar',
        severity: 'primary',
      },

      accept: () => {
        this.disableOrActive(id);
      }
    });
  }

  disableOrActive(id: number) {
    this.adminService.disableOrActive({ id: id }).subscribe({
      next: () => this.listUsers({ first: 0, rows: 10 }),
      error: (err) => this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message })
    })
  }

  listUsers(event: LazyLoadEvent) {
    this.loading = true;

    const page = event.first! / event.rows!;
    const size = event.rows!;
    this.adminService.getAllUsers(page, size).subscribe({
      next: (data) => {
        this.users = data.content;
        this.totalRecords = data.totalElements;
        this.loading = false;
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message })
        this.loading = false;
      }
    })
  }
}

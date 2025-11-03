import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { Select } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../../core/service/theme';

interface language {
  name: string;
  code: string;
}
@Component({
  selector: 'app-config-user-theme',
  imports: [
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    ToastModule,
    InputTextModule,
    TextareaModule,
    FormsModule,
    ReactiveFormsModule,
    Select,
    CommonModule
  ],
  templateUrl: './config-user-theme.html',
  styleUrl: './config-user-theme.css',
})
export class ConfigUserTheme implements OnInit {
  languages: language[] | undefined;
  selectedLanguage: language | undefined;
  filter = localStorage.getItem('theme');

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.languages = [
      { name: 'Portugues', code: 'pt' },
      { name: 'Ingles', code: 'ing' },
      { name: 'Espanhol', code: 'esp' },
    ];
  }

  switchTheme(theme: 'light' | 'dark' | 'system') {
    this.themeService.switchTheme(theme);
    this.filter = theme;
  }
}


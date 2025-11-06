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
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { Language } from '../../../../core/service/language';

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
    CommonModule,
    TranslocoModule
  ],
  templateUrl: './config-user-theme.html',
  styleUrl: './config-user-theme.css',
})
export class ConfigUserTheme implements OnInit {
  languages: language[] | undefined;
  selectedLanguage: language | undefined;
  filter = localStorage.getItem('theme');

  constructor(private themeService: ThemeService, private langService: Language, private transloco: TranslocoService) { }

  ngOnInit() {
    this.languages = [
      { name: this.transloco.translate('ADMIN.PAGES.SETTINGS.SECTIONS.APPEARANCE.LANGUAGE.OPTIONS.PORTUGUESE'), code: 'pt-BR' },
      { name: this.transloco.translate('ADMIN.PAGES.SETTINGS.SECTIONS.APPEARANCE.LANGUAGE.OPTIONS.ENGLISH'), code: 'en' },
      { name: this.transloco.translate('ADMIN.PAGES.SETTINGS.SECTIONS.APPEARANCE.LANGUAGE.OPTIONS.SPANISH'), code: 'es' },
    ];
    this.selectedLanguage = this.languages?.find(l => l.code === this.langService.getCode());
    this.langService.getLanguage();
  }

  switchTheme(theme: 'light' | 'dark' | 'system') {
    this.themeService.switchTheme(theme);
    this.filter = theme;
  }

  changeLang() {
    const lang = this.selectedLanguage?.code || 'pt-BR';
    this.langService.saveLang(lang);
  }
}


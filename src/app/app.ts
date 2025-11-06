import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Toast } from 'primeng/toast';
import { ConfirmDialog } from "primeng/confirmdialog";
import { ThemeService } from './core/service/theme';
import { Language } from './core/service/language';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, Toast, ConfirmDialog],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('blog_web');

  constructor(private themeService: ThemeService, private langService: Language) { }

  ngOnInit(): void {
    this.themeService.initTheme();
    this.langService.getLanguage();
  }
}

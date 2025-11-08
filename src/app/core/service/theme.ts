import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

type Theme = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private themeKey = 'theme';
  private darkClass = 'my-app-dark';

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  initTheme(): void {
    const savedTheme = (localStorage.getItem(this.themeKey) as Theme) || 'system';
    this.applyTheme(savedTheme);


    if(savedTheme === 'system') {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        this.applyTheme('system');
      });
    }
  }

  switchTheme(theme: Theme): void {
    localStorage.setItem(this.themeKey, theme);
    this.applyTheme(theme);
  }

  private applyTheme(theme: Theme): void {
    const html = document.querySelector('html');
    if(!html) return;
    this.renderer.removeClass(html, this.darkClass);
    if(theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      this.renderer.addClass(html, this.darkClass);
    }
  }

  getTheme(): Theme {
    return (localStorage.getItem(this.themeKey) as Theme) || 'system';
  }
}

import { Injectable } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

type language = 'pt-BR' | 'en' | 'es'
@Injectable({
  providedIn: 'root'
})
export class Language {

  constructor(private translocoService: TranslocoService) { }

  saveLang(lang: string) {
    this.translocoService.setActiveLang(lang);
    localStorage.setItem('lang', lang);
  }

  getLanguage(){
    const savedLang = localStorage.getItem('lang') || 'pt-BR';
    this.translocoService.setActiveLang(savedLang);
  }

  getCode():string{
    return localStorage.getItem('lang') || 'pt-BR';
  }
}

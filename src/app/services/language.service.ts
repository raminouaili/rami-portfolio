import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly defaultLang = 'fr';
  private readonly storageKey = 'app_language';
  private readonly supportedLangs = ['fr', 'en', 'ar'];

  constructor(
    private translate: TranslateService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.translate.addLangs(this.supportedLangs);
    this.translate.setDefaultLang(this.defaultLang);
    const saved = this.getStoredLanguage();
    this.use(saved ?? this.defaultLang);
  }

  get currentLang(): string {
    return this.translate.currentLang || this.defaultLang;
  }

  use(lang: string): void {
    const target = this.supportedLangs.includes(lang) ? lang : this.defaultLang;
    this.translate.use(target);
    localStorage.setItem(this.storageKey, target);
    this.setDirection(target);
  }

  private getStoredLanguage(): string | null {
    const saved = localStorage.getItem(this.storageKey);
    if (saved && this.supportedLangs.includes(saved)) {
      return saved;
    }
    return null;
  }

  private setDirection(lang: string): void {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    this.document.documentElement.lang = lang;
    this.document.documentElement.dir = dir;
  }
}

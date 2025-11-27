import { Component, AfterViewInit, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  languages = [
    { code: 'fr', label: 'Français (FR)' },
    { code: 'en', label: 'English (EN)' },
    { code: 'ar', label: 'العربية (AR)' }
  ];
  currentLang = 'fr';
  isMenuOpen = false;

  constructor(
    private languageService: LanguageService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang || 'fr';
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  onLanguageChange(lang: string): void {
    this.languageService.use(lang);
    this.currentLang = lang;
    this.closeMenu();
  }
}

import { Component, AfterViewInit, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements AfterViewInit, OnInit {
  languages = [
    { code: 'fr', label: 'Français (FR)' },
    { code: 'en', label: 'English (EN)' },
    { code: 'ar', label: 'العربية (AR)' }
  ];
  currentLang = 'fr';

  constructor(
    private languageService: LanguageService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang || 'fr';
  }

  ngAfterViewInit(): void {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });
      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.add('hidden');
        });
      });
    }
  }

  onLanguageChange(lang: string): void {
    this.languageService.use(lang);
    this.currentLang = lang;
  }
}

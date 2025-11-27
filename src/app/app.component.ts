import { Component, AfterViewInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });

      // Close mobile menu when clicking a link
      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.add('hidden');
        });
      });
    }

    // Intersection Observer for fade-in elements
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el);
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const current = e.currentTarget as HTMLAnchorElement;
        const href = current.getAttribute('href');
        if (!href) return;
        const target = document.querySelector(href);
        if (target) {
          (target as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // Active navigation highlight
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionEl = section as HTMLElement;
        const sectionTop = sectionEl.offsetTop;
        const sectionHeight = sectionEl.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute('id') || '';
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('text-white');
        link.classList.add('text-gray-300');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.remove('text-gray-300');
          link.classList.add('text-white');
        }
      });
    });
  }
}

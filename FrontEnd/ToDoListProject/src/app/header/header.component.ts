import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router'; // Importuj Router
import { CommonModule } from '@angular/common';
import { Panel } from 'primeng/panel';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    Panel
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isFirstLoad = true;
  isRegisterPage = false; // Nová premenná pre kontrolu stránky

  constructor(private router: Router) {}

  ngOnInit() {
    // Zistíme, či sme na stránke "register"
    this.isRegisterPage = this.router.url.includes('/register');

    // Ak nie sme na stránke "register", animujeme logo
    if (!this.isRegisterPage && !sessionStorage.getItem('hasAnimated')) {
      this.isFirstLoad = true; // Animácia sa spustí
      setTimeout(() => {
        this.isFirstLoad = false;
        sessionStorage.setItem('hasAnimated', 'true'); // Uložíme informáciu, že animácia prebehla
      }, 3000);
    } else {
      this.isFirstLoad = false; // Na stránke "register" animácia nebude
    }

    // Resetovanie animácie pri zmene cesty
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isRegisterPage = this.router.url.includes('/register'); // Skontrolujeme, či sme na stránke "register"
        if (!this.isRegisterPage) {
          this.isFirstLoad = true; // Resetujeme animáciu, ak nie sme na "register" stránke
          setTimeout(() => {
            this.isFirstLoad = false;
          }, 3000);
        }
      }
    });
  }
}

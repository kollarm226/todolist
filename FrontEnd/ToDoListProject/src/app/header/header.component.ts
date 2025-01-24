import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
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
  isRegisterPage = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.isRegisterPage = this.router.url.includes('/register');


    if (!this.isRegisterPage && !sessionStorage.getItem('hasAnimated')) {
      this.isFirstLoad = true;
      setTimeout(() => {
        this.isFirstLoad = false;
        sessionStorage.setItem('hasAnimated', 'true');
      }, 3000);
    } else {
      this.isFirstLoad = false;
    }


    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isRegisterPage = this.router.url.includes('/register');
        if (!this.isRegisterPage) {
          this.isFirstLoad = true;
          setTimeout(() => {
            this.isFirstLoad = false;
          }, 3000);
        }
      }
    });
  }
}

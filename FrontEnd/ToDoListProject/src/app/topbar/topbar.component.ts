import {Component, ViewChild} from '@angular/core';
import {Panel} from 'primeng/panel';
import {Popover} from 'primeng/popover';
import {Button} from 'primeng/button';
import {CommonModule, NgForOf} from '@angular/common';
import {Dialog} from 'primeng/dialog';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    Panel,
    Button,
    NgForOf,
    Dialog,
    CommonModule,

  ],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})


export class TopbarComponent {

  menuItems = [
    {label: 'My account', action: 'My account'},
    {label: 'Display settings', action: 'Display settings'},
    {label: 'Preferences', action: 'Preferences'},
    {label: 'Notifications', action: 'Notifications'},
    {label: 'Help', action: 'Help'},
    {label: 'Terms of use', action: 'Terms of use'},
    {label: 'Privacy policy', action: 'Privacy policy'},
    {label: 'Logout', action: 'Logout'},
  ];

  @ViewChild('op') op!: Popover;

  constructor(private authService: AuthService, private router: Router) {
  }

  dialogVisible: boolean = false;
  selectedOption: string = '';

  toggle(event: any) {
    this.dialogVisible = true;
  }

  selectOption(menuItem: any) {
    this.selectedOption = menuItem.action;
    this.dialogVisible = true;

    if (menuItem.action === 'Logout') {
      this.logout();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirect to the login page }
  }
}

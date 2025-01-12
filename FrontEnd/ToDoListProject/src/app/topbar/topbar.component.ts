import { Component, ViewChild } from '@angular/core';
import { Panel } from 'primeng/panel';
import { Avatar } from 'primeng/avatar';
import { Popover } from 'primeng/popover';
import { Button } from 'primeng/button';
import { NgForOf, CommonModule } from '@angular/common'; // Import CommonModule
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Dialog } from 'primeng/dialog';
import {TasksComponent} from '../tasks/tasks.component';
import {ListsComponent} from '../lists/lists.component';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    Panel,
    Avatar,
    Popover,
    Button,
    NgForOf,
    IconField,
    InputIcon,
    InputText,
    Dialog,
    CommonModule,
    TasksComponent,
    ListsComponent,
    // Add CommonModule here
  ],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {
  @ViewChild('op') op!: Popover;
  menuItems = [
    { label: 'My account', action: 'My account' },
    { label: 'Display settings', action: 'Display settings' },
    { label: 'Preferences', action: 'Preferences' },
    { label: 'Notifications', action: 'Notifications' },
    { label: 'Help', action: 'Help' },
    { label: 'Terms of use', action: 'Terms of use' },
    { label: 'Privacy policy', action: 'Privacy policy' },
    { label: 'Cookies policy', action: 'Cookies policy' }
  ];

  dialogVisible: boolean = false;
  selectedOption: string = '';

  toggle(event: any) {
    this.dialogVisible = true;
  }

  selectOption(menuItem: any) {
    this.selectedOption = menuItem.action;
    this.dialogVisible = true;
  }
}

import { Component } from '@angular/core';
import {Panel} from 'primeng/panel';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    Panel
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}

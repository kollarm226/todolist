import { Component } from '@angular/core';
import {TopbarComponent} from '../topbar/topbar.component';
import {ListsComponent} from '../lists/lists.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TopbarComponent,
    ListsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

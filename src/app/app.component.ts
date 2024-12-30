import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RegisterComponent } from './register/register.component';
import {HeaderComponent} from './header/header.component';
import {LoginComponent} from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterOutlet, ButtonModule, RegisterComponent, HeaderComponent, LoginComponent]
})
export class AppComponent {
  title = 'ToDoListProject';
}

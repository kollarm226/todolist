import { Component, importProvidersFrom } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { provideRouter } from '@angular/router';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { TopbarComponent } from './topbar/topbar.component';
import { ListsComponent } from './lists/lists.component';
import { TasksComponent } from './tasks/tasks.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    RouterOutlet,
    ButtonModule,
    RegisterComponent,
    HeaderComponent,
    LoginComponent,
    TopbarComponent,
    ListsComponent,
    TasksComponent,
    RouterModule
  ]
})
export class AppComponent {
  title = 'ToDoListProject';
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(BrowserModule, RouterModule.forRoot(routes))
  ]
}).catch(err => console.error(err));

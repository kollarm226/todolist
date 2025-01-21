import {Component} from '@angular/core';
import {RouterOutlet, RouterModule} from '@angular/router';
import {bootstrapApplication} from '@angular/platform-browser';
import {ButtonModule} from 'primeng/button';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MessageService} from 'primeng/api';
import {appConfig} from './app/app.config';

@Component({
  selector: 'app-root',
  templateUrl: './app/app.component.html',
  styleUrls: ['./app/app.component.css'],
  standalone: true,
  imports: [
    RouterOutlet,
    ButtonModule,
    RouterModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [MessageService]
})
export class AppComponent {
  title = 'ToDoListProject';
}

bootstrapApplication(AppComponent, {
  providers: [...appConfig.providers]
}).catch(err => console.error(err));

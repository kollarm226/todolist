import {Component} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {PasswordModule} from 'primeng/password';
import {CheckboxModule} from 'primeng/checkbox';
import {MessagesModule} from 'primeng/messages';
import {MessageService} from 'primeng/api';
import {IftaLabel} from 'primeng/iftalabel';
import {Card} from 'primeng/card';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {Dialog} from 'primeng/dialog';
import {HeaderComponent} from '../header/header.component';
import {AuthService} from '../auth.service';
import {CommonModule} from '@angular/common';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    CheckboxModule,
    MessagesModule,
    IftaLabel,
    Card,
    IconField,
    InputIcon,
    Dialog,
    HeaderComponent,
    CommonModule
     ],
  providers: [MessageService],

})
export class RegisterComponent {
  formGroup!: FormGroup;
  value: any;
  termsVisible: boolean = false;

  constructor(private fb: FormBuilder, private messageService: MessageService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
      checkbox: [false, Validators.requiredTrue]
    });
  }

  register(): void {
    if (this.formGroup.valid) {
      this.authService.register({
        name: this.formGroup.get('username'),
        surname: this.formGroup.get('username'),
        email: this.formGroup.get('email')?.value,
        password: this.formGroup.get('password')?.value
      }).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Registration Successful',
            detail: 'You have been registered!'
          });
        }, error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Registration Failed',
            detail: 'An error occurred while registering.'
          });
        }
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Form Incomplete',
        detail: 'Please complete all required fields.'
      });
    }
  }

  showTerms() {
    this.termsVisible = true;
  }


}

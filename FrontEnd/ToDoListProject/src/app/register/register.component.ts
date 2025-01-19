import {Component, OnInit} from '@angular/core';
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
import {Toast} from 'primeng/toast';
import {Router} from '@angular/router';

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
    CommonModule,
    Toast
  ],

})
export class RegisterComponent implements OnInit {
  formGroup!: FormGroup;
  value: any;
  termsVisible: boolean = false;

  constructor(private fb: FormBuilder, private messageService: MessageService, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
      checkbox: [false, Validators.requiredTrue]
    });
  }

  register(): void {
    if (this.formGroup.valid) {
      const registrationData = {
        name: this.formGroup.get('name')?.value,
        surname: this.formGroup.get('surname')?.value,
        email: this.formGroup.get('email')?.value,
        password: this.formGroup.get('password')?.value
      };

      this.authService.register(registrationData).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Registration Successful',
            detail: 'You have been registered!'
          });
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3500);
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Registration Failed',
            detail: 'An error occurred while registering.'
          });
        }
      });
    }
  }


  showTerms() {
    this.termsVisible = true;
  }


}

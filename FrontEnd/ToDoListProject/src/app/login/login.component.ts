import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { HeaderComponent } from '../header/header.component';
import { IftaLabel } from 'primeng/iftalabel';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner'; // Import ProgressSpinnerModule
import { SkeletonModule } from 'primeng/skeleton'; // Import SkeletonModule

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CardModule,
    PanelModule,
    IftaLabel,
    IconField,
    InputIcon,
    HeaderComponent,
    Toast,
    ProgressSpinnerModule,
    SkeletonModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login(): void {
    if (this.formGroup.valid && !this.loading) { // Check if not loading
      this.loading = true;
      const loginData = {
        email: this.formGroup.get('email')?.value,
        password: this.formGroup.get('password')?.value
      };
      this.authService.login(loginData).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Login Successful',
            detail: 'You have been logged in!',
          });
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 1500);
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Login Failed',
            detail: err || 'Invalid credentials.',
          });
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }

  forgotPassword() {
  }

  signUp() {
    this.router.navigate(['/register']);
  }
}

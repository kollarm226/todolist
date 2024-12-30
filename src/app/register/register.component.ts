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


interface City {
  name: string;
  code: string;
}

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

  ],
  providers: [MessageService]
})
export class RegisterComponent {
  formGroup!: FormGroup;
  value: any;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]

    });
  }

  register(): void {
    if (this.formGroup.valid) {
      console.log(this.formGroup.value);
    }
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
}  from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

interface RegisterForm {
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  confirmationPassword: FormControl<string | null>;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private service: UserService, private router: Router) {}

  ngOnInit() {
    this.registerForm = new FormGroup<RegisterForm>({
      name: new FormControl<string | null>(null, [Validators.required]),
      email: new FormControl<string | null>(null, [Validators.required]),
      password: new FormControl<string | null>(null, [Validators.required]),
      confirmationPassword: new FormControl<string | null>(null, [Validators.required,]),
    });
  }

  submit() {
    if (this.registerForm.invalid) {
      alert('Preencha todos os campos corretamente!')
      return;
    }

    const data = this.getUserData();
    this.service.register(data).subscribe({
      next: (response: any) => {
        const role = response.role;
        const token = response.token;
        console.log(role)
        console.log(token)

        // Armazenar no localStorage
        localStorage.setItem('role', JSON.stringify(role));
        localStorage.setItem('token', token);
        this.router.navigate(['/home']);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 400) {
          alert('Usuário ja cadastrado com esse e-mail');
        } else {
          console.error('Error posting event', error);
        }
      }
    });
  }

  getUserData() {
    return {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      role: 'USER',
    };
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface LoginForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private service: UserService, private router: Router) {}

  ngOnInit() {
    this.loginForm = new FormGroup<LoginForm>({
      email: new FormControl<string | null>(null, [Validators.required]),
      password: new FormControl<string | null>(null, [Validators.required]),
    });
  }

  submit() {
    if (this.loginForm.invalid) {
      alert('Preencha todos os campos corretamente!')
      return;
    }

    const data = this.getUserData();
    this.service.login(data).subscribe({
      next: (response: any) => {
        const role = response.role;
        const token = response.token;

        localStorage.setItem('email', data.email);
        localStorage.setItem('role', role);
        localStorage.setItem('token', token);
        this.router.navigate(['/home']);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 400) {
          alert('Usuário não encontrado');
        } else {
          console.error('Error posting event', error);
        }
      }
    });
  }

  getUserData() {
    return {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
  }
}

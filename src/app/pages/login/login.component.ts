import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface LoginForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private router: Router) {}

  ngOnInit() {
    this.loginForm = new FormGroup<LoginForm>({
      email: new FormControl<string | null>(null, [Validators.required]),
      password: new FormControl<string | null>(null, [Validators.required]),
    });
  }

  submit() {
    console.log(this.loginForm);
    this.router.navigate(['/home']);
  }
}

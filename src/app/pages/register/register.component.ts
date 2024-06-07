import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface RegisterForm {
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  confirmationPassword: FormControl<string | null>;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private router: Router) {}

  ngOnInit() {
    this.registerForm = new FormGroup<RegisterForm>({
      name: new FormControl<string | null>(null, [Validators.required]),
      email: new FormControl<string | null>(null, [Validators.required]),
      password: new FormControl<string | null>(null, [Validators.required]),
      confirmationPassword: new FormControl<string | null>(null, [Validators.required,]),
    });
  }

  submit() {
    console.log(this.registerForm);
    this.router.navigate(['/home']);
  }
}

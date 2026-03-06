import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  standalone: true
})
export class Login implements OnInit {
  loginForm!: FormGroup;
  loginSuccess = false;
  loginError = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      if (this.authService.login(username, password)) {
        this.loginSuccess = true;
        this.loginError = false;
        console.log('Login exitoso:', this.loginForm.value);

        // Redirigir después del login exitoso
        setTimeout(() => {
          this.router.navigate(['/protected']);
        }, 1500);
      } else {
        this.loginError = true;
        this.loginSuccess = false;
      }
    }
  }

  logout(): void {
    this.authService.logout();
    this.loginSuccess = false;
    this.loginError = false;
    this.loginForm.reset();
  }
}

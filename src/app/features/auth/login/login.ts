import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  imports: [CardModule, InputTextModule, ButtonModule, CheckboxModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      login: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      password: ['', [Validators.required]],
      rememberMe: [false] // Checkbox
    });
  }


  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const formData = this.loginForm.value;
    console.log('Form Data:', formData);

    // Exemplo de envio para API
    // this.authService.login(formData).subscribe(...);
  }
}

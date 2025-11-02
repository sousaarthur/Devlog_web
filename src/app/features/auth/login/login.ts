import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { LoginInterface } from './login-interface';
import { Auth } from '../../../core/service/auth';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-login',
  imports: [CardModule, InputTextModule, ButtonModule, CheckboxModule, FormsModule, ReactiveFormsModule, CommonModule, InputIcon, IconField],
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private service: Auth, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
    const saved = localStorage.getItem('rememberMe');
    let savedData = null;
    if (saved) {
      try {
        savedData = JSON.parse(saved);
      } catch { }
    }

    this.loginForm = this.fb.group({
      login: [savedData?.login || '', [Validators.required, Validators.email]],
      password: [savedData?.password || '', [Validators.required]],
      rememberMe: [savedData ? true : false]
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
    if (formData.rememberMe) {
      const jsonData = JSON.stringify(formData)
      localStorage.setItem("rememberMe", jsonData)
    }

    const login: LoginInterface = {
      login: formData.login,
      password: formData.password
    }

    this.service.login(login).subscribe({
      next: (res) => {
        console.log('Usuário logado com sucesso:', res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['admin/settings']);
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Usuário logado com sucesso!' });
      },
      error: (err) => {
        console.error('Erro ao logar usuário:', err);
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Usuário ou senha invalido!' });
      }
    });

  }
}

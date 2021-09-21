import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { LoginRequest, LoginResponse, SessionService } from 'commons-services';
import { SnackBarService } from 'commons-ui';

/**
 * Componente de la pantalla que permite a los usuarios el autenticarse
 * en la aplicación.
 *
 * @author Robert Ene
 */
@Component({
  selector: 'w2m-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public form: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private title: Title,
    private fb: FormBuilder,
    private sessionService: SessionService,
    private router: Router,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.title.setTitle('W2M: Superheroes - Iniciar Sesión');
    this.checkUserSession();
  }

  login(): void {
    if (!this.form.valid) {
      this.snackBarService.showMessage(
        '¡El usuario y la contraseña son obligatorios!'
      );
      return;
    }

    const loginRequest = {
      username: this.form.get('username')?.value,
      password: this.form.get('password')?.value,
    } as LoginRequest;
    this.sessionService
      .login(loginRequest)
      .subscribe((loginResponse: LoginResponse) => {
        this.sessionService.saveUserSession(loginResponse);
        this.router.navigate(['/superheroes/superheroes']);
      });
  }

  private checkUserSession(): void {
    this.sessionService.isAuthenticated().subscribe((isAuth: boolean) => {
      if (!!isAuth) {
        this.router.navigate(['/superheroes/superheroes']);
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { LoginRequest, LoginResponse, SessionService } from 'commons-services';

import { SnackBarService } from 'commons-ui';

/**
 * Componente de la pantalla que permite a los usuarios autenticarse
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
  // prettier-ignore
  form: FormGroup = this.fb.group({
    username: new FormControl('', [
        Validators.required
    ]),
    password: new FormControl('', [
        Validators.required
    ]),
  });

  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private sessionService: SessionService,
    private router: Router,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.title.setTitle('W2M: Superheroes - Iniciar Sesión');
    this.checkQueryParams();
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

  private checkQueryParams(): void {
    this.route.queryParams.subscribe((params: Params) => {
      const expiredSession = params.expiredSession;
      if (expiredSession && expiredSession === 'true') {
        this.snackBarService.showMessage(
          '¡La sesión del usuario ha caducado! ¡Por favor, inicie sesión de nuevo!'
        );
      }
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

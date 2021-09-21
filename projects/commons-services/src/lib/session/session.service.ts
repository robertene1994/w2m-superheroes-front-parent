import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';

import * as decodeJwt from 'jwt-claims';

import { EnvironmentService } from './../services/environment.service';
import { LocalStorageService } from './local-storage.service';

import {
  LoginResponse,
  LoginRequest,
  UserSessionData,
  TokenData,
} from '../model/user-session';

/**
 * Servicio responsable de la gestión de la sesión de los usuarios.
 *
 * @author Robert Ene
 */
@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private readonly PATH = `${this.environmentService.urlBase}/auth/session`;
  private readonly AUTHORIZATION = 'authorization';
  private readonly USERNAME = 'username';
  private readonly USER_EMAIL = 'email';

  constructor(
    private http: HttpClient,
    private environmentService: EnvironmentService,
    private localStorageService: LocalStorageService
  ) {
    console.log('SessionService: ' + this.PATH);
  }

  set(key: string, value: any): void {
    this.localStorageService.set(key, value);
  }

  remove(key: string): any {
    return this.localStorageService.remove(key);
  }

  get(key: string, defaultValue?: any): any {
    return this.localStorageService.get(key, defaultValue);
  }

  get username(): string {
    return this.get(this.USERNAME);
  }

  get email(): string {
    return this.get(this.USER_EMAIL);
  }

  get token(): string {
    return this.get(this.AUTHORIZATION);
  }

  set token(newToken: string) {
    if (newToken == null) {
      this.remove(this.AUTHORIZATION);
    } else {
      this.set(this.AUTHORIZATION, newToken);
    }
  }

  clear(): void {
    this.localStorageService.clear();
  }

  saveUserSession(loginResponse: LoginResponse): void {
    if (!!loginResponse && !!loginResponse.authorization) {
      this.token = loginResponse.authorization;
      const tokenData: TokenData = decodeJwt(this.token);
      const sessionData: UserSessionData = tokenData.session_data;
      this.set(this.USERNAME, sessionData.username);
      this.set(this.USER_EMAIL, sessionData.email);
    } else {
      this.clear();
    }
  }

  isLoggedIn(): boolean {
    return this.username != null;
  }

  isAuthenticated(): Observable<boolean> {
    const token = this.token;
    if (!token) {
      return of(false);
    }
    return this.http.post<any>(`${this.PATH}/validate`, token).pipe(
      catchError((_) => {
        this.token = null;
        return of(false);
      }),
      map((result) => result !== false),
      take(1)
    );
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.PATH}/login`, loginRequest)
      .pipe(take(1));
  }

  logout(): void {
    this.clear();
    this.http.get<void>(`${this.PATH}/logout`).pipe(take(1)).subscribe();
  }
}

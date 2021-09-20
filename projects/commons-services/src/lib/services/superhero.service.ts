import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { EnvironmentService } from './environment.service';

import {
  PaginationService,
  PageData,
  PaginationDataRequest,
} from '../model/pagination';
import { Superhero } from './../model/superhero';

@Injectable({
  providedIn: 'root',
})
export class SuperheroService implements PaginationService<Superhero> {
  private readonly PATH = `${this.environmentService.urlBase}/superheroes/superheroes`;

  constructor(
    private http: HttpClient,
    private environmentService: EnvironmentService
  ) {
    console.log('Superheroes Service: ' + this.PATH);
  }

  getAll(): Observable<Superhero[]> {
    return this.http.get<Superhero[]>(`${this.PATH}/`).pipe(take(1));
  }

  create(superhero: Superhero): Observable<Superhero> {
    return this.http.post<Superhero>(`${this.PATH}/`, superhero).pipe(take(1));
  }
  getById(id: number): Observable<Superhero> {
    return this.http.get<Superhero>(`${this.PATH}/${id}`).pipe(take(1));
  }

  deleteById(id: number): Observable<Superhero> {
    return this.http.delete<Superhero>(`${this.PATH}/${id}`).pipe(take(1));
  }

  update(superhero: Superhero): Observable<Superhero> {
    return this.http
      .put<Superhero>(`${this.PATH}/${superhero.id}`, superhero)
      .pipe(take(1));
  }

  getPage(pagRequest: PaginationDataRequest): Observable<PageData<Superhero>> {
    console.log('Get page:' + `${this.PATH}/page`);
    const params: HttpParams = pagRequest.toHttpParams();
    return this.http
      .get<PageData<Superhero>>(`${this.PATH}/page`, { params })
      .pipe(take(1));
  }
}

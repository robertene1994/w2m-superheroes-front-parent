import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { SessionService } from 'commons-services';

/**
 * Componente principal (raíz) de la aplicación que se encarga del manejo de la barra
 * de navegacion superior y el spinner de carga.
 *
 * @author Robert Ene
 */
@Component({
  selector: 'w2m-root',
  templateUrl: './w2m.component.html',
  styleUrls: ['./w2m.component.scss'],
})
export class W2mComponent implements OnInit {
  constructor(
    private title: Title,
    private router: Router,
    public sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.title.setTitle('W2M: Superheroes');
  }

  logout(): void {
    this.sessionService.logout();
    this.router.navigate(['/auth/login']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { SuperheroService } from 'commons-services';

/**
 * Componente que se encarga de gestionar la lista de superhéroes.
 *
 * @author Robert Ene
 */
@Component({
  selector: 'w2m-superheroes',
  templateUrl: './superheroes.component.html',
  styleUrls: ['./superheroes.component.scss'],
})
export class SuperheroesComponent implements OnInit {
  constructor(
    private title: Title,
    private superheroService: SuperheroService
  ) {}

  ngOnInit(): void {
    this.title.setTitle('W2M: Superheroes - Superheroes');

    this.superheroService
      .getAll()
      .subscribe((superheroes) => console.log(superheroes));
  }
}

import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'w2m-superheroes',
  templateUrl: './superheroes.component.html',
  styleUrls: ['./superheroes.component.scss'],
})
export class SuperheroesComponent implements OnInit {
  constructor(private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('W2M: Superheroes - Superheroes');
  }
}

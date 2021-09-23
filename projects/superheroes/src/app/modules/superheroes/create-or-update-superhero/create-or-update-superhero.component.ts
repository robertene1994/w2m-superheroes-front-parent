import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { SuperheroService, Superhero } from 'commons-services';

import { SnackBarService } from 'commons-ui';

/**
 * Componente que se encarga de gestionar la creación o modificación de superhéroes.
 *
 * @author Robert Ene
 */
@Component({
  selector: 'w2m-create-or-update-superhero',
  templateUrl: './create-or-update-superhero.component.html',
  styleUrls: ['./create-or-update-superhero.component.scss'],
})
export class CreateOrUpdateSuperheroComponent implements OnInit {
  // prettier-ignore
  form: FormGroup = this.fb.group({
    id: new FormControl(''),
    firstName: new FormControl('', [
        Validators.required
    ]),
    lastName: new FormControl('', [
        Validators.required
    ]),
    alias: new FormControl('', [
        Validators.required
    ]),
    birthdate: new FormControl('', [
        Validators.required
    ]),
    occupation: new FormControl('', [
        Validators.required
    ]),
    height: new FormControl('', [
        Validators.required, Validators.min(0.01)
    ]),
    weight: new FormControl('', [
        Validators.required, Validators.min(0.01)
    ]),
    biography: new FormControl('', [
        Validators.required
    ]),
  });

  isUpdate: boolean = false;

  constructor(
    private title: Title,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private snackBarService: SnackBarService,
    private superheroService: SuperheroService
  ) {}

  ngOnInit(): void {
    this.title.setTitle('W2M: Superheroes - Crear Superhéroe');
    this.loadSuperhero();
  }

  createOrUpdateSuperhero(): void {
    if (!this.form.valid) {
      this.snackBarService.showMessage(
        '¡Por favor, revise todos los datos del superhéroe!'
      );
      return;
    }

    const superhero = {
      id: this.form.get('id')?.value,
      firstName: this.form.get('firstName')?.value,
      lastName: this.form.get('lastName')?.value,
      alias: this.form.get('alias')?.value,
      birthdate: this.form.get('birthdate')?.value,
      occupation: this.form.get('occupation')?.value,
      height: this.form.get('height')?.value,
      weight: this.form.get('weight')?.value,
      biography: this.form.get('biography')?.value,
    } as Superhero;

    if (superhero.id) {
      this.superheroService
        .update(superhero)
        .subscribe((updatedSuperhero: Superhero) => {
          if (updatedSuperhero) {
            this.snackBarService.showMessage(
              `¡Los datos del superhéroe '${superhero.alias}' han sido actualizados en el sistema!`
            );
            this.router.navigate(['/superheroes/superheroes']);
          }
        });
    } else {
      this.superheroService
        .create(superhero)
        .subscribe((createdSuperhero: Superhero) => {
          if (createdSuperhero) {
            this.snackBarService.showMessage(
              `¡El superhéroe '${superhero.alias}' ha sido creado en el sistema!`
            );
            this.router.navigate(['/superheroes/superheroes']);
          }
        });
    }
  }

  goBack(): void {
    this.location.back();
  }

  private loadSuperhero(): void {
    if (this.route.snapshot.url.join('/') !== 'superheroes/create') {
      const id = this.route.snapshot.params?.id;
      if (!this.isNumeric(id)) {
        this.location.back();
      } else {
        this.superheroService.getById(id).subscribe(
          (superhero: Superhero) => {
            this.title.setTitle('W2M: Superheroes - Modificar Superhéroe');
            this.isUpdate = true;
            this.form.get('id')?.setValue(superhero.id);
            this.form.get('firstName')?.setValue(superhero.firstName);
            this.form.get('lastName')?.setValue(superhero.lastName);
            this.form.get('alias')?.setValue(superhero.alias);
            this.form.get('birthdate')?.setValue(superhero.birthdate);
            this.form.get('occupation')?.setValue(superhero.occupation);
            this.form.get('height')?.setValue(superhero.height);
            this.form.get('weight')?.setValue(superhero.weight);
            this.form.get('biography')?.setValue(superhero.biography);
          },
          (_: HttpErrorResponse) => {
            this.location.back();
          }
        );
      }
    }
  }

  private isNumeric(value: any): boolean {
    return !(value instanceof Array) && value - parseFloat(value) + 1 >= 0;
  }
}

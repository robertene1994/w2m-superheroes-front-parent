import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { switchMap, catchError, startWith } from 'rxjs/operators';
import { merge, Observable, of } from 'rxjs';

import {
  FilterService,
  SuperheroService,
  Superhero,
  PageData,
  PaginationDataRequest,
  Condition,
  FilterOperator,
} from 'commons-services';

import { SnackBarService, ConfirmationDialogComponent } from 'commons-ui';

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
export class SuperheroesComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filterCondition: Condition;
  displayedColumns!: { field: string; description: string }[];
  data!: PageData<Superhero> | null;

  constructor(
    private title: Title,
    private router: Router,
    public dialog: MatDialog,
    private filterService: FilterService,
    private snackBarService: SnackBarService,
    private superheroService: SuperheroService
  ) {}

  ngOnInit(): void {
    this.title.setTitle('W2M: Superheroes - Superheroes');
    this.loadTableColumns();
    this.filterCondition = new Condition();
  }

  ngAfterViewInit(): void {
    this.resetFilter();

    this.sort.active = 'id';
    this.sort.direction = 'desc';
    this.paginator.pageSize = 5;
    this.paginator._intl.itemsPerPageLabel = 'Ítems por página:';
    this.paginator._intl.previousPageLabel = 'Página anterior';
    this.paginator._intl.nextPageLabel = 'Siguiente página';

    this.refreshTable();
  }

  resetFilter(): void {
    this.filterCondition.value = undefined;

    switch (this.filterCondition.field) {
      case 'id':
      case 'height':
      case 'weight':
        this.filterCondition.operator = FilterOperator.EQUAL;
        break;
      default:
        this.filterCondition.operator = FilterOperator.LIKE;
        break;
    }

    this.refreshTable();
  }

  applyFilter(): void {
    const filterField = this.filterCondition.field;
    const filterValue = this.filterCondition.value;

    if (!filterValue) {
      this.resetFilter();
    } else if (
      ['id', 'height', 'weight'].includes(filterField) &&
      !this.isNumeric(filterValue)
    ) {
      this.snackBarService.showMessage(
        `¡Para la columna '${
          this.getColumnByField(filterField)?.description
        }' solo se permiten filtrar por valores de tipo numérico (Ej: 1 / 1.80)!`
      );
      return;
    }

    this.refreshTable();
  }

  refreshTable(): void {
    setTimeout(() => {
      this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

      merge(this.sort.sortChange, this.paginator.page)
        .pipe(
          startWith({}),
          switchMap(() => {
            return this.loadData().pipe(catchError(() => of(null)));
          })
        )
        .subscribe((data) => (this.data = data));
    }, 50);
  }

  getFilterColumns(): { field: string; description: string }[] {
    return this.displayedColumns.filter(
      (displayedColumn) =>
        !['birthdate', 'actions'].includes(displayedColumn.field)
    );
  }

  getDisplayedColumnsDescription(): string[] {
    return this.displayedColumns.map(
      (displayedColumn) => displayedColumn.description
    );
  }

  getDisplayedColumnsField(): string[] {
    return this.displayedColumns.map(
      (displayedColumn) => displayedColumn.field
    );
  }

  createSuperhero(): void {
    this.router.navigate(['/superheroes/superheroes/create']);
  }

  updateSuperhero(superhero: Superhero): void {
    this.router.navigate(['/superheroes/superheroes', superhero.id]);
  }

  deleteSuperhero(superhero: Superhero): void {
    this.dialog
      .open(ConfirmationDialogComponent, {
        data: {
          title: 'Eliminar superhéroe',
          message: `¿Está seguro de que desea eliminar el superhéroe '${superhero.alias}' del sistema?`,
          cancel: 'Cancelar',
          confirm: 'Eliminar',
        },
      })
      .afterClosed()
      .subscribe((result: boolean) => {
        if (result) {
          this.superheroService.deleteById(superhero.id).subscribe(() => {
            this.snackBarService.showMessage(
              `¡El superhéroe '${superhero.alias}' ha sido eliminado del sistema!`
            );
          });
          this.resetFilter();
          this.refreshTable();
        }
      });
  }

  private loadTableColumns(): void {
    this.displayedColumns = [
      {
        field: 'id',
        description: 'ID',
      },
      {
        field: 'firstName',
        description: 'Nombre',
      },
      {
        field: 'lastName',
        description: 'Apellidos',
      },
      {
        field: 'alias',
        description: 'Alias',
      },
      {
        field: 'birthdate',
        description: 'Fecha de Nacimiento',
      },
      {
        field: 'occupation',
        description: 'Ocupación',
      },
      {
        field: 'height',
        description: 'Estatura',
      },
      {
        field: 'weight',
        description: 'Peso',
      },
      {
        field: 'actions',
        description: 'Acciones',
      },
    ];
  }

  private getColumnByField(
    field: string
  ): { field: string; description: string } | undefined {
    return this.displayedColumns.find(
      (displayedColumn) => displayedColumn.field === field
    );
  }

  private loadData(): Observable<PageData<Superhero>> {
    const pageRequest = new PaginationDataRequest({
      page: this.paginator.pageIndex + 1,
      pageSize: this.paginator.pageSize,
      sortFields: [this.sort.active],
      sortDir: this.sort.direction,
      filter: this.filterService.toHttpParams([this.filterCondition]),
    });
    return this.superheroService.getPage(pageRequest);
  }

  private isNumeric(value: any): boolean {
    return !(value instanceof Array) && value - parseFloat(value) + 1 >= 0;
  }
}

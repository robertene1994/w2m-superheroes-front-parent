import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CdkTableModule } from '@angular/cdk/table';

import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import {
  MatNativeDateModule,
  MatRippleModule,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';

/**
 * Módulo correspondiente a los componentes pertenecientes a Angular Material
 * utilizados a lo largo de toda la aplicación.
 *
 * @author Robert Ene
 */
@NgModule({
  declarations: [],
  imports: [
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatRippleModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    MatDatepickerModule,
    CdkTableModule,
    FlexLayoutModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es' }],
  bootstrap: [],
  entryComponents: [],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatBadgeModule,
    MatRippleModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    MatDatepickerModule,
    CdkTableModule,
    FlexLayoutModule,
  ],
})
export class AngularMaterialModule {}

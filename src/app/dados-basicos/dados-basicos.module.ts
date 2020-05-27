import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input';

import { MarcasComponent } from './marcas/marcas.component';
import { ModelosComponent } from './modelos/modelos.component';
import { AnoModeloComponent } from './ano-modelo/ano-modelo.component';

@NgModule({
  declarations: [MarcasComponent, ModelosComponent, AnoModeloComponent],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSortModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ]
})
export class DadosBasicosModule { }

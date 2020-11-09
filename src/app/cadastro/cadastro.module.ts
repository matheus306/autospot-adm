import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { LinksComponent } from './links/links.component';
import { CadastrarUrlComponent } from '@app/cadastro/links/modal'
import { ItensDeSerieComponent } from '@app/cadastro/itens-de-serie'
import { CadastrarItemComponent } from '@app/cadastro/itens-de-serie/modal/cadastrar-item'
import { ListaAutoSpotComponent } from '@app/cadastro/lista-auto-spot'
import { ItensDoModeloComponent } from '@app/cadastro/itens-do-modelo'
import { FichaTecnicaDoModeloComponent } from '@app/cadastro/ficha-tecnica-modelo'
import { CadastrarFichaTecnicaComponent } from '@app/cadastro/ficha-tecnica-modelo/modal/cadastrar-ficha-tecnica'


@NgModule({
  declarations: [
    LinksComponent, 
    CadastrarUrlComponent, 
    ItensDeSerieComponent, 
    CadastrarItemComponent,
    ListaAutoSpotComponent,
    ItensDoModeloComponent,
    FichaTecnicaDoModeloComponent,
    CadastrarFichaTecnicaComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSortModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
  ]
})
export class CadastroModule { }

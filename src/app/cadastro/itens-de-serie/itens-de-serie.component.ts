import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ItemSerie } from '@app/_models';
import { ItemSerieService } from '@app/_services';
import { CadastrarItemComponent } from '@app/cadastro/itens-de-serie/modal/cadastrar-item';

@Component({
  selector: 'app-itens-de-serie',
  templateUrl: './itens-de-serie.component.html',
  styleUrls: ['./itens-de-serie.component.css']
})
export class ItensDeSerieComponent implements OnInit {

  dataSource = new MatTableDataSource<ItemSerie>();
  displayedColumns: string[] = ['id', 'descricao', 'observacao', 'url', 'editar', 'excluir'];

  @ViewChild(MatPaginator, {static: true}) 
  paginator : MatPaginator;

  constructor(private itensDeSericeSerice : ItemSerieService, private modal : MatDialog) { }

  ngOnInit(): void {
    this.initDataSource();
  }

  private initDataSource() {
    this.itensDeSericeSerice.findAll().subscribe(retorno => {
      this.dataSource = new MatTableDataSource(retorno);
      this.dataSource.paginator = this.paginator;
    })
  }

  excluir(id : number) {
    if(confirm("Tem certeza que deseja excluir? ")) {
      this.itensDeSericeSerice.excluir(id).subscribe(retorno => {
        this.initDataSource();
      })
    }
  }

  novo() {
    const dialogRef = this.modal.open(CadastrarItemComponent, {width: '50%'});
    dialogRef.componentInstance.refresh.subscribe(retorno => {
      this.initDataSource();
    })
  }

  editar(obj : ItemSerie) {
    const dialogRef = this.modal.open(CadastrarItemComponent, {width: '50%', data : obj});
    dialogRef.componentInstance.refresh.subscribe(retorno => {
      this.initDataSource();
    })
  }
}

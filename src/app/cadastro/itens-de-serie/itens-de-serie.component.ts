import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ItemSerie } from '@app/_models';
import { ItemSerieService } from '@app/_services'

@Component({
  selector: 'app-itens-de-serie',
  templateUrl: './itens-de-serie.component.html',
  styleUrls: ['./itens-de-serie.component.css']
})
export class ItensDeSerieComponent implements OnInit {

  dataSource = new MatTableDataSource<ItemSerie>();
  displayedColumns: string[] = ['id', 'descricao', 'actions'];

  @ViewChild(MatPaginator, {static: true}) 
  paginator : MatPaginator;

  constructor(private itensDeSericeSerice : ItemSerieService) { }

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
    this.itensDeSericeSerice.excluir(id).subscribe(retorno => {
      this.initDataSource();
    })
  }

  novo() {

  }

  editar() {

  }
}

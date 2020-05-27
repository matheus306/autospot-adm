import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms'
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog'

import { AnoModeloService, LinkService } from '@app/_services'
import { ModeloAutospotDTO } from '@app/_dto'
import { CadastrarUrlComponent } from '@app/cadastro/links/modal'

import { Link } from '@app/_models'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css']
})
export class LinksComponent implements OnInit {

  filtroCarro = new FormControl();
  dataSource = new MatTableDataSource<Link>();
  displayedColumns: string[] = ['url', 'actions'];
  dadosAutoSpot$ : Observable<ModeloAutospotDTO[]>;
  anoModeloSelecionado : ModeloAutospotDTO;

  @ViewChild(MatPaginator, {static: true}) 
  paginator: MatPaginator;

  constructor(private anoModeloService : AnoModeloService, private dialog : MatDialog, private linkService : LinkService) { }

  ngOnInit(): void {
    this.anoModeloSelecionado = new ModeloAutospotDTO();
    this.filtroCarro.valueChanges.subscribe(valor => {
      this.consultarDadosVeiculo(valor);
    })
  }

  consultarDadosVeiculo(filtro : String) {
    if(filtro.length > 4)
      this.dadosAutoSpot$ = this.anoModeloService.filtrarPorPalavraChave(filtro);
  }

  displayFn(obj: ModeloAutospotDTO) : string {
    return obj && obj.descricao ? obj.descricao : "";
  }

  selecionarModelo(modelo: ModeloAutospotDTO) {
    this.anoModeloSelecionado = modelo;
    this.anoModeloService.recuperarReportagens(modelo).subscribe(retorno => {
      this.dataSource = new MatTableDataSource(retorno);
      this.dataSource.paginator = this.paginator;
    })
  }

  excluirLink(id : number) {
    this.linkService.excluirLink( id ).subscribe(retorno => {
      this.anoModeloService.recuperarReportagens(this.anoModeloSelecionado).subscribe(retorno => {
        this.dataSource = new MatTableDataSource(retorno);
        this.dataSource.paginator = this.paginator;
      })
    })
  }

  abrirPopUp() {
    const dialogRef = this.dialog.open(CadastrarUrlComponent, {data : this.anoModeloSelecionado} );
    dialogRef.componentInstance.refresh.subscribe( (retorno) => {
      this.anoModeloService.recuperarReportagens(this.anoModeloSelecionado).subscribe(retorno => {
        this.dataSource = new MatTableDataSource(retorno);
        this.dataSource.paginator = this.paginator;
      })
    })
  }
}

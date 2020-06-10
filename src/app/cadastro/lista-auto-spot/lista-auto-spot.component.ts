import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ItemSerieService, ListaAutospotService } from '@app/_services';
import { ItemSerie, ListaAutospot } from '@app/_models';
import { DialogNewListAutospotComponent } from './modal'

@Component({
  selector: 'app-lista-auto-spot',
  templateUrl: './lista-auto-spot.component.html',
  styleUrls: ['./lista-auto-spot.component.css']
})
export class ListaAutoSpotComponent implements OnInit {

  anosOpt : Array<number> = [];
  anoSelecionado : number;
  todosOsItensPossiveis : Array<ItemSerie>;
  listaAutospot : ListaAutospot;

  constructor(private itemSerieService : ItemSerieService, 
              private listaAutospotService : ListaAutospotService,
              private dialog : MatDialog) { }

  ngOnInit(): void {
    this.inicializarListaAnos();

    this.itemSerieService.findAll().subscribe(retorno => {
      this.todosOsItensPossiveis = retorno;
    })
  }

  private inicializarListaAnos() {
    let anoAtual = new Date().getFullYear() + 1;
    for(let i = 1; i <= 5 + 1; i++) {
      this.anosOpt.push(anoAtual--);
    }
  }

  recuperarItensDoAno() {
    this.listaAutospotService.findByAno(this.anoSelecionado).subscribe(retorno => {
      this.listaAutospot = retorno;

      if(!retorno) {
        this.criarNovaLista();
      }
    })
  }

  private criarNovaLista() {
    this.dialog.open(DialogNewListAutospotComponent, {width: '30%'});
  }
}
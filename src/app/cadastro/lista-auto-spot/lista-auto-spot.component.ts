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
  listaAutospot : ListaAutospot = {};

  constructor(private itemSerieService : ItemSerieService, 
              private listaAutospotService : ListaAutospotService,
              private dialog : MatDialog) { }

  ngOnInit(): void {
    this.inicializarComboAno();

    this.itemSerieService.findAll().subscribe(retorno => {
      this.todosOsItensPossiveis = retorno;
    })
  }

  private inicializarComboAno() {
    let anoAtual = new Date().getFullYear() + 1;
    for(let i = 1; i <= 5 + 1; i++) {
      this.anosOpt.push(anoAtual--);
    }
  }

  recuperarListaPeloAno() {
    
    if(this.anoSelecionado) {
      this.listaAutospotService.findByAno(this.anoSelecionado).subscribe(retorno => {

        if(!retorno) {
          this.criarNovaLista();
        } else {
          this.listaAutospot = retorno;
          this.listaAutospotService.mergeItensDoAnoItensDaLista(this.listaAutospot, this.todosOsItensPossiveis);
        }
      })
    } else {
      this.limparDados();
    }
  }

  private limparDados() {
    this.anoSelecionado = null;
    this.listaAutospot = {};
    this.todosOsItensPossiveis.forEach(obj => { obj.checked = false; });
  }

  addItemLista(item : ItemSerie) {
    if( this.listaAutospot.ano && item.checked ) {
      this.listaAutospot.itensDeSerie.push(item);
    } else {
      this.listaAutospot.itensDeSerie = this.listaAutospot.itensDeSerie.filter(obj => obj.id !== item.id);
    }
    this.listaAutospotService.updateLista(this.listaAutospot).subscribe(retorno => {
      console.log(retorno)
    })
  }

  private criarNovaLista() {
    const dialogRef = this.dialog.open(DialogNewListAutospotComponent, {width: '30%'});

    dialogRef.afterClosed().subscribe(retorno => {

      if(retorno) {

        let novaLista = new ListaAutospot();
        novaLista.ano = this.anoSelecionado;

        this.listaAutospotService.createLista(novaLista).subscribe(retorno => {
          this.recuperarListaPeloAno();
        })
      } else {
        this.limparDados();
      }
    })
  }
}
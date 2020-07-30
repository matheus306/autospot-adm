import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { AnoModeloService, ListaAutospotService } from '@app/_services';
import { ModeloAutospotDTO } from '@app/_dto';
import { ItemSerie, AnoModelo } from '@app/_models'

@Component({
  selector: 'app-itens-do-modelo',
  templateUrl: './itens-do-modelo.component.html',
  styleUrls: ['./itens-do-modelo.component.css']
})
export class ItensDoModeloComponent implements OnInit {

  filtroCarro = new FormControl();
  dadosAutoSpot$ : Observable<ModeloAutospotDTO[]>;
  anoModeloSelecionado : AnoModelo;
  todosOsItensPossiveis : Array<ItemSerie>;

  constructor(private anoModeloService : AnoModeloService, 
              private listaAutospotService : ListaAutospotService) { }

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
    this.anoModeloService.findById(modelo.codigo).subscribe(result => {
      this.anoModeloSelecionado = result;
      this.recuperarListaDoAno();
    });
  }

  recuperarListaDoAno() {
    this.todosOsItensPossiveis = [];
    this.listaAutospotService.findByAno(this.anoModeloSelecionado.ano).subscribe(result => {
      this.todosOsItensPossiveis = result.itensDeSerie;

      for (let item of this.todosOsItensPossiveis) {
        if( this.anoModeloSelecionado && this.anoModeloSelecionado.itensDeSerie ) {
          item.checked = this.anoModeloSelecionado.itensDeSerie.find(obj => obj.id == item.id) != null;
        }
      }
    })
  }

  addRemoveItemLista(item : ItemSerie) {
    if(item.checked) {
      this.anoModeloService.addItemDeSerie(this.anoModeloSelecionado, item.id).subscribe();
    } else {
      this.anoModeloService.removeItemDeSerie(this.anoModeloSelecionado, item.id).subscribe();
    }
  }
}

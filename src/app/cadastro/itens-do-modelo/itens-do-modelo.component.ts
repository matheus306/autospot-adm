import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { AnoModeloService, ListaAutospotService } from '@app/_services';
import { ModeloAutospotDTO } from '@app/_dto';
import { ItemSerie } from '@app/_models'

@Component({
  selector: 'app-itens-do-modelo',
  templateUrl: './itens-do-modelo.component.html',
  styleUrls: ['./itens-do-modelo.component.css']
})
export class ItensDoModeloComponent implements OnInit {

  filtroCarro = new FormControl();
  dadosAutoSpot$ : Observable<ModeloAutospotDTO[]>;
  anoModeloSelecionado : ModeloAutospotDTO;
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
    this.anoModeloSelecionado = modelo;
    this.todosOsItensPossiveis = [];
    this.listaAutospotService.findByAno(modelo.ano).subscribe(result => {
      this.todosOsItensPossiveis = result.itensDeSerie;
    })
  }

  addItemLista(item : ItemSerie) {
    console.log(item.id, this.anoModeloSelecionado.codigo)
  }
}

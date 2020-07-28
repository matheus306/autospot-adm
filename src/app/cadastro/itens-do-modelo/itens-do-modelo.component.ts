import { AnoModeloService } from './../../_services/ano-modelo.service';
import { ModeloAutospotDTO } from './../../_dto/modelo.autospot';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-itens-do-modelo',
  templateUrl: './itens-do-modelo.component.html',
  styleUrls: ['./itens-do-modelo.component.css']
})
export class ItensDoModeloComponent implements OnInit {

  filtroCarro = new FormControl();
  dadosAutoSpot$ : Observable<ModeloAutospotDTO[]>;
  anoModeloSelecionado : ModeloAutospotDTO;

  constructor(private anoModeloService : AnoModeloService) { }

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
  }
}

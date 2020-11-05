import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { AnoModeloService, FichaTecnicaService } from '@app/_services';
import { ModeloAutospotDTO } from '@app/_dto';
import { AnoModelo } from '@app/_models'

@Component({
  selector: 'app-itens-do-modelo',
  templateUrl: './ficha-tecnica-modelo.component.html',
  styleUrls: ['./ficha-tecnica-modelo.component.css']
})
export class FichaTecnicaDoModeloComponent implements OnInit {

  dadosBasicos : any;
  filtroCarro = new FormControl();
  dadosAutoSpot$ : Observable<ModeloAutospotDTO[]>;
  anoModeloSelecionado : AnoModelo;

  constructor(private anoModeloService : AnoModeloService, private fichaTecnicaService : FichaTecnicaService) { }

  ngOnInit(): void {
    this.anoModeloSelecionado = new ModeloAutospotDTO();
    this.filtroCarro.valueChanges.subscribe(valor => {
      this.consultarDadosVeiculo(valor);
    })

    this.fichaTecnicaService.init().subscribe(dados => {
      this.dadosBasicos = dados;
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
      this.fichaTecnicaService.findByAnoModelo(result.id).subscribe(fichas => {
        console.log(fichas)
      })
    });
  }
}

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AnoModelo } from '@app/_models'
import { AnoModeloService } from '@app/_services';
import { ModeloAutospotDTO } from '@app/_dto';

@Component({
  selector: 'app-ano-modelo-comp',
  templateUrl: './ano-modelo-comp.component.html',
  styleUrls: ['./ano-modelo-comp.component.css']
})
export class AnoModeloComponent implements OnInit {

  @Input() anoModelo: AnoModelo;
  @Output() novoAnoModelo = new EventEmitter<AnoModelo>();

  dadosAutoSpot$ : Observable<ModeloAutospotDTO[]>;
  filtroCarro = new FormControl();
  
  constructor(private anoModeloService : AnoModeloService) { }

  ngOnInit(): void {
    this.filtroCarro.valueChanges.subscribe(valor => {
      this.consultarDadosVeiculo(valor);
    })
  }

  consultarDadosVeiculo(filtro : String) {
    if(filtro.length > 4)
      this.dadosAutoSpot$ = this.anoModeloService.filtrarPorPalavraChave(filtro);
  }

  selecionarModelo(modelo: ModeloAutospotDTO) {
    this.anoModeloService.findById(modelo.codigo).subscribe(result => {
      this.anoModelo = result;
      this.novoAnoModelo.emit(this.anoModelo)
    });
  }

  displayFn(obj: ModeloAutospotDTO) : string {
    return obj && obj.descricao ? obj.descricao : "";
  }
}

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';

import { FichaTecnicaDoModeloComponent } from '@app/cadastro/ficha-tecnica-modelo';
import { FichaTecnica, AnoModelo } from '@app/_models';
import { FichaTecnicaService } from '@app/_services';

@Component({
  selector: 'app-cadastrar-ficha-tecnica',
  templateUrl: './cadastrar-ficha-tecnica.component.html',
  styleUrls: ['./cadastrar-ficha-tecnica.component.css']
})
export class CadastrarFichaTecnicaComponent implements OnInit {

  @Output() 
  refresh = new EventEmitter();
  
  anoModelo : AnoModelo;
  fichaTecnica = new FichaTecnica();
  dadosBasicos : any;

  constructor(private ref : MatDialogRef<FichaTecnicaDoModeloComponent>, 
              @Inject(MAT_DIALOG_DATA) public data : any,
              private fichaTecnicaService: FichaTecnicaService) {
    if(data) {
      this.anoModelo = data.anoModeloSelecionado;
      this.dadosBasicos = data.dadosBasicos;
      this.fichaTecnica.anoModelo = data.anoModeloSelecionado;
    }
  }
  ngOnInit(): void {}

  salvar() {
    this.fichaTecnicaService.salvar(this.fichaTecnica).subscribe(retorno => {
      console.log(retorno);
    });
  }

  atualizar(){}

  close(){}
}

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
  isModoEdicao = false;

  isDiesel = false;
  isEletrico = false;
  isEtanol = false;
  isFlex = false;
  isGasolina = false;
  isHibrido = false;
  isHibridoFlex = false;


  constructor(private ref : MatDialogRef<FichaTecnicaDoModeloComponent>, 
              @Inject(MAT_DIALOG_DATA) public data : any,
              private fichaTecnicaService: FichaTecnicaService) {

    if(data) {
      this.anoModelo = data.anoModeloSelecionado;
      this.dadosBasicos = data.dadosBasicos;
      this.fichaTecnica.anoModelo = data.anoModeloSelecionado;
      this.isModoEdicao = data.editar;

      if(data.fichaTecnica) {
        this.fichaTecnica = data.fichaTecnica;
      }
    }
  }

  tipoFonteChange(e) {
    this.isDiesel      = e.codigo == 1; //DIESEL(1,"Diesel")
    this.isEletrico    = e.codigo == 2; //ELETRICO(2,"Elétrico")
    this.isEtanol      = e.codigo == 3; //ETANOL(3,"Etanol")
    this.isFlex        = e.codigo == 4; //FLEX(4,"Flex")
    this.isGasolina    = e.codigo == 5; //GASOLINA(5,"Gasolina")
    this.isHibrido     = e.codigo == 6; //HIBRIDO(6,"Híbrido")
    this.isHibridoFlex = e.codigo == 7; //HIBRIDO_FLEX(7,"Híbrido Flex")
  }

  ngOnInit(): void {

    if(!this.isModoEdicao) {
      let mapaFontesJaCadastradas = this.anoModelo.fichaTecnica.map(obj => obj.tipoFonteEnergetica.codigo);
      this.dadosBasicos.tipoFonteEnergetica = this.dadosBasicos.tipoFonteEnergetica.filter(obj => {
        return !mapaFontesJaCadastradas.includes(obj.codigo);
      })

      let mapaTransmissaoJaCadastradas = this.anoModelo.fichaTecnica.map(obj => obj.transmissaoEnum.codigo);
      this.dadosBasicos.transmissaoEnum = this.dadosBasicos.transmissaoEnum.filter(obj => {
        return !mapaTransmissaoJaCadastradas.includes(obj.codigo);
      })

      let mapaAlimentacaoJaCadastradas = this.anoModelo.fichaTecnica.map(obj => obj.alimentacaoEnum.codigo);
      this.dadosBasicos.alimentacaoEnum = this.dadosBasicos.alimentacaoEnum.filter(obj => {
        return !mapaAlimentacaoJaCadastradas.includes(obj.codigo);
      })

      let mapaTracaoJaCadastradas = this.anoModelo.fichaTecnica.map(obj => obj.tracaoEnum.codigo);
      this.dadosBasicos.tracaoEnum = this.dadosBasicos.tracaoEnum.filter(obj => {
        return !mapaTracaoJaCadastradas.includes(obj.codigo);
      })

      let mapaDirecaoJaCadastradas = this.anoModelo.fichaTecnica.map(obj => obj.direcaoEnum.codigo);
      this.dadosBasicos.direcaoEnum = this.dadosBasicos.direcaoEnum.filter(obj => {
        return !mapaDirecaoJaCadastradas.includes(obj.codigo);
      })

      let mapaRodasJaCadastradas = this.anoModelo.fichaTecnica.map(obj => obj.rodasEnum.codigo);
      this.dadosBasicos.rodasEnum = this.dadosBasicos.rodasEnum.filter(obj => {
        return !mapaRodasJaCadastradas.includes(obj.codigo);
      })

      if(this.fichaTecnica && this.fichaTecnica.id) {
        this.dadosBasicos.tipoFonteEnergetica.push(this.fichaTecnica.tipoFonteEnergetica);
        this.dadosBasicos.transmissaoEnum.push(this.fichaTecnica.transmissaoEnum);
        this.dadosBasicos.alimentacaoEnum.push(this.fichaTecnica.alimentacaoEnum);
        this.dadosBasicos.tracaoEnum.push(this.fichaTecnica.tracaoEnum);
        this.dadosBasicos.direcaoEnum.push(this.fichaTecnica.direcaoEnum);
        this.dadosBasicos.rodasEnum.push(this.fichaTecnica.rodasEnum);
      }
    } else {
      this.tipoFonteChange(this.fichaTecnica.tipoFonteEnergetica);
    }
  }

  salvar() {
    this.fichaTecnicaService.salvar(this.fichaTecnica).subscribe(retorno => {
      this.refresh.emit(retorno);
      this.ref.close();
    });
  }

  atualizar(){
    this.fichaTecnica.anoModelo = {"id" : this.anoModelo.id};
    this.fichaTecnicaService.editar(this.fichaTecnica).subscribe(retorno => {
      this.refresh.emit(retorno);
      this.ref.close();
    });
  }

  close(){
    this.ref.close()
  }

  compareFn( optionOne, optionTwo ) : boolean {
    if(!optionTwo) {
      return false;
    }
    return optionOne.codigo === optionTwo.codigo;
  }
}

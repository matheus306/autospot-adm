import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';

import { ItensDeSerieComponent } from '@app/cadastro/itens-de-serie/';
import { ItemSerieService } from '@app/_services/item.serie.service'
import { ItemSerie } from '@app/_models';

@Component({
  selector: 'app-cadastrar-item',
  templateUrl: './cadastrar-item.component.html',
  styleUrls: ['./cadastrar-item.component.css']
})
export class CadastrarItemComponent implements OnInit {

  @Output() 
  refresh = new EventEmitter();

  novoItem = new ItemSerie();

  constructor(private ref : MatDialogRef<ItensDeSerieComponent>, 
              private itemService : ItemSerieService,
              @Inject(MAT_DIALOG_DATA) public data : ItemSerie) {

        if(data && data.id) {
          this.novoItem = data;
        }
  }

  ngOnInit(): void {}

  salvar() {
    this.itemService.salvar(this.novoItem).subscribe(retorno => {
      this.refresh.emit(retorno);
    })
  }

  atualizar() {
    this.itemService.atualizar(this.novoItem).subscribe(retorno => {
      this.refresh.emit(retorno);
    })
  }

  close() {
    this.ref.close()
  }
}

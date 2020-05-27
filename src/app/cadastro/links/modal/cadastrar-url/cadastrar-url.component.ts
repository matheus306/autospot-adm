import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Output, EventEmitter } from '@angular/core'; 

import { ModeloAutospotDTO } from "@app/_dto/modelo.autospot"
import { Link, AnoModelo } from "@app/_models"
import { LinkService } from "@app/_services"

@Component({
  selector: 'app-cadastrar-url',
  templateUrl: './cadastrar-url.component.html',
  styleUrls: ['./cadastrar-url.component.css']
})
export class CadastrarUrlComponent implements OnInit {

  link : Link;

  @Output() 
  refresh = new EventEmitter();

  constructor(
    @Inject(MAT_DIALOG_DATA) public modeloAutoSpot : ModeloAutospotDTO, 
    private linkService : LinkService,
    private dialogRef: MatDialogRef<CadastrarUrlComponent>,) { }

  ngOnInit(): void {
    this.link = new Link();
    this.link.anoModelo = new AnoModelo();
    this.link.anoModelo.id = this.modeloAutoSpot.codigo;
  }

  salvar() {
    this.linkService.salvarLink(this.link).subscribe(retorno => {
      this.refresh.emit(retorno);
    })
  }

  close() {
    this.dialogRef.close();
  }
}

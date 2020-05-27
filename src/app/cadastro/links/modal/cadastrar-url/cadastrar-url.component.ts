import { Component, OnInit, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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

  constructor(@Inject(MAT_DIALOG_DATA) public modeloAutoSpot : ModeloAutospotDTO, private linkService : LinkService) { }

  ngOnInit(): void {
    this.link = new Link();
    this.link.anoModelo = new AnoModelo();
    this.link.anoModelo.id = this.modeloAutoSpot.codigo;
  }

  salvar() {
    this.linkService.salvarLink(this.link).subscribe(retorno => {
      console.log(retorno)
    })
  }
}

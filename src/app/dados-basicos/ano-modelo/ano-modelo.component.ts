import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms'
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { MarcaService, ModeloService, AnoModeloService } from '@app/_services';
import { Marca, Modelo, AnoModelo } from '@app/_models';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-ano-modelo',
  templateUrl: './ano-modelo.component.html',
  styleUrls: ['./ano-modelo.component.css']
})
export class AnoModeloComponent implements OnInit {

  marcaControl = new FormControl();
  modeloControl = new FormControl();

  marcas: Marca[];
  modelos: Modelo[];
  dataSource: MatTableDataSource<AnoModelo>;

  marcasFiltradas : Marca[];
  modelosFiltrados : Modelo[];

  marcaSelecionada : Marca;
  displayedColumns: string[] = ['id', 'ano'];

  @ViewChild(MatPaginator, {static: true}) 
  paginator: MatPaginator;

  constructor(private marcaService : MarcaService, private modeloService : ModeloService, private anoModeloService : AnoModeloService) {}

  ngOnInit(): void {

    //Inicializando Marcas
    this.marcaService.getAll().subscribe(marcasParam => {
      this.marcas = marcasParam;
    })

    this.marcaControl.valueChanges.subscribe(valor => {
      if(!(valor instanceof Object))
        this.marcasFiltradas = this._filterMarcas(valor);
    })

    //Inicializando Modelos
    this.modeloControl.valueChanges.subscribe(valor => {
      if(!(valor instanceof Object))
        this.modelosFiltrados = this._filterModelos(valor);
    })
  }

  //Funções de Marcas
  displayMarcaFn(marcaPara: Marca) : string {
    return marcaPara && marcaPara.Label ? marcaPara.Label : "";
  }

  selecionarMarca(marca: Marca) {
    this.modeloService.recuperaModeloPelaMarca(marca).subscribe(modelos => {
      this.modelos = modelos;
    });
  }

  private _filterMarcas(value: string): Marca[] {
    const filterValue = value.toLowerCase();
    return this.marcas.filter(option => option.Label.toLowerCase().indexOf(filterValue) === 0);
  }

  //Funções dos Modelos
  displayModeloFn(modeloParam: Modelo) : string {
    return modeloParam && modeloParam.Label ? modeloParam.Label : "";
  }

  selecionarModelo(modelo: Modelo) {
    this.anoModeloService.findByModelo(modelo).subscribe( anoModelos => {
      this.dataSource = new MatTableDataSource(anoModelos);
      this.dataSource.paginator = this.paginator;
    })
  }

  private _filterModelos(value: string): Marca[] {
    const filterValue = value.toLowerCase();
    return this.modelos.filter(option => option.Label.toLowerCase().indexOf(filterValue) === 0);
  }
}

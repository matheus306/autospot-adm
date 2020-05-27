import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms'
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { MarcaService, ModeloService } from '@app/_services';
import { Marca, Modelo } from '@app/_models';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-modelos',
  templateUrl: './modelos.component.html',
  styleUrls: ['./modelos.component.css']
})
export class ModelosComponent implements OnInit {

  myControl = new FormControl();
  marcas: Marca[];
  filteredOptions : Marca[];
  dataSource: MatTableDataSource<Modelo>;
  displayedColumns: string[] = ['Value', 'Label', 'Marca'];

  @ViewChild(MatPaginator, {static: true}) 
  paginator: MatPaginator;

  constructor(private marcaService: MarcaService, private modeloService : ModeloService) { }

  ngOnInit(): void {
    this.marcaService.getAll().pipe(first()).subscribe(retorno => {
      this.marcas = retorno;
    });

    this.myControl.valueChanges.subscribe(valor => {
      if(!(valor instanceof Object))
        this.filteredOptions = this._filter(valor);
    })
  }

  selecionarMarca(marca: Marca) {
    this.modeloService.recuperaModeloPelaMarca(marca).subscribe(modelos => {
      this.dataSource =  new MatTableDataSource<Marca>(modelos);
      this.dataSource.paginator = this.paginator;
    });
  }

  displayFn(marcaPara: Marca) : string {
    return marcaPara && marcaPara.Label ? marcaPara.Label : "";
  }

  filtrarModelos(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private _filter(value: string): Marca[] {
    const filterValue = value.toLowerCase();
    return this.marcas.filter(option => option.Label.toLowerCase().indexOf(filterValue) === 0);
  }
}

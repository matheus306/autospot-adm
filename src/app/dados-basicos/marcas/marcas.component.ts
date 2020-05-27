import { Component, ViewChild, OnInit  } from '@angular/core';
import { first } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Marca } from '@app/_models';
import { MarcaService }  from '@app/_services'

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.css']
})
export class MarcasComponent implements OnInit {

    loading = false;
    dataSource: MatTableDataSource<Marca>;
    displayedColumns: string[] = ['Value', 'Label'];

    @ViewChild(MatPaginator, {static: true}) 
    paginator: MatPaginator;

    constructor(private marcaService: MarcaService) { }

    ngOnInit() {
        this.loading = true;
        this.marcaService.getAll().pipe(first()).subscribe(marcas => {
            this.loading = false;
            this.dataSource = new MatTableDataSource<Marca>(marcas);
            this.dataSource.paginator = this.paginator;
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}

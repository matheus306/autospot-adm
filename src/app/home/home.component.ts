import { Component, OnInit  } from '@angular/core';

import { DashboardService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {

    totalMarcas     : number = 0;
    totalMarcasAux  : number = 0;

    totalModelos    : number = 0;
    totalModelosAux : number = 0;

    totalVersoes    : number = 0;
    totalVersoesAux : number = 0;

    totalListas     : number = 0;
    totalListasAux  : number = 0;

    constructor(private dashboardService : DashboardService) {}

    ngOnInit() {
        this.dashboardService.recuperarTotalMarcas().subscribe(retorno => {
            this.totalMarcas = retorno;
        })

        this.dashboardService.recuperarTotalModelos().subscribe(retorno => {
            this.totalModelos = retorno;
        })

        this.dashboardService.recuperarTotalVersoes().subscribe(retorno => {
            this.totalVersoes = retorno;
        })

        this.dashboardService.recuperarTotalListasAutospot().subscribe(retorno => {
            this.totalListas = retorno;
        })
    }
}
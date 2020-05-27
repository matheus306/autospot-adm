import { Routes } from "@angular/router";

import { AuthGuard } from '@app/_helpers';
import { MarcasComponent } from "./marcas"
import { ModelosComponent } from './modelos'
import { AnoModeloComponent } from './ano-modelo'

export const DadosBasicosRoutes : Routes = [
    {
        path : 'marcas',
        component: MarcasComponent, 
        canActivate: [AuthGuard]
    },
    {
        path : 'modelos',
        component: ModelosComponent, 
        canActivate: [AuthGuard]
    },
    {
        path : 'ano-modelo',
        component: AnoModeloComponent, 
        canActivate: [AuthGuard]
    }
]
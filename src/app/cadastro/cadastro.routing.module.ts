import { Routes } from "@angular/router";

import { AuthGuard } from '@app/_helpers';
import { LinksComponent } from "./links"
import { ItensDeSerieComponent } from "./itens-de-serie"
import { ListaAutoSpotComponent } from './lista-auto-spot'

export const CadastroRoutes : Routes = [
    {
        path : 'links',
        component: LinksComponent, 
        canActivate: [AuthGuard]
    },
    {
        path : 'itens-de-serie',
        component: ItensDeSerieComponent, 
        canActivate: [AuthGuard]
    },
    {
        path : 'lista-auto-spot',
        component: ListaAutoSpotComponent, 
        canActivate: [AuthGuard]
    }
]
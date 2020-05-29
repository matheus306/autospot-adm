import { Routes } from "@angular/router";

import { AuthGuard } from '@app/_helpers';
import { LinksComponent } from "./links"
import { ItensDeSerieComponent } from "./itens-de-serie"

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
    }
]
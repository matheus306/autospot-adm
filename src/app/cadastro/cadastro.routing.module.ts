import { Routes } from "@angular/router";

import { AuthGuard } from '@app/_helpers';
import { LinksComponent } from "./links"


export const CadastroRoutes : Routes = [
    {
        path : 'links',
        component: LinksComponent, 
        canActivate: [AuthGuard]
    }
]
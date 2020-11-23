import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientCreatePage } from './client-create/client-create.page';
import { ClientDetailsPage } from './client-details/client-details.page';
import { ClientListPage } from './client-list/client-list.page';
import { ClientUpdatePage } from './client-update/client-update.page';

const routes: Routes = [
    {
        path: '',
        component: ClientCreatePage
    },
    {
        path: '',
        children: [
            {
                path: 'list',
                component: ClientListPage,
            },
            {
                path: 'details/:id',
                component: ClientDetailsPage,
            },
            {
                path: 'create',
                component: ClientCreatePage,
            },
            {
                path: 'update/:id',
                component: ClientUpdatePage,
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ClientPageRoutingModule { }

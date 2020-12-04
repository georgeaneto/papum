import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfessionalCreatePage } from './professional-create/professional-create.page';
import { ProfessionalDetailsPage } from './professional-list/details/professional-details.page';
import { ProfessionalListPage } from './professional-list/professional-list.page';
import { ProfessionalUpdatePage } from './professional-update/professional-update.page';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/professional/list',
        pathMatch: 'full',
    },
    {
        path: '',
        children: [
            {
                path: 'list',
                component: ProfessionalListPage,
            },
            {
                path: 'details/:id',
                component: ProfessionalDetailsPage,
            },
            {
                path: 'create',
                component: ProfessionalCreatePage,
            },
            {
                path: 'update/:id',
                component: ProfessionalUpdatePage,
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProfessionalPageRoutingModule { }

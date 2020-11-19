import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfessionalCreatePage } from './professional-create/professional-create.page';
import { ProfessionalDetailsPage } from './professional-details/professional-details.page';
import { ProfessionalListPage } from './professional-list/professional-list.page';

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
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProfessionalPageRoutingModule { }

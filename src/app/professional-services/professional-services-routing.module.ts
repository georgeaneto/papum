import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfessionalServicesCreatePage } from './professional-services-create/professional-services-create.page';
import { ProfessionalServicesDetailsPage } from './professional-services-details/professional-services-details.page';
import { ProfessionalServicesListPage } from './professional-services-list/professional-services-list.page';
import { ProfessionalServicesUpdatePage } from './professional-services-update/professional-services-update.page';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/professional-services/create',
        pathMatch: 'full',
    },
    {
        path: '',
        children: [
            {
                path: 'create',
                component: ProfessionalServicesCreatePage
            },
            {
                path: 'details/:id',
                component: ProfessionalServicesDetailsPage,
            },
            {
                path: 'list',
                component: ProfessionalServicesListPage,
            },
            {
                path: 'update/:id',
                component: ProfessionalServicesUpdatePage,
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProfessionalServicesRoutingModule { }

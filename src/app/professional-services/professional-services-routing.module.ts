import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfessionalServicesCreatePage } from './professional-services-create/professional-services-create.page';

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
            /*{
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
            },*/
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProfessionalServicesRoutingModule { }

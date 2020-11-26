import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppointmentCreatePage } from './appointment-create/appointment-create.page';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/appointment/create',
        pathMatch: 'full',
    },
    {
        path: '',
        children: [
            {
                path: 'create',
                component: AppointmentCreatePage,
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AppointmentRoutingModule { }

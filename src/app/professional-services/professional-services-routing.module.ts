import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfessionalServicesPage } from './professional-services.page';

const routes: Routes = [
    {
        path: '',
        component: ProfessionalServicesPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ServicePageRoutingModule { }

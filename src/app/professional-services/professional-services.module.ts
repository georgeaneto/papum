import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ProfessionalServicesCreatePage } from './professional-services-create/professional-services-create.page';
import { ProfessionalServicesListPage } from './professional-services-list/professional-services-list.page';
import { ProfessionalServicesRoutingModule } from './professional-services-routing.module';
import { ProfessionalServicesUpdatePage } from './professional-services-update/professional-services-update.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ProfessionalServicesRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [
        ProfessionalServicesCreatePage,
        ProfessionalServicesListPage,
        ProfessionalServicesCreatePage,
        ProfessionalServicesListPage,
        ProfessionalServicesUpdatePage
    ]
})
export class ProfessionalServicesPageModule { }

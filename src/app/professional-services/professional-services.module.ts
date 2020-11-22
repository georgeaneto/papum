import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ProfessionalServicesCreatePage } from './professional-services-create/professional-services-create.page';
import { ProfessionalServicesRoutingModule } from './professional-services-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ProfessionalServicesRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [ProfessionalServicesCreatePage]
})
export class ProfessionalServicesPageModule { }

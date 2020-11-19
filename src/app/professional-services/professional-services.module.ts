import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ServicePageRoutingModule } from './professional-services-routing.module';
import { ProfessionalServicesPage } from './professional-services.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ServicePageRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [ProfessionalServicesPage]
})
export class ProfessinalServicesPageModule { }

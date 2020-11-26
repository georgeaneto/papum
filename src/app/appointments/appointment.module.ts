import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AppointmentCreatePage } from './appointment-create/appointment-create.page';
import { AppointmentRoutingModule } from './appointment-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AppointmentRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [
        AppointmentCreatePage,
    ]
})
export class AppointmentModule { }

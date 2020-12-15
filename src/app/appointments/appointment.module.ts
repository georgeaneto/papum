import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';

import { AppointmentCreatePage } from './appointment-create/appointment-create.page';
import { AppointmentRoutingModule } from './appointment-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AppointmentRoutingModule,
        ReactiveFormsModule,
        Ionic4DatepickerModule,
    ],
    declarations: [
        AppointmentCreatePage,
    ],
})
export class AppointmentModule { }

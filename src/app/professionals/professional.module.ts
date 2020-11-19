import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ProfessionalCreatePage } from './professional-create/professional-create.page';
import { ProfessionalDetailsPage } from './professional-details/professional-details.page';
import { ProfessionalListPage } from './professional-list/professional-list.page';
import { ProfessionalPageRoutingModule } from './professional-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ProfessionalPageRoutingModule,
        ReactiveFormsModule,
    ],
    declarations: [
        ProfessionalListPage,
        ProfessionalDetailsPage,
        ProfessionalCreatePage,
    ],
})
export class ProfessionalPageModule { }

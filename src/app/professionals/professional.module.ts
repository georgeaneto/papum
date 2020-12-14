import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ProfessionalCreatePage } from './professional-create/professional-create.page';
import { ProfessionalDetailsModalComponent } from './professional-list/details/professional-details.modal.component';
import { ProfessionalDetailsPage } from './professional-list/details/professional-details.page';
import { ProfessionalDetailsTemplatePage } from './professional-list/details/template/professional-details-template';
import { ProfessionalListPage } from './professional-list/professional-list.page';
import { ProfessionalPageRoutingModule } from './professional-routing.module';
import { ProfessionalUpdatePage } from './professional-update/professional-update.page';

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
        ProfessionalUpdatePage,
        ProfessionalDetailsModalComponent,
        ProfessionalDetailsTemplatePage,
    ],
})
export class ProfessionalPageModule { }

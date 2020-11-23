import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ClientCreatePage } from './client-create/client-create.page';
import { ClientDetailsPage } from './client-details/client-details.page';
import { ClientListPage } from './client-list/client-list.page';
import { ClientPageRoutingModule } from './client-routing.module';
import { ClientUpdatePage } from './client-update/client-update.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ClientPageRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [
        ClientCreatePage,
        ClientListPage,
        ClientDetailsPage,
        ClientUpdatePage]
})
export class ClientPageModule { }

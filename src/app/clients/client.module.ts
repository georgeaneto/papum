import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ClientPageRoutingModule } from './client-routing.module';
import { ClientPage } from './client.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ClientPageRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [ClientPage]
})
export class ClientPageModule { }

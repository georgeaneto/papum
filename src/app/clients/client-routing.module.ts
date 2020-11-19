import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientPage } from './client.page';

const routes: Routes = [
    {
        path: '',
        component: ClientPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ClientPageRoutingModule { }

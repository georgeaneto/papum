import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'professional',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule)
    },
    {
        path: 'client',
        loadChildren: () => import('./clients/client.module').then(m => m.ClientPageModule)
    },
    {
        path: 'professional',
        loadChildren: () => import('./professionals/professional.module').then(m => m.ProfessionalPageModule)
    },
    {
        path: 'professional-services',
        loadChildren: () => import('./professional-services/professional-services.module').then(m => m.ProfessinalServicesPageModule)
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }

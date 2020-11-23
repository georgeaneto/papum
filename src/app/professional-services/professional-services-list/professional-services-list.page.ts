import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import 'firebase/firestore';
import { take } from 'rxjs/operators';

import { IProfessionalService } from '../shared/professional-services.model';
import { ProfessionalServicesService } from '../shared/professional-services.service';

@Component({
    selector: 'app-professional-services-list',
    templateUrl: './professional-services-list.page.html',
    styleUrls: ['./professional-services-list.page.scss'],
})
export class ProfessionalServicesListPage {
    public form: FormGroup;
    public professionalServiceList: IProfessionalService[];

    constructor(
        private alertController: AlertController,
        private router: Router,
        private professionalServiceService: ProfessionalServicesService
    ) { }

    public ionViewDidEnter(): void {
        this.updateProfessionalServiceList();
    }

    public onAdd(): void {
        this.router.navigate(['professional-services/create']);
    }

    public onUpdate(id: string): void {
        this.router.navigate(['professional-services/update', id]);
    }

    public onViewDetails(id: string): void {
        this.router.navigate(['professional-services/details', id]);
    }

    public async onRemove(event: Event, id: string) {
        event.stopPropagation();
        event.preventDefault();

        const alert = await this.alertController.create({
            header: 'Atenção',
            message: '<strong>O serviço será removido!</strong>',
            buttons: [
                {
                    text: 'CANCELAR',
                }, {
                    text: 'SIM',
                    handler: () => {
                        this.deleteService(id);
                        this.updateProfessionalServiceList();
                    }
                }
            ]
        });

        await alert.present();
    }

    private updateProfessionalServiceList(): void {
        this.professionalServiceService
            .getAll()
            .subscribe({
                next: (result) => {
                    this.professionalServiceList = result;
                }
            });
    }

    private deleteService(id: string): void {
        this.professionalServiceService
            .delete(id)
            .pipe(take(1))
            .subscribe({
                next: (result) => {
                    console.log(result);
                },
                error: (error) => {
                    console.log(error);
                }
            });
    }
}

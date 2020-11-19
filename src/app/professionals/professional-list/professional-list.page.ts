import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

import 'firebase/firestore';
import { take } from 'rxjs/operators';

import { IProfessional } from '../shared/professional.model';
import { ProfessionalService } from '../shared/professional.service';

@Component({
    selector: 'app-professional-list',
    templateUrl: './professional-list.page.html',
    styleUrls: ['./professional-list.page.scss'],
})
export class ProfessionalListPage {
    public professionalList: IProfessional[];

    constructor(
        private alertController: AlertController,
        private loadingController: LoadingController,
        private router: Router,
        private professionalService: ProfessionalService
    ) { }

    public ionViewDidEnter(): void {
        this.updateProfessionalList();
    }

    public onAddProfessional(): void {
        this.router.navigate(['professional/create']);
    }

    public async onRemove(event: Event, id: string) {
        event.stopPropagation();
        event.preventDefault();

        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Atenção',
            message: '<strong>O profissional será removido!</strong>',
            buttons: [
                {
                    text: 'CANCELAR',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        console.log('operação cancelada');
                    }
                }, {
                    text: 'SIM',
                    handler: () => {
                        console.log('operação confirmada');
                        this.deleteProfessional(id);
                        this.updateProfessionalList();
                    }
                }
            ]
        });

        await alert.present();
    }

    private updateProfessionalList(): void {
        this.professionalService
            .getAll()
            .subscribe({
                next: (result) => {
                    this.professionalList = result;
                }
            });
    }

    private deleteProfessional(id: string): void {
        this.professionalService
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

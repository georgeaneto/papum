import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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
    public form: FormGroup;
    public professionalList: IProfessional[];

    constructor(
        private alertController: AlertController,
        private router: Router,
        private professionalService: ProfessionalService
    ) { }

    public ionViewDidEnter(): void {
        this.updateProfessionalList();
    }

    public onAdd(): void {
        this.router.navigate(['professional/create']);
    }

    public onUpdate(id: string): void {
        this.router.navigate(['professional/update', id]);
    }

    public onViewDetails(id: string): void {
        this.router.navigate(['professional/details', id]);
    }

    public async onRemove(event: Event, id: string) {
        event.stopPropagation();
        event.preventDefault();

        const alert = await this.alertController.create({
            header: 'Atenção',
            message: '<strong>O profissional será removido!</strong>',
            buttons: [
                {
                    text: 'CANCELAR',
                }, {
                    text: 'SIM',
                    handler: () => {
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

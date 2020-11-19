import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import 'firebase/firestore';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { IProfessional } from '../shared/professional.model';
import { ProfessionalService } from '../shared/professional.service';

@Component({
    selector: 'app-professional-list',
    templateUrl: './professional-list.page.html',
    styleUrls: ['./professional-list.page.scss'],
})
export class ProfessionalListPage implements OnInit {
    private createdProfessionalId: any;
    public professionalList: Observable<IProfessional[]>;

    constructor(
        public alertController: AlertController,
        private router: Router,
        private professionalService: ProfessionalService
    ) { }

    ngOnInit() {
        this.professionalList = this.professionalService.getAll();
    }

    public onAddProfessional(): void {
        this.router.navigate(['professional/create']);
    }

    public async onClick(e: any) {
        e.stopPropagation();
        e.preventDefault();
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
                    }

                }
            ]
        });
        await alert.present();
    }

    public onDelete(): void {
        this.professionalService
            .delete(this.createdProfessionalId)
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

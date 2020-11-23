import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import 'firebase/firestore';
import { take } from 'rxjs/operators';

import { IClient } from '../shared/client.model';
import { ClientService } from '../shared/client.service';

@Component({
    selector: 'app-client-list',
    templateUrl: './client-list.page.html',
    styleUrls: ['./client-list.page.scss'],
})
export class ClientListPage {
    public form: FormGroup;
    public clientList: IClient[];

    constructor(
        private alertController: AlertController,
        private router: Router,
        private clientService: ClientService
    ) { }

    public ionViewDidEnter(): void {
        this.updateClientList();
    }

    public onAdd(): void {
        this.router.navigate(['client/create']);
    }

    public onUpdate(id: string): void {
        this.router.navigate(['client/update', id]);
    }

    public onViewDetails(id: string): void {
        this.router.navigate(['client/details', id]);
    }

    public async onRemove(event: Event, id: string) {
        event.stopPropagation();
        event.preventDefault();

        const alert = await this.alertController.create({
            header: 'Atenção',
            message: '<strong>O client será removido!</strong>',
            buttons: [
                {
                    text: 'CANCELAR',
                }, {
                    text: 'SIM',
                    handler: () => {
                        this.deleteClient(id);
                        this.updateClientList();
                    }
                }
            ]
        });

        await alert.present();
    }

    private updateClientList(): void {
        this.clientService
            .getAll()
            .subscribe({
                next: (result) => {
                    this.clientList = result;
                }
            });
    }

    private deleteClient(id: string): void {
        this.clientService
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

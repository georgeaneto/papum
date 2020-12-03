import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import 'firebase/firestore';
import { take } from 'rxjs/operators';

import { IClient } from '../shared/client.model';
import { ClientService } from '../shared/client.service';

@Component({
    selector: 'app-client-details',
    templateUrl: './client-details.page.html',
    styleUrls: ['./client-details.page.scss'],
})
export class ClientDetailsPage implements OnInit {
    public client: IClient;

    constructor(
        public router: Router,
        public modalController: ModalController,
        private route: ActivatedRoute,
        private clientService: ClientService,
    ) { }

    public ngOnInit(): void {
        const clientId: string = this.route.snapshot.paramMap.get('id');
        this.clientService
            .getById(clientId)
            .pipe(take(1))
            .subscribe({
                next: (client) => {
                    this.client = client;
                }
            });
    }

    public dismiss() {
        this.modalController.dismiss({
            data: { passou: true },
            dismissed: true
        });
    }

    public back() {
        this.router.navigate(['client/list']);
    }
}

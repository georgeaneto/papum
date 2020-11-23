import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
}

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';

import 'firebase/firestore';
import { take } from 'rxjs/operators';

import { IProfessionalService } from '../shared/professional-services.model';
import { ProfessionalServicesService } from '../shared/professional-services.service';

@Component({
    selector: 'app-professional-services-details',
    templateUrl: './professional-services-details.page.html',
    styleUrls: ['./professional-services-details.page.scss'],
})
export class ProfessionalServicesDetailsPage implements OnInit {
    @Input() id: string;

    public service: IProfessionalService;

    constructor(
        private modalController: ModalController,
        private route: ActivatedRoute,
        private professionalService: ProfessionalServicesService,
    ) { }

    public ngOnInit(): void {
        const servicelId: string = this.route.snapshot.paramMap.get('id');
        this.professionalService
            .getById(servicelId ?? this.id)
            .pipe(take(1))
            .subscribe({
                next: (service) => {
                    this.service = service;
                }
            });
    }
}

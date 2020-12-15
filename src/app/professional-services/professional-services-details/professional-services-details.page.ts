import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import 'firebase/firestore';
import moment from 'moment';
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
    public fomatedTime: any;

    constructor(
        public modalController: ModalController,
        private route: ActivatedRoute,
        private router: Router,
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
                    this.fomatedTime = moment(this.service.time).format('HH:mm');
                }
            });
    }

    public back() {
        this.router.navigate(['professional-services/list']);
    }
}

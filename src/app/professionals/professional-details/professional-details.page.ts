import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import 'firebase/firestore';
import { take } from 'rxjs/operators';

import { IProfessional } from '../shared/professional.model';
import { ProfessionalService } from '../shared/professional.service';

@Component({
    selector: 'app-professional-details',
    templateUrl: './professional-details.page.html',
    styleUrls: ['./professional-details.page.scss'],
})
export class ProfessionalDetailsPage implements OnInit {
    @Input() id: string;

    public professional: IProfessional;

    constructor(
        private modalController: ModalController,
        private professionalService: ProfessionalService,
    ) { }

    public ngOnInit(): void {
        this.professionalService
            .getById(this.id)
            .pipe(take(1))
            .subscribe({
                next: (professional) => {
                    this.professional = professional;
                }
            });
    }

    public dismiss() {
        this.modalController.dismiss({
            data: { passou: true },
            dismissed: true
        });
    }
}

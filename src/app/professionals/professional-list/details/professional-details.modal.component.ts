import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import 'firebase/firestore';
import { take } from 'rxjs/operators';

import { IProfessional } from '../../shared/professional.model';
import { ProfessionalService } from '../../shared/professional.service';

@Component({
    templateUrl: './professional-details.modal.component.html',
    styleUrls: ['./professional-details.modal.component.scss'],
})
export class ProfessionalDetailsModalComponent implements OnInit {
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
            dismissed: true
        });
    }
}

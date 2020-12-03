import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';

import 'firebase/firestore';
import { take } from 'rxjs/operators';

import { AppointmentCreatePage } from '../../appointments/appointment-create/appointment-create.page';
import { IProfessionalService } from '../../professional-services/shared/professional-services.model';
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
        private route: ActivatedRoute,
        private professionalService: ProfessionalService,
        private navCtrl: NavController
    ) { }

    public ngOnInit(): void {
        const professionalId: string = this.route.snapshot.paramMap.get('id');
        this.professionalService
            .getById(professionalId ?? this.id)
            .pipe(take(1))
            .subscribe({
                next: (professional) => {
                    this.professional = professional;
                }
            });
    }

    public dismiss() {
        this.navCtrl.navigateBack('dashboard');
    }

    public onNewAppointment(professional: IProfessional, service: IProfessionalService) {
        this.presentModal(professional, service);
    }

    public async presentModal(professional: IProfessional, service: IProfessionalService) {
        const modal = await this.modalController.create({ component: AppointmentCreatePage, componentProps: { professional, service } });

        return await modal.present();
    }

}

import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { AppointmentCreatePage } from '../../../../appointments/appointment-create/appointment-create.page';
import { IProfessionalService } from '../../../../professional-services/shared/professional-services.model';
import { IProfessional } from '../../../shared/professional.model';

@Component({
    selector: 'app-professional-details-template',
    templateUrl: './professional-details-template.html',
    styleUrls: ['./professional-details-template.scss'],
})
export class ProfessionalDetailsTemplatePage {
    @Input() professional: IProfessional;

    constructor(
        private modalController: ModalController,
    ) { }

    public onNewAppointment(professional: IProfessional, service: IProfessionalService) {
        this.presentModal(professional, service);
    }

    public async presentModal(professional: IProfessional, service: IProfessionalService) {
        const modal = await this.modalController.create({ component: AppointmentCreatePage, componentProps: { professional, service } });

        return await modal.present();
    }
}

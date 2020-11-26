import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';

import moment from 'moment';
import { take } from 'rxjs/operators';

import { IProfessionalService } from '../../professional-services/shared/professional-services.model';
import { IProfessional } from '../../professionals/shared/professional.model';
import { IAppointment } from '../shared/appointment.model';
import { AppointmentService } from '../shared/appointment.service';

@Component({
    templateUrl: './appointment-create.page.html',
    styleUrls: ['./appointment-create.page.scss'],
})
export class AppointmentCreatePage implements OnInit {
    @Input() professional: IProfessional;
    @Input() service: IProfessionalService;

    public minDate: any;
    public maxDate: any;
    public minTime: any;

    public form: FormGroup;

    constructor(
        public fb: FormBuilder,
        private modalController: ModalController,
        private toastController: ToastController,
        private appointmentService: AppointmentService
    ) {
        this.minDate = moment().format('YYYY-MM-DD');
        this.maxDate = moment().add(2, 'w').format('YYYY-MM-DD');
        this.minTime = moment().format('HH:mm');
    }

    public ngOnInit(): void {
        this.form = this.fb.group({
            date: ['', [Validators.required]],
            time: ['', [Validators.required]]
        });
    }

    public dismiss() {
        this.modalController.dismiss({
            dismissed: true
        });
    }

    public saveAppointment(): void {
        if (!this.form.valid) { return; }

        const appointment = {
            professional: this.professional,
            service: this.service,
            date: moment(this.form.get('date').value).format('YYYY-MM-DD').toString(),
            time: moment(this.form.get('time').value).format('HH:mm').toString()
        } as IAppointment;

        this.appointmentService
            .create(appointment)
            .pipe(take(1))
            .subscribe({
                next: () => {
                    this.presentToast();
                    this.dismiss();
                }
            });
    }

    public async presentToast() {
        const toast = await this.toastController.create({
            message: 'Informações salvas com sucesso!',
            duration: 2000
        });
        toast.present();
    }
}

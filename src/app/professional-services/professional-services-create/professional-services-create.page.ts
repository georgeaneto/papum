import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';

import { take } from 'rxjs/operators';

import { ProfessionalServicesService } from '../shared/professional-services.service';

@Component({
    templateUrl: './professional-services-create.page.html',
    styleUrls: ['./professional-services-create.page.scss'],
})
export class ProfessionalServicesCreatePage {
    public form: FormGroup;

    constructor(
        public fb: FormBuilder,
        public navCtrl: NavController,
        private professionalServicesService: ProfessionalServicesService,
        private toastController: ToastController
    ) { }

    public submit(): void {
        if (!this.form.valid) { return; }

        this.professionalServicesService
            .create(this.form.value)
            .pipe(take(1))
            .subscribe({
                next: () => {
                    this.presentToast();

                    this.form.reset();
                    this.navCtrl.navigateBack('dashboard');
                },
                error: (error) => {
                    console.log(error);
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

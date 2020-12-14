import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController, NavController, ToastController } from '@ionic/angular';

@Component({
    templateUrl: './professional-services-create-modal.page.html',
    styleUrls: ['./professional-services-create-modal.page.scss'],
})
export class ProfessionalServicesCreateModalPage implements AfterViewInit {
    public form: FormGroup;

    constructor(
        public fb: FormBuilder,
        public navCtrl: NavController,
        public modalController: ModalController,
        private toastController: ToastController,
        private cdr: ChangeDetectorRef,
    ) { }

    public ngAfterViewInit() {
        this.cdr.detectChanges();
    }

    public submit(): void {
        if (!this.form.valid) { return; }

        this.modalController.dismiss({ submitted: true, service: this.form.value });
    }

    public dismiss() {
        this.modalController.dismiss({
            submitted: false
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

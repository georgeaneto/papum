import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { take } from 'rxjs/operators';

import { CategoryServices } from '../shared/professional-services.model';
import { ProfessionalServicesService } from '../shared/professional-services.service';

@Component({
    templateUrl: './professional-services-create.page.html',
    styleUrls: ['./professional-services-create.page.scss'],
})
export class ProfessionalServicesCreatePage implements OnInit {
    public form: FormGroup;
    public categoryList = [];
    public categoryServices = CategoryServices;

    constructor(
        public fb: FormBuilder,
        public navCtrl: NavController,
        private storage: Storage,
        private professionalServicesService: ProfessionalServicesService,
        private toastController: ToastController
    ) { }

    public ngOnInit(): void {
        this.form = this.fb.group({
            name: ['', [Validators.required]],
            description: ['', [Validators.required]],
            value: ['', [Validators.required]],
            time: ['', [Validators.required]],
            category: ['', [Validators.required]]
        });

        for (const item in CategoryServices) {
            if (isNaN(Number(item))) {
                this.categoryList.push(item);
            }
        }
    }

    public submit(): void {
        if (!this.form.valid) { return; }

        this.professionalServicesService
            .create(this.form.value)
            .pipe(take(1))
            .subscribe({
                next: (result) => {
                    this.presentToast();
                    //this.storage.set('professionalServiceCreatedID', result);

                    this.navCtrl.navigateBack('dashboard');
                    this.form.reset();

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

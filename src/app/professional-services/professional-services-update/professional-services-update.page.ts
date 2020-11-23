import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

import { take } from 'rxjs/operators';

import { CategoryServices, IProfessionalService } from '../shared/professional-services.model';
import { ProfessionalServicesService } from '../shared/professional-services.service';

@Component({
    templateUrl: './professional-services-update.page.html',
    styleUrls: ['./professional-services-update.page.scss'],
})
export class ProfessionalServicesUpdatePage implements OnInit {
    public form: FormGroup;
    public service: IProfessionalService;
    public categoryList = [];
    public categoryServices = CategoryServices;

    public get currentName(): string {
        return this.form.get('name').value;
    }

    constructor(
        public fb: FormBuilder,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        private router: Router,
        private route: ActivatedRoute,
        private professionalService: ProfessionalServicesService,
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

        const serviceId: string = this.route.snapshot.paramMap.get('id');
        this.professionalService
            .getById(serviceId)
            .pipe(take(1))
            .subscribe({
                next: (result: IProfessionalService) => {
                    this.service = result;
                    this.form.get('name').setValue(this.service.name);
                    this.form.get('description').setValue(this.service.description);
                    this.form.get('value').setValue(this.service.value);
                    this.form.get('time').setValue(this.service.time);
                    this.form.get('category').setValue(this.service.category);
                },
                error: (error) => {
                    console.log(error);
                }
            });
    }

    public submit(): void {
        if (!this.form.valid) { return; }

        this.professionalService
            .update(this.service.id, this.form.value)
            .pipe(take(1))
            .subscribe({
                next: () => {
                    this.presentToast();
                    this.router.navigate(['dashboard']);
                },
                error: (error) => {
                    console.log(error);
                }
            });
    }

    public onGetAll(): void {
        this.professionalService
            .getAll()
            .pipe(take(1))
            .subscribe({
                next: (result) => {
                    console.log(result);
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

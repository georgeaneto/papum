import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController, ToastController } from '@ionic/angular';

import moment from 'moment';

import { CategoryServices } from '../../shared/professional-services.model';
import { ProfessionalServicesService } from '../../shared/professional-services.service';

@Component({
    selector: 'app-professional-service-create-template',
    templateUrl: './professional-services-create-template.page.html',
    styleUrls: ['./professional-services-create-template.page.scss'],
})
export class ProfessionalServicesCreateTemplatePage implements OnInit {
    @Input() submitMethod: Function;
    @Input() form: FormGroup;

    @Output() formChange = new EventEmitter<FormGroup>();

    public categoryList = [];
    public categoryServices = CategoryServices;
    public minTime: any;

    constructor(
        public fb: FormBuilder,
        public navCtrl: NavController,
        public modalController: ModalController,
        public professionalServicesService: ProfessionalServicesService,
        private toastController: ToastController,
    ) {
        this.minTime = moment().format('HH:mm');
    }

    public ngOnInit(): void {
        this.form = this.fb.group({
            name: ['', [Validators.required]],
            description: ['', [Validators.required]],
            value: ['', [Validators.required]],
            time: ['', [Validators.required]],
            category: ['', [Validators.required]]
        });
        this.formChange.emit(this.form);

        for (const item in CategoryServices) {
            if (isNaN(Number(item))) {
                this.categoryList.push(item);
            }
        }
    }

    public async presentToast() {
        const toast = await this.toastController.create({
            message: 'Informações salvas com sucesso!',
            duration: 2000
        });
        toast.present();
    }
}

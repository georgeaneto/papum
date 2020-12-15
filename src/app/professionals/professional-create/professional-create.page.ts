import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CameraResultType, Plugins } from '@capacitor/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { AlertController, LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';

import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
import { take } from 'rxjs/operators';

import {
    ProfessionalServicesCreateModalPage,
} from '../../professional-services/professional-services-create/professional-services-create-modal.page';
import { IProfessionalService } from '../../professional-services/shared/professional-services.model';
import { ProfessionalServicesService } from '../../professional-services/shared/professional-services.service';
import { WeekDays } from '../shared/professional.model';
import { ProfessionalService } from '../shared/professional.service';
import { IViaCEP } from '../shared/viacep.model';
import { ViaCEPService } from '../shared/viacep.service';

const moment = extendMoment(Moment);
const { Camera } = Plugins;

@Component({
    selector: 'app-professional',
    templateUrl: './professional-create.page.html',
    styleUrls: ['./professional-create.page.scss'],
})
export class ProfessionalCreatePage implements OnInit {
    public form: FormGroup;
    public streetCurrentPosition: string;
    public avatar: any;
    public services: IProfessionalService[] = [];
    public monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    public weekDays = [
        { value: WeekDays.Domingo, string: 'Domingo' },
        { value: WeekDays.Segunda, string: 'Segunda' },
        { value: WeekDays.Terca, string: 'Terça' },
        { value: WeekDays.Quarta, string: 'Quarta' },
        { value: WeekDays.Quinta, string: 'Quinta' },
        { value: WeekDays.Sexta, string: 'Sexta' },
        { value: WeekDays.Sabado, string: 'Sabado' },
    ]
    public hourTimes: string[];
    public hourTimesEnd: string[];

    private readonly CEP_REGEX = /^\d{5}-\d{3}$/;
    private readonly HOUSENUMBER_REGEX = /^\d+\s-\s[\w\s]+$/;

    public get currentName(): string {
        return this.form.get('name').value;
    }

    constructor(
        public fb: FormBuilder,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public navCtrl: NavController,
        public toastController: ToastController,
        public modalController: ModalController,
        private professionalServicesService: ProfessionalServicesService,
        private viaCEPService: ViaCEPService,
        private router: Router,
        private professionalService: ProfessionalService,
        private geolocation: Geolocation,
    ) { }

    public ngOnInit(): void {
        this.form = this.fb.group({
            avatar: [''],
            name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            mobile: ['', [Validators.required]],
            descriptionWork: ['', [Validators.required]],
            attendanceType: [false],
            birthday: [''],
            weekDays: [''],
            services: this.fb.array([], [Validators.required]),
            cep: ['', [Validators.required]],
            houseNumber: [''],
            district: ['', [Validators.required]],
            state: ['', [Validators.required]],
            city: ['', [Validators.required]],
            street: ['', [Validators.required]],
            complement: [''],
            lat: ['', [Validators.required]],
            lng: ['', [Validators.required]],
            startHour: ['', [Validators.required]],
            endHour: ['', [Validators.required]],
        });

        this.hourTimes = this.fillHourTimes();
        this.hourTimesEnd = this.hourTimes;
    }

    public onChangeStartTime(event) {
        const selectedTime = event.detail.value;

        this.form.get('endHour').patchValue(undefined);
        this.hourTimesEnd = this.fillHourTimes(selectedTime);
    }

    public async getImage() {
        try {
            const selectedImg = await Camera.getPhoto({
                quality: 100,
                allowEditing: true,
                resultType: CameraResultType.Base64
            });

            this.avatar = 'data:image/jpeg;base64,' + selectedImg.base64String;
            this.form.get('avatar').patchValue(this.avatar);
        } catch (error) {
            console.error(error);
        }
    }

    public submit(): void {
        if (!this.form.valid) { return; }

        this.professionalService
            .create(this.form.value)
            .pipe(take(1))
            .subscribe({
                next: () => {
                    this.services.forEach((service) => {
                        this.createService(service);
                    })
                },
                error: (error) => {
                    console.log(error);
                }
            });
    }

    public async onSelectService() {
        const modal = await this.modalController.create({ component: ProfessionalServicesCreateModalPage });

        modal.onDidDismiss()
            .then((result) => {
                if (result.data?.submitted) {
                    this.services.push(result.data.service);
                    const control = this.form.get('services') as FormArray;
                    control.push(this.fb.control(result.data.service));
                }
            });

        return await modal.present();
    }

    public onSearchByCEP(): void {
        this.clearFormAddress();

        const cep: string = this.form.get('cep').value;
        if (cep === '') {
            this.getCurrentGeolocation();
        } else {
            this.getAddressByCep(this.removeDashFromCep(cep));
        }
    }

    private fillHourTimes(startHour?: string): string[] {
        const hour = startHour === undefined ? undefined : startHour.substring(0, 5);
        const range = moment.range(moment(`2020-01-01 ${ hour ?? '00:00' }`), moment('2020-01-01 23:30'));

        const hours = Array.from(range.by('minute', { step: 30, excludeEnd: true }));
        return hours.map(m => m.format('HH:mm A'))
    }

    private createService(service: IProfessionalService) {
        this.professionalServicesService
            .create(service)
            .pipe(take(1))
            .subscribe({
                next: () => {
                    this.presentToast();
                    this.form.reset();
                    this.router.navigate(['dashboard']);
                },
                error: (error) => {
                    console.log(error);
                }
            });
    }

    private async presentToast() {
        const toast = await this.toastController.create({
            message: 'Informações salvas com sucesso!',
            duration: 2000
        });
        toast.present();
    }

    private getCurrentGeolocation() {
        this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((pos: Geoposition) => {
            this.form.get('lat').patchValue(pos.coords.latitude);
            this.form.get('lng').patchValue(pos.coords.longitude);

            const geocoder = new google.maps.Geocoder();
            geocoder.geocode(
                { location: { lat: pos.coords.latitude, lng: pos.coords.longitude } },
                (
                    results: google.maps.GeocoderResult[],
                    status: google.maps.GeocoderStatus
                ) => {
                    if (status === 'OK') {
                        const fullAddress = results[0].formatted_address;
                        const splittedAddress = fullAddress.split(',');
                        if (splittedAddress[1].trim().match(this.HOUSENUMBER_REGEX)) {
                            this.form.get('houseNumber')
                                .patchValue(
                                    splittedAddress[1]
                                        .trim()
                                        .substring(0, splittedAddress[1].trim().indexOf(' '))
                                );
                        }

                        splittedAddress.forEach((split) => {
                            if (split.trim().match(this.CEP_REGEX)) {
                                this.getAddressByCep(this.removeDashFromCep(split));
                                return;
                            }
                        });
                    }
                }
            );
        });
    }

    private getAddressByCep(cep: string) {
        this.viaCEPService
            .get(cep)
            .pipe(take(1))
            .subscribe((viaCep: IViaCEP) => {
                this.form.get('cep').patchValue(viaCep.cep);
                this.form.get('district').patchValue(viaCep.bairro);
                this.form.get('state').patchValue(viaCep.uf);
                this.form.get('city').patchValue(viaCep.localidade);
                this.form.get('street').patchValue(viaCep.logradouro);
                this.form.get('complement').patchValue(viaCep.complemento);
            });
    }

    private clearFormAddress(): void {
        this.form.get('lat').patchValue('');
        this.form.get('lng').patchValue('');
        this.form.get('houseNumber').patchValue('');
        this.form.get('district').patchValue('');
        this.form.get('state').patchValue('');
        this.form.get('city').patchValue('');
        this.form.get('street').patchValue('');
        this.form.get('complement').patchValue('');
    }

    private removeDashFromCep(cep: string): string {
        return cep.trim().replace('-', '');
    }
}

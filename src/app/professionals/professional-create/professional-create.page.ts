import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraOptions, DestinationType } from '@ionic-native/camera/ngx';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { IProfessionalService } from '../../professional-services/shared/professional-services.model';
import { ProfessionalServicesService } from '../../professional-services/shared/professional-services.service';
import { ProfessionalService } from '../shared/professional.service';

@Component({
    selector: 'app-professional',
    templateUrl: './professional-create.page.html',
    styleUrls: ['./professional-create.page.scss'],
})
export class ProfessionalCreatePage implements OnInit {
    public form: FormGroup;
    public uploadPercent: Observable<number>;
    public downloadUrl: Observable<string>;
    public streetCurrentPosition: string;
    public professionalServiceModel: IProfessionalService;
    public professionalServicesList = [];
    public camera: Camera;
    public myphoto: String;
    public destinationType: DestinationType;
    private createdProfessionalId: any;

    public get currentName(): string {
        return this.form.get('name').value;
    }

    constructor(
        public fb: FormBuilder,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public navCtrl: NavController,
        private router: Router,
        private professionalService: ProfessionalService,
        private professionalServicesService: ProfessionalServicesService,
        private geolocation: Geolocation,
        public toastController: ToastController
    ) { }

    async getImage() {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            correctOrientation: true
        };
        try {
            const fileUri: string = await this.camera.getPicture(options);
            let file: string;

            file = fileUri.substring(fileUri.lastIndexOf('/') + 1, fileUri.lastIndexOf('?'));

            const path: string = fileUri.substring(0, fileUri.lastIndexOf('/'));

        } catch (error) {
            console.error(error);
        }
    }

    public ngOnInit(): void {
        this.form = this.fb.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.required]],
            mobile: ['', [Validators.required]],
            descriptionWork: ['', [Validators.required]],
            attendanceType: [''],
            birthday: [''],
            weekDays: [''],
            lat: ['', [Validators.required]],
            lng: ['', [Validators.required]],
            services: ['', [Validators.required]]

        });

        this.professionalServicesService
            .getAll()
            .pipe(take(1))
            .subscribe({
                next: (professionalServices: IProfessionalService[]) => {
                    this.professionalServicesList = professionalServices;
                }
            });
    }

    public submit(): void {
        if (!this.form.valid) { return; }
        console.log(this.form.value);

        this.professionalService
            .create(this.form.value)
            .pipe(take(1))
            .subscribe({
                next: () => {
                    this.presentToast();
                    this.form.reset();
                    this.router.navigate(['deashboard']);

                },
                error: (error) => {
                    console.log(error);
                }
            });
    }

    public onGetCurrentPosition(): void {
        this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((pos: Geoposition) => {
            this.form.get('lat').setValue(pos.coords.latitude);
            this.form.get('lng').setValue(pos.coords.longitude);

            const geocoder = new google.maps.Geocoder();

            geocoder.geocode(
                { location: { lat: pos.coords.latitude, lng: pos.coords.longitude } },
                (
                    results: google.maps.GeocoderResult[],
                    status: google.maps.GeocoderStatus
                ) => {
                    if (status === 'OK') {
                        this.streetCurrentPosition = results[0].formatted_address;
                    }
                }
            );
        });
    }

    public onGetByID(): void {
        this.professionalService
            .getById(this.createdProfessionalId)
            .pipe(take(1))
            .subscribe({
                next: (result) => {
                    this.presentToast();
                    console.log(result);
                },
                error: (error) => {
                    console.log(error);
                }
            });
    }

    public onUpdate(): void {
        this.professionalService
            .update(this.createdProfessionalId, this.form.value)
            .pipe(take(1))
            .subscribe({
                next: (result) => {
                    this.presentToast();
                    console.log(result);
                },
                error: (error) => {
                    console.log(error);
                }
            });
    }

    public onDelete(): void {
        this.professionalService
            .delete(this.createdProfessionalId)
            .pipe(take(1))
            .subscribe({
                next: (result) => {
                    this.presentToast();
                    console.log(result);
                },
                error: (error) => {
                    console.log(error);
                }
            });
    }


    public onGetServices(): void {
        this.professionalService
            .update(this.createdProfessionalId, this.form.value)
            .pipe(take(1))
            .subscribe({
                next: (result) => {
                    this.presentToast();
                    this.navCtrl.navigateBack('dashboard');
                    this.form.reset();
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { AlertController, LoadingController } from '@ionic/angular';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { IProfessional } from '../shared/professional.model';
import { ProfessionalService } from '../shared/professional.service';

@Component({
    templateUrl: './professional-update.page.html',
    styleUrls: ['./professional-update.page.scss'],
})
export class ProfessionalUpdatePage implements OnInit {
    public form: FormGroup;
    public uploadPercent: Observable<number>;
    public downloadUrl: Observable<string>;
    public streetCurrentPosition: string;
    public professional: IProfessional;

    public get currentName(): string {
        return this.form.get('name').value;
    }

    constructor(
        public fb: FormBuilder,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        private router: Router,
        private route: ActivatedRoute,
        private professionalService: ProfessionalService,
        private geolocation: Geolocation
    ) { }

    /*async openGalery() {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            correctOrientation: true
        };
        try {
            const fileUri: string = await this.camera.getPicture(options);
            let file: string;

            if (this.platform.is('ios')) {
                file = fileUri.split('/').pop();
            } else {
                file = fileUri.substring(fileUri.lastIndexOf('/') + 1, fileUri.lastIndexOf('?'))
            }

            const path: string = fileUri.substring(0, fileUri.lastIndexOf('/'));

            const buffer: ArrayBuffer = await this.file.readAsArrayBuffer(path, file);

            const blob: Blob = new Blob([buffer], { type: 'image/jpeg' });

            this.uploadPicture(blob);
        } catch (error) {
            console.error(error);
        }
    }

    public uploadPicture(blob: Blob) {
        const ref = this.afStorage.ref('ionic.jpg');
        const task = ref.put(blob);

        this.uploadPercent = task.percentageChanges();

        task.snapshotChanges().pipe(
            finalize(() => this.downloadUrl = ref.getDownloadURL())
        ).subscribe();
    }*/

    public ngOnInit(): void {
        this.form = this.fb.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            mobile: ['', [Validators.required]],
            descriptionWork: ['', [Validators.required]],
            attendanceType: [''],
            birthday: [''],
            weekDays: [''],
            lat: ['', [Validators.required]],
            lng: ['', [Validators.required]]
        });

        const professionalId: string = this.route.snapshot.paramMap.get('id');
        this.professionalService
            .getById(professionalId)
            .pipe(take(1))
            .subscribe({
                next: (result: IProfessional) => {
                    this.professional = result;
                    this.updateStreetPosition(result.lat, result.lng);

                    this.form.get('name').setValue(this.professional.name);
                    this.form.get('email').setValue(this.professional.email);
                    this.form.get('mobile').setValue(this.professional.mobile);
                    this.form.get('descriptionWork').setValue(this.professional.descriptionWork);
                    this.form.get('attendanceType').setValue(this.professional.attendanceType);
                    this.form.get('birthday').setValue(this.professional.birthday);
                    this.form.get('weekDays').setValue(this.professional.weekDays);
                    this.form.get('lat').setValue(this.professional.lat);
                    this.form.get('lng').setValue(this.professional.lng);
                },
                error: (error) => {
                    console.log(error);
                }
            });
    }

    public submit(): void {
        if (!this.form.valid) { return; }

        this.professionalService
            .update(this.professional.id, this.form.value)
            .pipe(take(1))
            .subscribe({
                next: () => {
                    this.router.navigate(['../']);
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

    public onGetCurrentPosition(): void {
        this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((pos: Geoposition) => {
            this.form.get('lat').setValue(pos.coords.latitude);
            this.form.get('lng').setValue(pos.coords.longitude);

            this.updateStreetPosition(pos.coords.latitude, pos.coords.longitude);
        });
    }

    private updateStreetPosition(lat: number, lng: number): void {
        const geocoder = new google.maps.Geocoder();

        geocoder.geocode(
            { location: { lat, lng } },
            (
                results: google.maps.GeocoderResult[],
                status: google.maps.GeocoderStatus
            ) => {
                if (status === 'OK') {
                    this.streetCurrentPosition = results[0].formatted_address;
                }
            }
        );
    }
}

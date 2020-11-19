import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { ProfessionalService } from '../shared/professional.service';

@Component({
    selector: 'app-professional',
    templateUrl: './professional-create.page.html',
    styleUrls: ['./professional-create.page.scss'],
})
export class ProfessionalCreatePage implements OnInit {
    public form: FormGroup;
    private createdProfessionalId: any;
    public uploadPercent: Observable<number>;
    public downloadUrl: Observable<string>;

    constructor(
        public fb: FormBuilder,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        private router: Router,
        private professionalService: ProfessionalService,
        /*private camera: Camera,
        private sms: SMS,
        private platform: Platform,
        private file: File,
        private afStorage: AngularFireStorage*/
    ) {
    }

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
            attendanceType: ['', [Validators.required]],
            birthday: ['', [Validators.required]]
        });
    }

    public submit(): void {
        if (!this.form.valid) { return; }

        this.professionalService
            .create(this.form.value)
            .pipe(take(1))
            .subscribe({
                next: (result) => {
                    console.log(result);
                    this.createdProfessionalId = result;
                    this.router.navigate(['../']);
                    // this.sms.send('49999132197', 'Hello world!');
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

    public onGetByID(): void {
        this.professionalService
            .getById(this.createdProfessionalId)
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

    public onUpdate(): void {
        this.professionalService
            .update(this.createdProfessionalId, this.form.value)
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

    public onDelete(): void {
        this.professionalService
            .delete(this.createdProfessionalId)
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
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CameraResultType, Plugins } from '@capacitor/core';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';

import { take } from 'rxjs/operators';

import { ClientService } from '../shared/client.service';

const { Camera } = Plugins;

@Component({
    selector: 'app-client',
    templateUrl: './client-create.page.html',
    styleUrls: ['./client-create.page.scss'],
})
export class ClientCreatePage implements OnInit {
    public form: FormGroup;
    private createdClientId: any;
    public avatar: any;
    public monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    constructor(
        public fb: FormBuilder,
        private clientService: ClientService,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public navCtrl: NavController,
        private router: Router,
        public toastController: ToastController
    ) {
    }

    public ngOnInit(): void {
        this.form = this.fb.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            mobile: ['', [Validators.required, Validators.maxLength(9)]],
            birthday: [''],
            weekDays: [''],
            avatar: [''],
        });
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

        this.clientService
            .create(this.form.value)
            .pipe(take(1))
            .subscribe({
                next: (result) => {
                    this.presentToast();
                    this.form.reset();
                    this.router.navigate(['deashboard']);
                    console.log(result);
                    this.createdClientId = result;
                },
                error: (error) => {
                    console.log(error);
                }
            });
    }

    public onGetAll(): void {
        this.clientService
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
        this.clientService
            .getById(this.createdClientId)
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
        this.clientService
            .update(this.createdClientId, this.form.value)
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
        this.clientService
            .delete(this.createdClientId)
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

import { take } from 'rxjs/operators';

import { IClient } from '../shared/client.model';
import { ClientService } from '../shared/client.service';

@Component({
    templateUrl: './client-update.page.html',
    styleUrls: ['./client-update.page.scss'],
})
export class ClientUpdatePage implements OnInit {
    public form: FormGroup;
    public client: IClient;



    constructor(
        public fb: FormBuilder,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        private router: Router,
        private route: ActivatedRoute,
        private clientService: ClientService,
        private toastController: ToastController

    ) { }

    public ngOnInit(): void {
        this.form = this.fb.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            mobile: ['', [Validators.required]],
            birthday: ['', [Validators.required]],
        });

        const clientId: string = this.route.snapshot.paramMap.get('id');
        this.clientService
            .getById(clientId)
            .pipe(take(1))
            .subscribe({
                next: (result: IClient) => {
                    this.client = result;

                    this.form.get('name').setValue(this.client.name);
                    this.form.get('email').setValue(this.client.email);
                    this.form.get('mobile').setValue(this.client.mobile);
                    this.form.get('birthday').setValue(this.client.birthday);
                },
                error: (error) => {
                    console.log(error);
                }
            });
    }

    public submit(): void {
        if (!this.form.valid) { return; }

        this.clientService
            .update(this.client.id, this.form.value)
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

    public async presentToast() {
        const toast = await this.toastController.create({
            message: 'Informações salvas com sucesso!',
            duration: 2000
        });
        toast.present();
    }


}

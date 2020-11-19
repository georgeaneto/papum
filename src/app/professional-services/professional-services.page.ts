import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { take } from 'rxjs/operators';

import { ProfessionalServicesService } from './shared/professional-services.service';

@Component({
    selector: 'app-professional-services',
    templateUrl: './professional-services.page.html',
    styleUrls: ['./professional-services.page.scss'],
})
export class ProfessionalServicesPage implements OnInit {
    public form: FormGroup;
    private createdServiceId: any;

    constructor(
        public fb: FormBuilder,
        private professionalServicesService: ProfessionalServicesService
    ) { }

    public ngOnInit(): void {
        this.form = this.fb.group({
            name: ['', [Validators.required]],
            description: ['', [Validators.required]],
            value: ['', [Validators.required]],
            time: ['', [Validators.required]]
        });
    }

    public submit(): void {
        if (!this.form.valid) { return; }

        this.professionalServicesService
            .create(this.form.value)
            .pipe(take(1))
            .subscribe({
                next: (result) => {
                    console.log(result);
                    this.createdServiceId = result;
                },
                error: (error) => {
                    console.log(error);
                }
            });
    }

    public onGetAll(): void {
        this.professionalServicesService
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
        this.professionalServicesService
            .getById(this.createdServiceId)
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
        this.professionalServicesService
            .update(this.createdServiceId, this.form.value)
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
        this.professionalServicesService
            .delete(this.createdServiceId)
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

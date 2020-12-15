import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';

import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
import { take } from 'rxjs/operators';

import { IProfessionalService } from '../../professional-services/shared/professional-services.model';
import { IProfessional } from '../../professionals/shared/professional.model';
import { IAppointment } from '../shared/appointment.model';
import { AppointmentService } from '../shared/appointment.service';

const moment = extendMoment(Moment);

@Component({
    templateUrl: './appointment-create.page.html',
    styleUrls: ['./appointment-create.page.scss'],
})
export class AppointmentCreatePage implements OnInit {
    @Input() professional: IProfessional;
    @Input() service: IProfessionalService;

    public minDate: any;
    public maxDate: any;
    public selectedDate = new Date();
    public hourTimes: string[];
    public appointments: IAppointment[]

    public form: FormGroup;

    public datePickerObj: any = {
        inputDate: null,
        fromDate: null,
        toDate: null,
        showTodayButton: true, // default true
        closeOnSelect: false, // default false
        disableWeekDays: [],
        mondayFirst: false, // default false
        setLabel: 'Selecionar',
        todayLabel: 'Hoje',
        closeLabel: 'Fechar',
        titleLabel: 'Selecione uma data',
        monthsList: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
        weeksList: ["D", "S", "T", "Q", "Q", "S", "S"],
        dateFormat: 'YYYY-MM-DD',
        clearButton: false,
        momentLocale: 'pt-BR',
        yearInAscending: true,
        btnCloseSetInReverse: false,
        btnProperties: {
            expand: 'block', // Default 'block'
            fill: '', // Default 'solid'
            size: '', // Default 'default'
            disabled: '', // Default false
            strong: '', // Default false
            color: '' // Default ''
        },
        arrowNextPrev: {
            nextArrowSrc: 'assets/img/chevron-forward-outline.svg',
            prevArrowSrc: 'assets/img/chevron-back-outline.svg'
        }, // This object supports only SVG files.
    };

    constructor(
        public fb: FormBuilder,
        public route: Router,
        private modalController: ModalController,
        private toastController: ToastController,
        private appointmentService: AppointmentService,
    ) { }

    public ngOnInit(): void {
        this.minDate = moment().format('YYYY-MM-DD');
        this.maxDate = moment().add(4, 'w').format('YYYY-MM-DD');
        this.datePickerObj.fromDate = this.minDate;
        this.datePickerObj.toDate = this.maxDate;
        this.datePickerObj.disableWeekDays = [0, 1, 2, 3, 4, 5, 6].filter(day => !this.professional.weekDays.includes(day));

        this.form = this.fb.group({
            date: [this.minDate, [Validators.required]],
            time: ['', [Validators.required]]
        });

        this.appointmentService
            .getAll()
            .pipe(take(1))
            .subscribe({
                next: (appointments: IAppointment[]) => {
                    this.appointments = appointments;
                    this.removeHoursWithAppointment();
                }
            })

    }

    public onDateChange(event) {
        const date = event.detail.value;
        const isValidDate = moment(date).isValid();
        this.form.get('date').patchValue(isValidDate ? date : null);
        this.form.get('time').patchValue(undefined);
        this.removeHoursWithAppointment();
    }

    public dismiss() {
        this.modalController.dismiss({
            dismissed: true
        });
    }

    public saveAppointment(): void {
        if (!this.form.valid) { return; }

        const appointment = {
            professional: this.professional,
            service: this.service,
            date: moment(this.form.get('date').value).format('YYYY-MM-DD').toString(),
            time: this.form.get('time').value.toString()
        } as IAppointment;

        this.appointmentService
            .create(appointment)
            .pipe(take(1))
            .subscribe({
                next: () => {
                    this.presentToast();
                    this.dismiss();
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

    private fillHourTimes(): string[] {
        const range = moment.range(moment(`2020-01-01 ${ this.professional.startHour.substring(0, 5) }`), moment(`2020-01-01 ${ this.professional.endHour.substring(0, 5) }`));

        const hours = Array.from(range.by('minute', { step: 30, excludeEnd: true }));
        return hours.map(m => m.format('HH:mm A'))
    }

    private removeHoursWithAppointment() {
        this.hourTimes = this.fillHourTimes().filter(hour => {
            return !this.appointments.some((appointment) => appointment.time === hour && appointment.date === this.form.get('date').value);
        });
    }
}

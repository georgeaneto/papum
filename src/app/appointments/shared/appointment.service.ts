import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';

import { IAppointment } from './appointment.model';

@Injectable({
    providedIn: 'root'
})
export class AppointmentService {
    private readonly COLLECTION_NAME = 'appointments';

    constructor(public firestore: AngularFirestore) { }

    public create(appointment: IAppointment): Observable<string> {
        const id = this.firestore.createId();

        this.firestore.doc<IAppointment>(`${ this.COLLECTION_NAME }/${ id }`).set({
            id,
            professional: appointment.professional,
            service: appointment.service,
            date: appointment.date,
            time: appointment.time,
        });

        return of(id);
    }

    public getById(id: string): Observable<IAppointment> {
        return this.firestore.collection<IAppointment>(this.COLLECTION_NAME).doc(id).valueChanges();
    }

    public getAll(): Observable<IAppointment[]> {
        return this.firestore.collection<IAppointment>(this.COLLECTION_NAME).valueChanges();
    }

    public update(id: string, appointment: IAppointment): Observable<boolean> {
        this.firestore.doc<IAppointment>(`${ this.COLLECTION_NAME }/${ id }`).update({
            id,
            professional: appointment.professional,
            service: appointment.service,
            date: appointment.date,
            time: appointment.time,
        });

        return of(true);
    }

    public delete(id: string): Observable<boolean> {
        this.firestore.doc<IAppointment>(`${ this.COLLECTION_NAME }/${ id }`).delete();

        return of(true);
    }
}

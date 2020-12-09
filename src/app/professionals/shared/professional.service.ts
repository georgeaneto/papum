import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';

import { IProfessional } from './professional.model';

@Injectable({
    providedIn: 'root'
})
export class ProfessionalService {
    private readonly COLLECTION_NAME = 'professionals';

    constructor(public firestore: AngularFirestore) { }

    public create(professional: IProfessional): Observable<string> {
        const id = this.firestore.createId();

        this.firestore.doc<IProfessional>(`${ this.COLLECTION_NAME }/${ id }`).set({
            id,
            name: professional.name,
            email: professional.email,
            mobile: professional.mobile,
            descriptionWork: professional.descriptionWork,
            attendanceType: professional.attendanceType,
            birthday: professional.birthday,
            weekDays: professional.weekDays,
            lat: professional.lat,
            lng: professional.lng,
            services: professional.services,
            avatar: professional.avatar,
            cep: professional.cep,
            houseNumber: professional.houseNumber,
            district: professional.district,
            state: professional.state,
            city: professional.city,
            street: professional.street,
            complement: professional.complement,
        });

        return of(id);
    }

    public getById(id: string): Observable<IProfessional> {
        return this.firestore.collection<IProfessional>(this.COLLECTION_NAME).doc(id).valueChanges();
    }

    public getAll(): Observable<IProfessional[]> {
        return this.firestore.collection<IProfessional>(this.COLLECTION_NAME).valueChanges();
    }

    public update(id: string, professional: IProfessional): Observable<boolean> {
        this.firestore.doc<IProfessional>(`${ this.COLLECTION_NAME }/${ id }`).update({
            id,
            name: professional.name,
            email: professional.email,
            mobile: professional.mobile,
            descriptionWork: professional.descriptionWork,
            attendanceType: professional.attendanceType,
            birthday: professional.birthday,
            weekDays: professional.weekDays
        });

        return of(true);
    }

    public delete(id: string): Observable<boolean> {
        this.firestore.doc<IProfessional>(`${ this.COLLECTION_NAME }/${ id }`).delete();

        return of(true);
    }
}

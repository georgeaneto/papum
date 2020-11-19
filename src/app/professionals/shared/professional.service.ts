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

    public create(service: IProfessional): Observable<string> {
        const id = this.firestore.createId();

        this.firestore.doc<IProfessional>(`${ this.COLLECTION_NAME }/${ id }`).set({
            id,
            name: service.name,
            email: service.email,
            mobile: service.mobile,
            descriptionWork: service.descriptionWork,
            attendanceType: service.attendanceType,
            birthday: service.birthday,
        });

        return of(id);
    }

    public getById(id: string): Observable<IProfessional> {
        return this.firestore.collection<IProfessional>(this.COLLECTION_NAME).doc(id).valueChanges();
    }

    public getAll(): Observable<IProfessional[]> {
        return this.firestore.collection<IProfessional>(this.COLLECTION_NAME).valueChanges();

    }

    public update(id: string, service: IProfessional): Observable<boolean> {
        this.firestore.doc<IProfessional>(`${ this.COLLECTION_NAME }/${ id }`).update({
            id,
            name: service.name,
            email: service.email,
            mobile: service.mobile,
            descriptionWork: service.descriptionWork,
            attendanceType: service.attendanceType,
            birthday: service.birthday,
        });

        return of(true);
    }

    public delete(id: string): Observable<boolean> {
        this.firestore.doc<IProfessional>(`${ this.COLLECTION_NAME }/${ id }`).delete();

        return of(true);
    }
}

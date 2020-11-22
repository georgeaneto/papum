import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';

import { IProfessionalService } from './professional-services.model';

@Injectable({
    providedIn: 'root'
})
export class ProfessionalServicesService {
    private readonly COLLECTION_NAME = 'professional-services';

    constructor(public firestore: AngularFirestore) { }

    public create(service: IProfessionalService): Observable<string> {
        const id = this.firestore.createId();

        this.firestore.doc<IProfessionalService>(`${ this.COLLECTION_NAME }/${ id }`).set({
            id,
            name: service.name,
            description: service.description,
            value: service.value,
            time: service.time,
            category: service.category
        });

        return of(id);
    }

    public getById(id: string): Observable<IProfessionalService> {
        return this.firestore.collection<IProfessionalService>(this.COLLECTION_NAME).doc(id).valueChanges();
    }

    public getAll(): Observable<IProfessionalService[]> {
        return this.firestore.collection<IProfessionalService>(this.COLLECTION_NAME).valueChanges();
    }

    public update(id: string, service: IProfessionalService): Observable<boolean> {
        this.firestore.doc<IProfessionalService>(`${ this.COLLECTION_NAME }/${ id }`).update({
            id,
            name: service.name,
            description: service.description,
            value: service.value,
            time: service.time,
        });

        return of(true);
    }

    public delete(id: string): Observable<boolean> {
        this.firestore.doc<IProfessionalService>(`${ this.COLLECTION_NAME }/${ id }`).delete();

        return of(true);
    }
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';

import { IClient } from './client.model';

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    private readonly COLLECTION_NAME = 'clients';

    constructor(public firestore: AngularFirestore) { }

    public create(client: IClient): Observable<string> {
        const id = this.firestore.createId();

        this.firestore.doc<IClient>(`${ this.COLLECTION_NAME }/${ id }`).set({
            id,
            name: client.name,
            email: client.email,
            mobile: client.mobile,
            birthday: client.birthday,
        });

        return of(id);
    }

    public getById(id: string): Observable<IClient> {
        return this.firestore.collection<IClient>(this.COLLECTION_NAME).doc(id).valueChanges();
    }

    public getAll(): Observable<IClient[]> {
        return this.firestore.collection<IClient>(this.COLLECTION_NAME).valueChanges();

    }

    public update(id: string, client: IClient): Observable<boolean> {
        this.firestore.doc<IClient>(`${ this.COLLECTION_NAME }/${ id }`).update({
            name: client.name,
            email: client.email,
            mobile: client.mobile,
            birthday: client.birthday,
        });

        return of(true);
    }

    public delete(id: string): Observable<boolean> {
        this.firestore.doc<IClient>(`${ this.COLLECTION_NAME }/${ id }`).delete();

        return of(true);
    }
}

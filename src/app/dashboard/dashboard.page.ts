import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { GoogleMapOptions, Marker } from '@ionic-native/google-maps/ngx';
import { LoadingController, ModalController, Platform } from '@ionic/angular';

import { google } from 'google-maps';
import { take } from 'rxjs/operators';

import { ProfessionalDetailsModalComponent } from '../professionals/professional-list/details/professional-details.modal.component';
import { IProfessional } from '../professionals/shared/professional.model';
import { ProfessionalService } from '../professionals/shared/professional.service';

declare var google: google;

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
    public map;
    public markers: google.maps.Marker[] = [];
    public professionalList: IProfessional[];
    public originMarker: Marker;
    public points = [];
    public myLocation: any;
    public slidesOption: any = {
        slidesPerView: 3,
        freemode: true,
        initialSlide: 1,
        speed: 400,
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        }
    };

    @ViewChild('map', { static: false }) mapElement: ElementRef;

    constructor(
        public modalController: ModalController,
        public loadingController: LoadingController,
        public platform: Platform,
        private professionalService: ProfessionalService,
        private geolocation: Geolocation,
    ) { }

    public ngOnInit(): void {
        this.presentLoading();
        this.loadMap();
    }

    public ionViewDidEnter() {
        this.clearMarkers();
        this.loadProfessionals();
    }

    public async loadMap() {
        this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((pos: Geoposition) => {
            this.myLocation = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
            const mapOptions: GoogleMapOptions = {
                mapId: '1b0909baf9c5b265',
                center: this.myLocation,
                zoom: 14,
                disableDefaultUI: true,
                streetViewControl: false,
                fullscreenControl: false,
                scaleControl: true,
                zoomControl: false,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.LARGE
                }
            };

            this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
            const _ = new google.maps.Marker({
                map: this.map,
                animation: google.maps.Animation.DROP,
                position: this.myLocation,
                icon: 'assets/img/pin.png',
                title: 'Minha posição',
            });
        }).catch((error) => {
            console.log('Error getting location', error);
        });
    }

    public loadProfessionals(): void {
        this.professionalService
            .getAll()
            .pipe(take(1))
            .subscribe({
                next: (professionals: IProfessional[]) => {
                    this.professionalList = professionals;
                }
            });
    }

    public onFilterMarkers(event?: any) {
        const value: string = event?.detail.value ?? '';
        this.clearMarkers();
        this.professionalList
            .filter((professional: IProfessional) => {
                return professional.name.toLowerCase().trim().includes(value.toLowerCase().trim()) ||
                    professional.services.some((service) => {
                        return service.name.toLowerCase().trim().includes(value.toLowerCase().trim());
                    });
            })
            .forEach((professional: IProfessional) => {
                this.addMarker(professional);
            });
    }

    private addMarker(professional: IProfessional) {
        const latLng = new google.maps.LatLng(professional.lat, professional.lng);
        const marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: latLng,
        });

        marker.addListener('click', () => {
            this.presentModal(professional.id);
        });

        this.markers.push(marker);
    }

    public async presentModal(id: string) {
        const modal = await this.modalController.create({ component: ProfessionalDetailsModalComponent, componentProps: { id } });

        modal.onDidDismiss()
            .then((data) => {
                console.log(data);
            });

        return await modal.present();
    }

    public calculateDistance(lat: number, lng: number): number {
        return google.maps.geometry.spherical.computeDistanceBetween(
            this.myLocation, new google.maps.LatLng(lat, lng)) / 1000;
    }

    private setMapOnAll(map: google.maps.Map | null) {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(map);
        }
    }

    private clearMarkers() {
        this.setMapOnAll(null);
    }

    private async presentLoading() {
        const loading = await this.loadingController.create({
            cssClass: 'my-custom-class',
            message: 'Por favor aguarde...',
            duration: 2000
        });

        await loading.present();

        await loading.onDidDismiss();
    }
}

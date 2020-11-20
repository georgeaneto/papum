import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { GoogleMapOptions } from '@ionic-native/google-maps/ngx';

import { google } from 'google-maps';

import { ProfessionalService } from '../professionals/shared/professional.service';

declare var google: google;

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
    public map: any;

    @ViewChild('map', { static: false }) mapElement: ElementRef;

    constructor(
        private professionalService: ProfessionalService,
        private geolocation: Geolocation
    ) { }

    public ngOnInit(): void {
        this.loadMap();
    }

    public loadMap() {
        this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((pos: Geoposition) => {
            const latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
            console.log(pos);
            const mapOptions: GoogleMapOptions = {
                mapId: '1b0909baf9c5b265',
                center: latLng,
                zoom: 15,
                disableDefaultUI: true,
                streetViewControl: false,
                fullscreenControl: false,
                scaleControl: true,
                zoomControl: true,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.LARGE
                },
            };

            this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

            this.addMarker(pos);

        }).catch((error) => {
            console.log('Error getting location', error);
        });
    }

    public addMarker(pos: Geoposition) {
        const latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        const marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: latLng
        });

        const content = '<p>This is your current position !</p>';
        const infoWindow = new google.maps.InfoWindow({
            content
        });

        google.maps.event.addListener(marker, 'click', () => {
            infoWindow.open(this.map, marker);
        });
    }
}

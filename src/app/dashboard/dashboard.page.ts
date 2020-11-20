import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';

declare var google;

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
    public map: any;
    public address: string;

    public latitude: number;
    public longitude: number;

    @ViewChild('map', { static: false }) mapElement: ElementRef;

    constructor(
        private geolocation: Geolocation,
        private nativeGeocoder: NativeGeocoder) {
    }

    public ngOnInit(): void {
        this.loadMap();
    }

    public loadMap() {
        this.geolocation.getCurrentPosition().then((resp) => {

            this.latitude = resp.coords.latitude;
            this.longitude = resp.coords.longitude;

            const latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
            const mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

            this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

            this.map.addListener('dragend', () => {

                this.latitude = this.map.center.lat();
                this.longitude = this.map.center.lng();

                this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
            });

        }).catch((error) => {
            console.log('Error getting location', error);
        });
    }

    public getAddressFromCoords(lattitude, longitude) {
        const options: NativeGeocoderOptions = {
            useLocale: true,
            maxResults: 5
        };

        this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
            .then((result: NativeGeocoderResult[]) => {
                this.address = '';
                const responseAddress = [];
                for (const [key, value] of Object.entries(result[0])) {
                    if (value.length > 0) {
                        responseAddress.push(value);
                    }
                }
                responseAddress.reverse();
                for (const value of responseAddress) {
                    this.address += value + ', ';
                }
                this.address = this.address.slice(0, -2);
            })
            .catch((error: any) => {
                this.address = 'Address Not Available!';
            });
    }
}

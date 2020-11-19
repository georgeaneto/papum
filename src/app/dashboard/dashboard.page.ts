import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GoogleMap, GoogleMapOptions, GoogleMaps } from '@ionic-native/google-maps/ngx';
import { NavController } from '@ionic/angular';

declare var google;

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {
    public map: GoogleMap;
    public geolocation: Geolocation;
    public navCtlr: NavController;

    constructor() { }

    public ionViewDidLoad() {
        this.loadMap();
    }

    loadMap() {
        const mapOptions: GoogleMapOptions = {
            camera: {
                target: {
                    lat: -23.1894908,
                    lng: -45.9330525
                },
                zoom: 14,
                tilt: 0
            },
            controls: {
                mapToolbar: false,
                myLocationButton: true,
            }
        };

        this.map = GoogleMaps.create('map_canvas', mapOptions);
    }


    // marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
    // alert('clicked');
    // });
}

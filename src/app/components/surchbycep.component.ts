import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';

@Component({
    selector: 'surchbycepcomponent-root',
    templateUrl: 'surchbycepcomponent.component.html',
    styleUrls: ['surchbycepcomponent.component.scss']
})
export class SurchByCepComponent implements OnInit {
    constructor(
        private router: Router,
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar
    ) {
        this.initializeApp();
    }

    public ngOnInit(): void {
        this.router.navigate(['']);
    }

    public initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

}

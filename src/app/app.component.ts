import { Component } from '@angular/core';

import { Platform, IonMenu } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  onLogout(ionMenu: IonMenu) {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }

}


// Components to use
/*
- datetime
- infinitescroll
- avatar
- popover (top right options)
- progress bar
- range
- reorder
- slides

Features:
- filter
- share
- call
- selected side menu highlight
- one time tutorial
- dialer open for call from app
- corner option (three dots)
- fab with option list
- Calendar

Native Features:
// To be listed from capacitor && IONIC docs
*/

import { Component } from '@angular/core';
import { Capacitor, Plugins } from '@capacitor/core';
import { Platform, IonMenu } from '@ionic/angular';
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
    private authService: AuthService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (Capacitor.isPluginAvailable('SplashScreen')) {
        Plugins.SplashScreen.hide();
      }
    });
  }

  onLogout(ionMenu: IonMenu) {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }

}


// Components to use
/*
- infinitescroll
- avatar
- popover (top right options)
- progress bar
- range
- reorder
- slides

Features:
- dark mode
- calendar
- share
- call
- selected side menu highlight
- dialer open for call from app
- fab with option list

Native Features:
// To be listed from capacitor && IONIC docs
*/

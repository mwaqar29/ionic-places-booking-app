import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  // isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  async onLogin() {
    // this.isLoading = true;

    const loader = await this.loadingController.create({
      keyboardClose: true,
      message: 'Logging In'
    });
    await loader.present();
    setTimeout(() => {
      // this.isLoading = false;
      this.router.navigateByUrl('/places/discover');
      loader.dismiss();
    }, 1500);

    this.authService.login();
  }


}

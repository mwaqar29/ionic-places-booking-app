import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookingService } from './bookings.service';
import { BookingModel } from './bookings.model';
import { IonItemSliding, AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {
  bookings: BookingModel[];
  private bookingSub: Subscription;

  constructor(
    private bookingService: BookingService,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.bookingSub = this.bookingService.bookings.subscribe(bookings => {
      this.bookings = bookings;
    });
    console.log(this.bookings);
  }

  ngOnDestroy() {
    if (this.bookingSub) {
      this.bookingSub.unsubscribe();
    }
  }

  // onEdit(bookingId: string, slidingItem: IonItemSliding) {
  //   slidingItem.close();
  //   this.router.navigate(['/', 'bookings', 'edit', bookingId]);
  //   console.log(bookingId);
  // }

  async onDeletePresentAlert(bookingId: string, slidingItem: IonItemSliding) {
    const alert = await this.alertController.create({
      header: 'Cancel Booking',
      message: 'Are you sure you want to cancel this booking ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            slidingItem.close();
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.loadingController.create({
              message: 'Cancelling...'
            }).then(loadingEl => {
              loadingEl.present();
              this.bookingService.cancelBooking(bookingId).subscribe(() => loadingEl.dismiss());
            });
            slidingItem.close();
          }
        }
      ]
    });

    await alert.present();
  }

}

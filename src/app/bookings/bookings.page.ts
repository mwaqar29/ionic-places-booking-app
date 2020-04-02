import { Component, OnInit } from '@angular/core';
import { BookingService } from './bookings.service';
import { BookingModel } from './bookings.model';
import { IonItemSliding, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  bookings: BookingModel[];

  constructor(
    private bookingService: BookingService,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.bookings = this.bookingService.bookings;
    console.log(this.bookings);
  }

  // onEdit(bookingId: string, slidingItem: IonItemSliding) {
  //   slidingItem.close();
  //   this.router.navigate(['/', 'bookings', 'edit', bookingId]);
  //   console.log(bookingId);
  // }

  async onDeletePresentAlert(bookingId: string, slidingItem: IonItemSliding) {
    const alert = await this.alertController.create({
      header: 'Delete Booking',
      message: 'Are you sure you want to delete this booking ?',
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
            this.bookings = this.bookings.filter((booking) => {
              return bookingId !== booking.id;
            });
            slidingItem.close();
          }
        }
      ]
    });

    await alert.present();
  }

}

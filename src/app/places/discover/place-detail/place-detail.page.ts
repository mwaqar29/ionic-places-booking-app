import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController, ActionSheetController, LoadingController, ToastController } from '@ionic/angular';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';
import { PlacesService } from '../../places.service';
import { PlacesModel } from '../../places.model';
import { Subscription } from 'rxjs';
import { BookingService } from 'src/app/bookings/bookings.service';
import { AuthService } from 'src/app/auth/auth.service'
import { Plugins, Capacitor } from '@capacitor/core';

const { Clipboard } = Plugins;

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit, OnDestroy {
  place: PlacesModel;
  isBookable: boolean;
  private placesSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private placesService: PlacesService,
    private actionSheetController: ActionSheetController,
    private bookingService: BookingService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private authService: AuthService,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    console.log('init place detail page');
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/offers');
        return;
      }
      this.placesSub = this.placesService.getPlace(paramMap.get('placeId')).subscribe(place => {
        this.place = place;
        this.isBookable = place.userId !== this.authService.userId;
      });
    });
  }

  ngOnDestroy() {
    console.log('destroy place detail page');
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }

  async onBookPlace() {

    const actionSheet = await this.actionSheetController.create({
      header: 'Choose an action',
      buttons: [
        {
          text: 'Select Date',
          handler: () => {
            this.openBookingModal('select');
          }
        },
        {
          text: 'Random Date',
          handler: () => {
            this.openBookingModal('random');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    await actionSheet.present();
  }

  openBookingModal(mode: 'select' | 'random') {
    console.log(mode);
    this.modalCtrl.create({
      component: CreateBookingComponent,
      componentProps: {
        selectedPlace: this.place,
        selectedMode: mode
      }
    }).then(modalEl => {
      modalEl.present();
      return modalEl.onDidDismiss();
    }).then(resultData => {
      console.log(resultData.data);
      if (resultData.role === 'confirm') {
        this.loadingController
          .create({
            message: 'Booking Place...'
          })
          .then(loadingEl => {
            loadingEl.present();
            const data = resultData.data.bookingData;
            this.bookingService
              .addBooking(
                this.place.id,
                this.place.title,
                this.place.imageUrl,
                data.firstName,
                data.lastName,
                data.guestNumber,
                data.startDate,
                data.endDate
              )
              .subscribe(_ => {
                loadingEl.dismiss();
                console.log('BOOKED!');
              });
          });
      }
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Address Copied!',
      duration: 1750,
    });
    toast.present();
  }

  async copyAddress(value: string) {
    if (Capacitor.isPluginAvailable('Clipboard')) {
      Clipboard.write({
        string: value
      });
      this.presentToast();
    } else {
      console.log('Clipboard Plugin not available');
    }
  }
}

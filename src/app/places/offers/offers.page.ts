import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlacesModel } from '../places.model';
import { PlacesService } from '../places.service';
import { IonItemSliding, AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {

  offers: PlacesModel[];
  private placesSub: Subscription;

  constructor(
    private placesService: PlacesService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    setTimeout(() => {
      console.log('Offers loaded');
      this.placesSub = this.placesService.places.subscribe(places => {
        this.offers = places;
      });
      console.log(this.offers);
    }, 2000);
  }

  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }

  onEdit(offerId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/', 'places', 'offers', 'edit', offerId]);
    console.log(offerId);
  }

  async onDeletePresentAlert(offerId: string, slidingItem: IonItemSliding) {
    const alert = await this.alertController.create({
      header: 'Delete Offer',
      message: 'Are you sure you want to delete this offer ?',
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
            this.offers = this.offers.filter((offer) => {
              return offerId !== offer.id;
            });
            slidingItem.close();
            this.presentToast();
          }
        }
      ]
    });
    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Offer deleted.',
      duration: 1750,
      buttons: [
        {
          side: 'end',
          text: 'UNDO',
          handler: () => {
            console.log('UNDO clicked');
          }
        }
      ]
    });
    toast.present();
  }

  doRefresh(event: any) {
    console.log('Begin async refresh operation');

    const newOffers = [
      new PlacesModel(
        'p4',
        'Boston Courtyard',
        'Temporary residence for the gen z',
        'https://imgs.6sqft.com/wp-content/uploads/2014/06/21042534/Felix_Warburg_Mansion_007.jpg',
        109.99,
        new Date('2019-01-01'),
        new Date('2020-09-07'),
        'u1'
      )
    ];

    setTimeout(() => {
      console.log('Async operation has ended');
      this.offers = [...this.offers, ...newOffers]; // Adding new offers
      event.target.complete();
    }, 1500);
  }
}

import { Component, OnInit } from '@angular/core';
import { PlacesModel } from '../places.model';
import { PlacesService } from '../places.service';
import { IonItemSliding, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {

  offers: PlacesModel[];

  constructor(
    private placesService: PlacesService,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    console.log('Offers loaded');
    this.offers = this.placesService.places;
    console.log(this.offers);
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
          }
        }
      ]
    });

    await alert.present();
  }
}

import { Component, OnInit } from '@angular/core';
import { PlacesModel } from '../places.model';
import { PlacesService } from '../places.service';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {

  offers: PlacesModel[];

  constructor(private placesService: PlacesService, private router: Router) { }

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
}

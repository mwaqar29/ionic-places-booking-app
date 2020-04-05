import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlacesService } from '../places.service';
import { PlacesModel } from '../places.model';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  loadedPlaces: PlacesModel[];
  listedLoadedPlaces: PlacesModel[];
  relevantPlaces: PlacesModel[];
  private placesSub: Subscription;

  constructor(
    private placesService: PlacesService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    console.log('Loaded discover page');
    this.placesSub = this.placesService.places.subscribe(places => {
      this.loadedPlaces = places;
      this.relevantPlaces = this.loadedPlaces;
      this.listedLoadedPlaces = this.loadedPlaces.slice(1);
    });
  }

  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }

  segmentChanged(event: CustomEvent<SegmentChangeEventDetail>) {
    if (event.detail.value === 'all') {
      console.log('if');
      this.relevantPlaces = this.loadedPlaces;
    } else {
      console.log('else');
      this.relevantPlaces = this.loadedPlaces.filter(place => {
        return place.userId !== this.authService.userId;
      });
    }
    console.log(this.relevantPlaces);
    this.listedLoadedPlaces = this.relevantPlaces.slice(1);
  }

  // swipeEvent(event: any) {
  //   console.log(event.deltaX + ', ' + event.deltaY);
  //   if (event.deltaX > 0) {
  //     console.log('Swipe from Left to Right');
  //     // this.pages = "pageB";
  //   } else {
  //     console.log('Swipe from Right to Left');
  //     // this.pages = "pageA";
  //   }
  // }

}

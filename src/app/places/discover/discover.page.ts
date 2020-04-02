import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { PlacesModel } from '../places.model';
import { SegmentChangeEventDetail } from '@ionic/core';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  loadedPlaces: PlacesModel[];
  listedLoadedPlaces: PlacesModel[];

  constructor(private placesService: PlacesService) { }

  ngOnInit() {
    console.log('Loaded discover page');
    this.loadedPlaces = this.placesService.places;
    this.listedLoadedPlaces = this.loadedPlaces.slice(1);
    console.log(this.loadedPlaces);
  }

  segmentChanged(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log(event.detail);
  }

}

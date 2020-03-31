import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { PlacesModel } from '../places.model';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  loadedPlaces: PlacesModel[];

  constructor(private placesService: PlacesService) { }

  ngOnInit() {
    console.log('Loaded discover page');
    this.loadedPlaces = this.placesService.places;
    console.log(this.loadedPlaces);
  }

}

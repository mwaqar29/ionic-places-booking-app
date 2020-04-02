import { Injectable } from '@angular/core';

import { PlacesModel } from './places.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places: PlacesModel[] = [
    new PlacesModel('p1',
      'Manhattan Mansion',
      'In the heart of NYC',
      'https://imgs.6sqft.com/wp-content/uploads/2014/06/21042534/Felix_Warburg_Mansion_007.jpg',
      149.99),
    new PlacesModel('p2',
      'Los Angeles Palace',
      'Lost with the Angels',
      'https://imgs.6sqft.com/wp-content/uploads/2014/06/21042534/Felix_Warburg_Mansion_007.jpg',
      189.99),
    new PlacesModel('p3',
      'The Foggy Place',
      'Not your average city trip',
      'https://imgs.6sqft.com/wp-content/uploads/2014/06/21042534/Felix_Warburg_Mansion_007.jpg',
      79.99)
  ];

  get places() {
    console.log(this._places);
    return [...this._places];
  }

  getPlace(id: string) {
    return { ...this._places.find(p => p.id === id) };
  }

  constructor() { }
}

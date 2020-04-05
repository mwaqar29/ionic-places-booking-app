import { Injectable } from '@angular/core';

import { PlacesModel } from './places.model';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places = new BehaviorSubject<PlacesModel[]>(
    [
      new PlacesModel('p1',
        'Manhattan Mansion',
        'In the heart of NYC',
        'https://imgs.6sqft.com/wp-content/uploads/2014/06/21042534/Felix_Warburg_Mansion_007.jpg',
        149.99,
        new Date('2019-01-01'),
        new Date('2020-02-21'),
        'u2'
      ),
      new PlacesModel('p2',
        'Los Angeles Palace',
        'Lost with the Angels',
        'https://imgs.6sqft.com/wp-content/uploads/2014/06/21042534/Felix_Warburg_Mansion_007.jpg',
        189.99,
        new Date('2019-04-03'),
        new Date('2019-06-09'),
        'u1'
      ),
      new PlacesModel('p3',
        'The Foggy Place',
        'Not your average city trip',
        'https://imgs.6sqft.com/wp-content/uploads/2014/06/21042534/Felix_Warburg_Mansion_007.jpg',
        79.99,
        new Date('2019-08-07'),
        new Date('2019-12-17'),
        'u2'
      )
    ]
  );

  constructor(
    private authService: AuthService
  ) { }

  get places() {
    return this._places.asObservable();
  }

  getPlace(id: string) {
    return this.places.pipe(
      take(1),
      map(places => {
        return { ...places.find(p => p.id === id) };
      })
    );
  }

  addPlace(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    const newPlace = new PlacesModel(
      Math.random().toString(),
      title,
      description,
      'https://static.amazon.jobs/locations/58/thumbnails/NYC.jpg',
      price,
      dateFrom,
      dateTo,
      this.authService.userId
    );
    console.log(this._places);
    return this.places.pipe(take(1), delay(1000), tap(places => {
      this._places.next(places.concat(newPlace));
    }));
  }

  updateOffer(
    placeId: string,
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    const updatedPlace = new PlacesModel(
      Math.random().toString(),
      title,
      description,
      'https://static.amazon.jobs/locations/58/thumbnails/NYC.jpg',
      price,
      dateFrom,
      dateTo,
      this.authService.userId
    );
    console.log(this._places);
    return this.places.pipe(take(1), delay(1000), tap(places => {
      const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
      const updatedPlaces = [...places];
      const oldPlace = updatedPlaces[updatedPlaceIndex];
      updatedPlaces[updatedPlaceIndex] = new PlacesModel(
        oldPlace.id,
        title,
        oldPlace.description,
        oldPlace.imageUrl,
        oldPlace.price,
        oldPlace.availableFrom,
        oldPlace.availableTo,
        oldPlace.userId
      );
      this._places.next(updatedPlaces);
    }));
  }
}

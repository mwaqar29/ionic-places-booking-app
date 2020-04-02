import { Injectable } from '@angular/core';
import { BookingModel } from './bookings.model';


@Injectable({
    providedIn: 'root'
})

export class BookingService {

    private _bookings: BookingModel[] = [
        {
            id: 'b1',
            placeId: 'p1',
            placeTitle: 'Manhattan Mansion',
            guestNumber: 2,
            userId: 'abc'
        }
    ];

    get bookings() {
        return [...this._bookings];
    }

}
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { PlacesModel } from 'src/app/places/places.model';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedPlace: PlacesModel;
  @Input() selectedMode: string;
  @ViewChild('f', { static: true }) form: NgForm;

  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    console.log(this.selectedPlace.availableFrom.toISOString());
  }

  onBookPlace() {
    console.log('onBook Place');
    if (this.form.invalid) {
      return;
    }
    this.modalCtrl.dismiss({
      bookingData: {
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        guestNumber: +this.form.value.guestNumber,
        startDate: new Date(this.form.value.startDate),
        endDate: new Date(this.form.value.endDate)
      }
    }, 'confirm');
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

}

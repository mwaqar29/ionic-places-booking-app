import { PlacesModel } from 'src/app/places/places.model';
import { NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlacesService } from '../../places.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {
  place: PlacesModel;
  form: FormGroup;
  private placesSub: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private placesService: PlacesService,
    private navController: NavController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navController.navigateBack('/places/offers');
        return;
      }
      this.placesSub = this.placesService.getPlace(paramMap.get('placeId')).subscribe(places => {
        this.place = places;

        this.form = new FormGroup({
          title: new FormControl(this.place.title, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          description: new FormControl(this.place.description, {
            updateOn: 'blur',
            validators: [Validators.required, Validators.maxLength(180)]
          }),
          price: new FormControl(this.place.price, {
            updateOn: 'blur',
            validators: [Validators.minLength(1)]
          }),
          dateFrom: new FormControl(null, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          dateTo: new FormControl(null, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
        });
      });
    });
    console.log(this.place);
  }

  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }

  onEditOffer() {
    if (this.form.valid) {
      this.loadingController.create({
        message: 'Updating place...'
      }).then(loadingEl => {
        loadingEl.present();
        this.placesSub = this.placesService
          .updateOffer(
            this.place.id,
            this.form.value.title,
            this.form.value.description,
            +this.form.value.price,
            new Date(this.form.value.dateFrom),
            new Date(this.form.value.dateTo)
          )
          .subscribe(_ => {
            loadingEl.dismiss();
            this.router.navigateByUrl('/places/offers');
            this.form.reset();
          });
      });
      console.log(this.form);
    }
    return;
  }
}

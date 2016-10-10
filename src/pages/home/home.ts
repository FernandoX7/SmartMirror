import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {Mirror} from "../mirror/mirror";
import {Geolocation} from 'ionic-native';

import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class Home {

  mirrorDetailsForm: FormGroup;
  locationInputTextLabel: String;
  isFormReady: boolean;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder) {
    this.locationInputTextLabel = 'Retrieving location...';
    this.isFormReady = false;

    Geolocation.getCurrentPosition().then((resp) => {
      console.log('Successfully got the users location', resp);
      this.mirrorDetailsForm.value.latitude = resp.coords.latitude;
      this.mirrorDetailsForm.value.longitude = resp.coords.longitude;
      this.locationInputTextLabel = 'Location found';

      // Enable the start mirror button if the form is valid and the users location has been found
      if (this.mirrorDetailsForm.valid) {
        this.isFormReady = true;
      }

    }, error => {
      this.locationInputTextLabel = 'Error finding location';
      console.log('Error getting location', error);
    });

    this.mirrorDetailsForm = formBuilder.group({
      firstName: [''],
      fahrenheit: true,
      latitude: [''],
      longitude: [''],
      showTravelTimes: true
    });

  }


  startMirror(): void {
    if (this.isFormReady == true) {
      this.navCtrl.push(Mirror, this.mirrorDetailsForm.value);
    }
  }

}

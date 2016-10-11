import {Component} from '@angular/core';

import {NavController, Platform} from 'ionic-angular';
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
  hasLocation: boolean;
  lat: String;
  long: String;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, platform: Platform) {
    this.locationInputTextLabel = 'Retrieving location...';
    this.isFormReady = false;

    this.mirrorDetailsForm = formBuilder.group({
      firstName: [''],
      fahrenheit: true,
      latitude: [''],
      longitude: [''],
      showTravelTimes: true
    });

    Geolocation.getCurrentPosition().then((data) => {
      console.log('Successfully got the users location', data);
      this.hasLocation = true;
      this.mirrorDetailsForm.value.latitude = data.coords.latitude;
      this.mirrorDetailsForm.value.longitude = data.coords.longitude;
      this.locationInputTextLabel = 'Location found';
      this.lat = data.coords.latitude;
      this.long = data.coords.longitude;
    }, error => {
      this.locationInputTextLabel = 'Error finding location';
      console.log('Error getting location', error);
    });

    // Check if the user has entered their name
    this.mirrorDetailsForm.valueChanges.subscribe(
      data => {
        if (this.mirrorDetailsForm.valid) {
          this.isFormReady = true;
        }
      }
    );
  }

  startMirror(): void {
    this.mirrorDetailsForm.value.latitude = this.lat;
    this.mirrorDetailsForm.value.longitude = this.long;
    if (this.mirrorDetailsForm.valid == true) {
      this.navCtrl.push(Mirror, this.mirrorDetailsForm.value);
    }
    if (this.mirrorDetailsForm.value.longitude == '' || this.mirrorDetailsForm.valid.latitude == '') {
      console.log("OH NO, ", this.mirrorDetailsForm.value.longitude);
    }
  }

}

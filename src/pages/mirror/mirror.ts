import {Component} from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';
import {FethWeatherService} from "./weather-service";

import 'rxjs/add/operator/map';
import {Component, OnInit} from 'angular2/core';
import {MapsService} from "./maps-service";
import {SecretsService} from "./secrets-service";

@Component({
  selector: 'page-mirror',
  templateUrl: 'mirror.html',
  providers: [FethWeatherService, MapsService, SecretsService]
})
export class Mirror implements OnInit {

  dailySummary: String;
  sunriseTime: String;
  sunsetTime: String;
  weatherData: any;
  humidity: any;
  tempHigh: any;
  tempLow: any;
  locationData: any;
  location: String;
  multiDayForecast: any;
  mapsData: any;
  travelTime: String;
  usersName: String;
  latitude: String;
  longitude: String;
  currentDate: String;
  currentTime: String;
  userChoseFahrenheit: boolean;
  temperature: any;
  showTravelTimes: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private weather: FethWeatherService, private maps: MapsService, public secrets: SecretsService) {
    console.log("Users Preferences: ", navParams);
    this.currentTime = this.getCurrentTime();
    this.currentDate = this.getCurrentDate();
    this.userChoseFahrenheit = navParams.get('fahrenheit');
    this.showTravelTimes = navParams.get('showTravelTimes');
  }

  ngOnInit() {
    // Setup the mirror with the users preferences
    this.usersName = this.navParams.get('firstName');
    this.latitude = this.navParams.get('latitude');
    this.longitude = this.navParams.get('longitude');

    // Get Weather
    this.weather
      .getWeather(this.latitude, this.longitude)
      .subscribe(
        data => {
          this.weatherData = data;
          /** Location **/
          var latitude = this.weatherData.latitude;
          var longitude = this.weatherData.longitude;

          /** Weather **/
          var temperature = this.weatherData.currently.temperature;
          // Daily Summary
          var dailySummary = this.weatherData.daily.data[0].summary;
          this.dailySummary = dailySummary;
          // Sunrise & Sunset Times
          this.sunriseTime = this.weather.unixToTime(this.weatherData.daily.data[0].sunriseTime);
          this.sunsetTime = this.weather.unixToTime(this.weatherData.daily.data[0].sunsetTime);
          if (this.userChoseFahrenheit == true) {
            this.temperature = Math.round(temperature);
          } else {
            this.temperature = Math.round((temperature - 32) * (5 / 9));
          }
          // High & Low Temp's
          var tempHigh = this.weatherData.daily.data[0].temperatureMax;
          var tempLow = this.weatherData.daily.data[0].temperatureMin;
          this.tempHigh = Math.round(tempHigh);
          this.tempLow = Math.round(tempLow);
          // Humidity
          this.humidity = this.weatherData.currently.humidity;

          var multiDayForecast = [{}];
          // Multi-Day forecast
          for (var i = 0; i < this.weatherData.daily.data.length; i++) {
            multiDayForecast.push(this.weatherData.daily.data[i]);
            // Round the temperature properties
            multiDayForecast[i]["temperatureMax"] = Math.round(this.weatherData.daily.data[i].temperatureMax);
            multiDayForecast[i]["temperatureMin"] = Math.round(this.weatherData.daily.data[i].temperatureMin);
            // Add a current date property
            multiDayForecast[i]["currentDate"] = this.weather.unixToDate(this.weatherData.daily.data[i].time);
          }
          // Make it only 5 days  and remove the first item since it's the current day
          multiDayForecast.splice(0, 1);
          multiDayForecast.splice(5, 3);

          this.multiDayForecast = multiDayForecast;
        },
        err => console.error('There was an error getting the weather', err),
        () => console.log('Successfully got weather')
      );

    // Get location
    this.weather
      .getLocation(this.latitude, this.longitude)
      .subscribe(
        data => {
          this.locationData = data;
          var location = this.locationData.results[3].formatted_address.replace(', USA', '');
          this.location = location;
        },
        err => console.error('There was an error getting the location', err),
        () => console.log('Successfully got location')
      );

    // Get travel time
    this.maps
      .getTravelTimeToWork(this.latitude, this.longitude, this.secrets.workLatitude, this.secrets.workLongitude)
      .subscribe(
        data => {
          this.mapsData = data;
          if (this.showTravelTimes == true) {
            var travelTime = this.mapsData.rows[0].elements[0].duration.text;
            travelTime = travelTime.replace('mins', '');
            travelTime = travelTime.replace('min', '');
            this.travelTime = 'It looks like it\'ll take you ' + travelTime + ' minutes to get to work today';
          } else {
            this.travelTime = 'Travel times have been disabled';
          }
        },
        err => console.error('There was an error getting the travel time to work', err),
        () => console.log('Successfully got travel time to work')
      );

  }

  getCurrentDate(): String {
    var today = new Date();
    var weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
    var months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
    var numericalDay = today.getDate();
    var dayOfMonth = months[today.getMonth()];
    var dayOfWeek = weekday[today.getDay()];
    var year = today.getFullYear();
    return dayOfWeek + ', ' + dayOfMonth + ' ' + numericalDay + ', ' + year;
  }

  getCurrentTime(): String {
    var today = new Date();
    var hours = today.getHours();
    var minutes = today.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
  }

}



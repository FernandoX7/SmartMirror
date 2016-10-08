import {Component} from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';
import {FethWeatherService} from "./weather-service";

import 'rxjs/add/operator/map';
import {Component, OnInit} from 'angular2/core';

@Component({
  selector: 'page-mirror',
  templateUrl: 'mirror.html',
  providers: [FethWeatherService]
})
export class Mirror implements OnInit {

  dailySummary: String;
  sunriseTime: String;
  sunsetTime: String;
  weatherData: any;
  fahrenheitTemperature: any;
  celsiusTemperature: any;
  humidity: any;
  tempHigh: any;
  tempLow: any;
  locationData: any;
  location: String;
  multiDayForecast: any;

  constructor(public navCtrl: NavController, private weather: FethWeatherService) {
  }

  ngOnInit() {
    // Get Weather
    this.weather
      .getWeather()
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
          // Fahrenheit
          this.fahrenheitTemperature = Math.round(temperature);
          // Celsius
          this.celsiusTemperature = Math.round((temperature - 32) * (5 / 9));
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
      .getLocation()
      .subscribe(
        data => {
          this.locationData = data;
          var location = this.locationData.results[3].formatted_address.replace(', USA', '');
          this.location = location;
        },
        err => console.error('There was an error getting the location', err),
        () => console.log('Successfully got location')
      );

  }

}



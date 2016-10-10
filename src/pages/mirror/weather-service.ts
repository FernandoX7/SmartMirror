/**
 * Created by fernandoramirez on 10/8/16.
 */
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {SecretsService} from "./secrets-service";

@Injectable()
export class FethWeatherService {

  apiKey: String;
  http: any;

  constructor(http: Http, public secrets: SecretsService) {
    // Get apikey from my secret constants file - Replace with your own actual api key from darksky.net
    this.apiKey = secrets.apiKey;
    this.http = http;
  }

  ngOnInit() {
    this.getWeather('0', '0');
    this.getLocation('0', '0');
  }

  getWeather(latitude, longitude): Observable<> {
    return this.http
      .get('https://crossorigin.me/https://api.darksky.net/forecast/' + this.apiKey + '/' + latitude + ',' + longitude)
      .map(res => res.json());
  }

  getLocation(latitude, longitude): Observable<> {
    return this.http
      .get('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&sensor=true')
      .map(res => res.json());
  }

  unixToDate(unixTime) {
    var a = new Date(unixTime * 1000);
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var day = weekday[a.getDay()];
    var formattedDate = day;
    return formattedDate;
  }

  unixToTime(unixTime) {
    var date = new Date(unixTime * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
  }

}

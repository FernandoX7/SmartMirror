/**
 * Created by fernandoramirez on 10/8/16.
 */
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {SecretsService} from "./secrets-service";

@Injectable()
export class MapsService {

  apiKey: String;
  http: any;
  url: String = 'https://crossorigin.me/http://maps.googleapis.com/maps/api/distancematrix/json?origins=' + this.secrets.homeLatitude + ',' + this.secrets.homeLongitude + '&destinations=' + this.secrets.workLatitude + ',' + this.secrets.workLongitude + '&mode=driving&language=en-US&sensor=false';

  constructor(http: Http, public secrets: SecretsService) {
    this.http = http;
    console.log(this.url);
  }

  ngOnInit() {
    this.getTravelTimeToWork();
  }

  getTravelTimeToWork(): Observable<> {
    return this.http
      .get(this.url)
      .map(res => res.json());
  }

}

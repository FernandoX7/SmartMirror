/**
 * Created by fernandoramirez on 10/8/16.
 */
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class MapsService {

  apiKey: String;
  http: any;

  constructor(http: Http) {
    this.http = http;
  }

  ngOnInit() {
    this.getTravelTimeToWork('0', '0', '0', '0');
  }

  getTravelTimeToWork(homeLatitude, homeLongitude, workLatitude, workLongitude): Observable<> {
    return this.http
      .get('https://crossorigin.me/http://maps.googleapis.com/maps/api/distancematrix/json?origins=' + homeLatitude + ',' + homeLongitude + '&destinations=' + workLatitude + ',' + workLongitude + '&mode=driving&language=en-US&sensor=false')
      .map(res => res.json());
  }

}

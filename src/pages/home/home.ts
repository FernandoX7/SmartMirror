import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {Mirror} from "../mirror/mirror";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class Home {

  constructor(public navCtrl: NavController) {

  }

  startMirror(): void {
    this.navCtrl.push(Mirror);
  }

}

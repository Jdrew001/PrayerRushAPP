import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-request',
  templateUrl: 'PrayerRequest.html'
})
export class PrayerRequest {

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    console.log("request loaded");
  }

}

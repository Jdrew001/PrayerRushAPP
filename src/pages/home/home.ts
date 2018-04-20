import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  email :string; 
  token :string;
  helper = new JwtHelperService();

  constructor(public navCtrl: NavController, private storage: Storage) {
    this.storage.get("token").then((val) => {
      this.token = this.helper.decodeToken(val)["email"];
    });
  }

}

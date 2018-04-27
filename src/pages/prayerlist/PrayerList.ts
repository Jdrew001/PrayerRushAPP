import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { JwtHelperService } from '@auth0/angular-jwt';
import {Platform} from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { ModalPage } from '../../pages/modal/modal';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

@Component({
  selector: 'page-list',
  templateUrl: 'PrayerList.html'
})
export class PrayerList {

  email :string;
  helper = new JwtHelperService();

  constructor(public navCtrl: NavController, private storage: Storage, public plt: Platform, private userService: UserService,
  private navTrans: NativePageTransitions) {


    //when platform is loaded, check with api
   

    
  }

}

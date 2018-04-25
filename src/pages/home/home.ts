import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { JwtHelperService } from '@auth0/angular-jwt';
import {Platform} from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { ModalPage } from '../../pages/modal/modal';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  email :string;
  helper = new JwtHelperService();

  constructor(public navCtrl: NavController, private storage: Storage, public plt: Platform, private userService: UserService,
  private navTrans: NativePageTransitions) {


    //when platform is loaded, check with api
   

    
  }

}

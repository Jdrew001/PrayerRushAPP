import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { SuperTabsController } from 'ionic2-super-tabs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from '../../services/user.service';
import { ModalPage } from '../../pages/modal/modal';
import { Storage } from '@ionic/storage';
import {Platform} from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

@Component({
  templateUrl: 'tabs.html',
  selector: 'tabs-page'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  helper = new JwtHelperService();
  email :string;

  constructor(public navCtrl: NavController, private nativeTransitions: NativePageTransitions, private superTabsCtrl: SuperTabsController, private userService: UserService, private storage:Storage, private plt:Platform) {
      plt.ready().then(() => {

      //check with api to see if the user has filled out information
      this.storage.get("token").then((val) => {
        this.email = this.helper.decodeToken(val)["email"];
        this.userService.checkUserInformation(this.email, val).subscribe(data => {
          if(!data["condition"])
          {
            // show modal screen
            let options: NativeTransitionOptions = {
              direction: 'up',
              duration: 500
            };
            this.nativeTransitions.slide(options);
            this.navCtrl.push(ModalPage);
          }
        }, error => {

        });
      });
    });
  }

  ngAfterViewInit()
  {
    this.superTabsCtrl.showToolbar(true);
  }
}

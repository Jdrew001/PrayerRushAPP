import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
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
import { SettingsPage } from '../settings/settings';
import { FeedbackPage } from '../feedback/feedback';
import { LoginPage } from '../login/login';
import { User } from '../../models/User';
import { Constants } from '../../utilities/Constants';

@Component({
  templateUrl: 'tabs.html',
  selector: 'tabs-page'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  helper = new JwtHelperService();
  email :string = "";
  firstname : string = "";
  lastname : string = "";
  username : string = "";
  user : User;

  pages: Array<{title: string, component: any}>;

  constructor(private menuController: MenuController, public navCtrl: NavController, private nativeTransitions: NativePageTransitions, private superTabsCtrl: SuperTabsController, private userService: UserService, private storage:Storage, private plt:Platform) {
    this.pages = [
      { title: 'Settings', component: SettingsPage},
      { title: 'Feedback', component: FeedbackPage}
    ]; 
    
    plt.ready().then(() => {
      this.menuController.swipeEnable(false);
      //check with api to see if the user has filled out information
      this.storage.get("token").then((val) => {
        this.email = this.helper.decodeToken(val)["email"];
        this.userService.checkUserInformation(this.email, val).subscribe(data => {

          if(data["condition"] == null) {
            console.log("username: " + data["firstname"]);
            //store user information
            this.storage.set("username", data["username"]);
            this.storage.set("firstname", data["firstname"]);
            this.storage.set("lastname", data["lastname"]);
            this.storage.set("email", data["email"])
            //set the menu
            this.email = data[Constants.EMAIL];
            this.firstname = data[Constants.FIRSTNAME];
            this.lastname = data[Constants.LASTNAME];
            this.username = data[Constants.USERNAME];
          } else {
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
          }
        }, error => {

        });
      });
    });
  }

  ngAfterViewInit()
  {
    this.superTabsCtrl.showToolbar(true);

    //load in the details in a user obj and then show this in the menu
    
    
  }

  openPage(page) {
    this.navCtrl.push(page.component);
  }

  logout() {
    this.storage.remove('token').then((val) => {
      this.nativeTransitions.fade(null);
      this.navCtrl.setRoot(LoginPage);
      this.menuController.close();
    });
  }
}

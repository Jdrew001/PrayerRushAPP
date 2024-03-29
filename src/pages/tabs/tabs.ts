import { Component } from '@angular/core';
import { NavController, MenuController, List, Events } from 'ionic-angular';
import { PrayerList } from '../prayerlist/PrayerList';
import { SuperTabsController } from 'ionic2-super-tabs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from '../../services/user.service';
import { ModalPage } from '../../pages/modal/modal';
import { Storage } from '@ionic/storage';
import {Platform} from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { SettingsPage } from '../settings/settings';
import { FeedbackPage } from '../feedback/feedback';
import { FriendsPage } from '../friends/friends';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Params } from '../../services/params.service';

import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

import { ToastService } from '../../services/toast.service';
import { LoginPage } from '../login/login';
import { User } from '../../models/User';
import { Constants } from '../../utilities/Constants';
import { PrayerRequest } from '../prayerrequest/PrayerRequest';
import { Goals } from '../goals/Goals';

@Component({
  templateUrl: 'tabs.html',
  selector: 'tabs-page'
})
export class TabsPage {

  tab1Root = PrayerList;
  tab2Root = PrayerRequest;
  tab3Root = Goals;
  helper = new JwtHelperService();
  email :string = "";
  firstname : string = "";
  lastname : string = "";
  username : string = "";
  user : User;
  private title = 'WebSockets chat';
  private stompClient;

  pages: Array<{title: string, component: any}>;

  constructor(private menuController: MenuController, public events: Events, private params: Params, private localNot : LocalNotifications, private toastService: ToastService, public navCtrl: NavController, private nativeTransitions: NativePageTransitions, private superTabsCtrl: SuperTabsController, private userService: UserService, private storage:Storage, private plt:Platform) {
    this.pages = [
      { title: 'Settings', component: SettingsPage},
      { title: 'Feedback', component: FeedbackPage},
      { title: 'Friends', component: FriendsPage }
    ]; 
    
    plt.ready().then(() => {
      this.menuController.swipeEnable(false);
    });
  }

  ngAfterViewInit()
  {
    this.superTabsCtrl.showToolbar(true);
  }

  connectNotifications(email) {
    // to check if we have permission
    let ws = new SockJS(Constants.BASE_URL+"rush-api-socket");
    console.log(ws);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.unsubscribe("/push");
      that.stompClient.unsubscribe("/request/"+email);
      //push notifications -- remove and put in app module TODO
      that.stompClient.subscribe("/push", (data) => {
        console.log(data);
      });

      //subscribe to the request socket to receive notifications
      that.stompClient.subscribe("/request/"+email, (data) => {
        var obj = JSON.parse(data.body);
        that.toastService.showBottomShort(obj.message);
        that.events.publish("request-added", obj.requestDAO);
        that.localNot.schedule({
          id: 1,
          title: obj.title,
          text: obj.message
        });
      }, error => {

      });

      //subscribe to friend notifications
      that.stompClient.subscribe("/friend/"+email, (data) => {
        var obj = JSON.parse(data.body);
        that.toastService.showBottomShort(obj.message);
        if(obj.title == "New Friend Request") {
          that.events.publish("friend-request", obj.friendDAO);
        } else {
          
        }
      })
    });
  }

  ionViewDidLoad() {
    this.storage.get("token").then((val) => {

      //Decode token -> email and save to a token
      this.email = this.helper.decodeToken(val)["email"];
      this.connectNotifications(this.email);
      //Check the user information passing in the email 
      this.userService.checkUserInformation(this.email, val).subscribe(data => {

        if(data["condition"] == null) {
          //store user information
          this.storage.set("username", data["username"]);
          this.storage.set("firstname", data["firstname"]);
          this.storage.set("lastname", data["lastname"]);
          
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
        // TODO
      });
    }); 
  }
  openPage(page) {
    this.navCtrl.push(page.component);
  }

  logout() {
    this.storage.remove('token').then((val) => {
      this.nativeTransitions.fade(null);
      this.navCtrl.setRoot(LoginPage);
      this.stompClient.disconnect();
      this.menuController.close();
    });
  }
}

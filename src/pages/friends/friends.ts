import { Component } from '@angular/core';
import { NavController, NavParams, List, Toast, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FriendService } from '../../services/friend.service';
import { ToastService } from '../../services/toast.service';
import { AddFriend } from './addFriend';
import {trigger, transition, style, animate, query, stagger} from '@angular/animations';


@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':leave', [
          stagger(20, 
            [ animate('0.2s  ease-in-out'), style({ opacity: 0})])
        ],{ optional: true }),
        query(':enter', [
          style({ opacity: 0 }),
          stagger(20, [
            animate('0.2s  ease-in-out', style({ opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class FriendsPage {

  list:List[] = [];
  requests:List[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private events: Events, private friendService : FriendService, private storage : Storage, private toastService : ToastService) {
    this.events.unsubscribe('request-added');
    this.events.subscribe('request-added', (data) => {
      this.requests.unshift(data);
    });
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad FriendsPage');
    this.loadUserFriends();
    this.loadFriendRequests();
  }

  close() {
    this.navCtrl.pop();
  }

  openAddFriend() {
    this.navCtrl.push(AddFriend);
  }

  loadUserFriends() {
    this.list = [];
    this.storage.get("email").then(email => {
      this.storage.get("token").then(token => {
        this.friendService.getUserFriends(email, token)
          .subscribe(data => {
            this.list = data as List[];
          }, error => {
            console.log(error["message"]);
          });
      });
    });
  }

  removeFriend(user) {
    this.storage.get("email").then(email => {
      this.storage.get("token").then(token => {
        this.friendService.removeFriend(user.email, email, token)
          .subscribe(data => {
            var index = this.list.indexOf(user, 0);
            if(index > -1)
              this.list.splice(index, 1);

            this.toastService.showBottomShort("Successfully removed friend");
          }, error => {
            //an error has occurred toast
            this.toastService.showBottomShort("An error has occurred");
          });
      });
    });
  }

  loadFriendRequests() {
    this.requests = [];
    this.storage.get("email").then(email => {
      this.storage.get("token").then(token => {
        this.friendService.getFriendRequests(email, token)
          .subscribe(data => {
            this.requests = data as List[];
          }, error => {
            console.log(error["message"]);
          })
      });
    });
  }

  declineRequest(request) {
    this.storage.get("email").then(email => {
      this.storage.get("token").then(token => {
        this.friendService.declineFriendRequest(request.email, email, token)
          .subscribe(data => {
            var index = this.requests.indexOf(request, 0);
            if(index > -1)
              this.requests.splice(index, 1);
          }, error => {
            console.log(error["error"]);
          });
      });
    });
  }

  acceptRequest(request) {
    this.storage.get("email").then(email => {
      this.storage.get("token").then(token => {
        this.friendService.acceptFriendRequest(request.email, email, token)
          .subscribe(data => {
            var index = this.requests.indexOf(request, 0);
            if(index > -1)
              this.requests.splice(index, 1);

            this.list.push(request);
            this.toastService.showBottomShort("Successfully added");
          }, error => {
            console.log(error["error"]);
          });
      });
    });
  }

}
